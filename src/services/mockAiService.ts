import type {
  AIContext,
  EmotionOption,
  EmotionSuggestionResult,
  NeedOption,
  RequestOption,
} from "../types";
import { EMOTION_LIBRARY } from "../data/emotions";
import { NEED_LIBRARY } from "../data/needs";
import type { AIService } from "./AIService";

/** ネットワーク越しのAI呼び出しを模した遅延。焦らせないために、速すぎず遅すぎない長さにしている。 */
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Step1: 観察の書き直し
 * -----------------------------------------------------------------------
 * 「バカにされた」のような評価混じりの言葉を、
 * 起きた出来事（事実）に近い表現へ言い換える。
 * 本実装ではDifyのLLMが行う処理だが、mockでは
 * よくあるパターンへの簡易変換 + 汎用テンプレートで代替する。
 */
export async function rewriteObservation(rawInput: string): Promise<string> {
  await wait(1100);

  const text = rawInput.trim();

  if (/上司.*(バカに|ばかに|馬鹿に)/.test(text) || /(バカに|ばかに|馬鹿に).*上司/.test(text)) {
    return "会議で上司から「この資料はやり直してください」と言われた。";
  }
  if (/(無視|スルー)された/.test(text)) {
    return "話しかけたが、返事がなかった。";
  }
  if (/(裏切られた)/.test(text)) {
    return "事前に相談なく、決まっていたはずの予定が変更された。";
  }

  // 汎用フォールバック：解釈語を弱め、出来事として読める形に整える
  const trimmed = text.replace(/[。.!！?？]+$/u, "");
  return `${trimmed}、という出来事があった。`;
}

/**
 * Step2: 感情候補の提案
 * -----------------------------------------------------------------------
 * 観察文の語感から「満たされている／いない」のどちらに近いかを一度だけ判定し、
 * その傾向に合う感情を優先的に並べる。
 * ただし判定が外れる可能性もあるため、もう一方の感情も suggestions には含めて返し、
 * 画面側で「ほかの気持ちも見てみる」から開けるようにしている（隠す＝消す、ではない）。
 */
export async function suggestEmotions(observationText: string): Promise<EmotionSuggestionResult> {
  await wait(900);

  // 快寄りのキーワードが明確にある場合だけ comfortable をデフォルトにする。
  // それ以外（不快キーワードがある、または判定できない）はすべて uncomfortable をデフォルトにする。
  // 理由：このツールを使う場面の大半は、何か不快なことがあったとき。
  const comfortableHint = /(うれしい|よかった|楽しかった|感謝|ありがとう|褒め|ほめ|達成|成功)/.test(
    observationText
  );
  const matchedTone: EmotionOption["tone"] = comfortableHint ? "comfortable" : "uncomfortable";

  // 各グループの代表的な感情を優先的に先頭に並べる（新しいIDに合わせて更新）
  const priorityIds =
    matchedTone === "uncomfortable"
      ? [
          "iira",        // イライラ
          "kanashii",    // 悲しい
          "fuan",        // 不安
          "modokashii",  // もどかしい
          "kizutsuita",  // 傷ついた
          "sabishii",    // 寂しい
          "tsurai",      // つらい
          "gakkari",     // がっかり
          "tsukareta",   // 疲れた
          "shinpai",     // 心配
          "zannen",      // 残念な
          "doyo",        // 動揺した
          "munashii",    // 空しい
          "aseri",       // 焦り
          "kuyashii",    // 悔しい
          "kokai",       // 後悔
        ]
      : [
          "ureshii",     // うれしい
          "tanoshii",    // 楽しい
          "anshin",      // 安心した
          "hotto",       // ほっとする
          "shiawase",    // 幸せな
          "arigatai",    // ありがたい
          "odayaka",     // 穏やかな
          "jujitsu",     // 充実した
          "wakuwaku",    // ワクワクする
          "sukkiri",     // すっきり
          "kando",       // 感動した
          "hokorashii",  // 誇らしい
        ];

  const matched = EMOTION_LIBRARY.filter((e) => e.tone === matchedTone);
  const other = EMOTION_LIBRARY.filter((e) => e.tone !== matchedTone);

  const prioritized = priorityIds
    .map((id) => matched.find((e) => e.id === id))
    .filter((e): e is EmotionOption => Boolean(e));
  const restMatched = matched.filter((e) => !priorityIds.includes(e.id));

  // matchedTone側を先に、other（隠す候補）をあとに連結して返す。
  // 画面側は matchedTone と一致する分だけを初期表示し、残りはトグルで開く。
  return {
    suggestions: [...prioritized, ...restMatched, ...other],
    matchedTone,
    aiPickedIds: [], // mockは推薦なし。Dify接続時に本実装が入る。
  };
}

/**
 * Step3: ニーズ候補の生成
 * -----------------------------------------------------------------------
 * 観察文・選んだ感情ラベルから、関連しそうなニーズを抽出し
 * relevance（関連度 1〜5）でソートする。
 */
export async function suggestNeeds(ctx: AIContext): Promise<NeedOption[]> {
  await wait(1300);

  const text = `${ctx.observationText} ${ctx.emotionLabels.join(" ")}`;

  const weighted = NEED_LIBRARY.map((need) => {
    let score = need.relevance;

    // 否定・やり直し → 認められること・理解されること
    if (/(やり直し|否定|評価|批判|ダメ出し)/.test(text) &&
      ["mitomeru", "rikai", "kyoukan", "sonkei"].includes(need.id)) {
      score += 2;
    }
    // 無視・返事なし → つながり・聞いてもらうこと
    if (/(無視|既読|返事|スルー|孤独|さみし)/.test(text) &&
      ["kiku", "tsunagari", "issho", "kyoukan", "taisetsuni"].includes(need.id)) {
      score += 2;
    }
    // 変更・裏切り → 信頼・安定・透明性
    if (/(変更|予定|突然|急に|裏切)/.test(text) &&
      ["shinrai", "antei", "toumesei", "meikakusa"].includes(need.id)) {
      score += 2;
    }
    // ハラスメント・怒り → 尊厳・公平
    if (/(怒|叱|バカ|馬鹿|ハラスメント|差別)/.test(text) &&
      ["songen", "kousei", "sonkei", "byoudou"].includes(need.id)) {
      score += 2;
    }
    // 疲れた・重苦しい → 休息・ゆとり
    if (ctx.emotionLabels.some((l) => ["疲れた", "だるい", "どんよりした", "気が重い", "うんざり"].includes(l)) &&
      ["yutori", "kyuusoku", "kiraku", "iyashi"].includes(need.id)) {
      score += 2;
    }
    // 不安・心配 → 安心・安全・支え
    if (ctx.emotionLabels.some((l) => ["不安", "心配", "びくびく", "焦り", "はらはら"].includes(l)) &&
      ["anshin", "anzen", "sasae", "shinrai"].includes(need.id)) {
      score += 2;
    }
    // もどかしい・じれったい → 自主性・選択
    if (ctx.emotionLabels.some((l) => ["もどかしい", "じれったい", "窮屈な"].includes(l)) &&
      ["jihatsusei", "sentaku", "jiritsu"].includes(need.id)) {
      score += 1;
    }
    // 悲しい・傷ついた → 大切にされること・思いやり
    if (ctx.emotionLabels.some((l) => ["悲しい", "傷ついた", "みじめな", "引き裂かれる感じ"].includes(l)) &&
      ["taisetsuni", "omoiyari", "yasashisa", "atatakasa"].includes(need.id)) {
      score += 2;
    }

    return { need, score };
  });

  weighted.sort((a, b) => b.score - a.score);

  // アコーディオンUIで全カテゴリを表示するため、上限なく全件返す。
  // relevanceドットはスコアに応じて1〜5に丸めて表示し、
  // 「今回どれくらい関係しそうか」の目安として機能させる。
  return weighted.map(({ need, score }) => ({
    ...need,
    relevance: Math.max(1, Math.min(5, score)) as NeedOption["relevance"],
  }));
}

/**
 * Step4: AIまとめ（最重要画面）
 * -----------------------------------------------------------------------
 * 評価・診断・断定をせず、「あなたが感じたことには理由がある」という
 * トーンで、感情とニーズをやさしく接続する文章を生成する。
 */
export async function composeSummary(ctx: AIContext): Promise<string> {
  await wait(1500);

  const need = ctx.needLabels[0] ?? "大切にしたいこと";
  const emotion = ctx.emotionLabels[0] ?? "その気持ち";

  return [
    `あなたは「${need}」というニーズを大切にしているようです。`,
    `今回${emotion}気持ちになったのは、そのニーズが十分に満たされなかったからかもしれません。`,
    "",
    "あなたがおかしいわけではありません。",
    "あなたにとって大切なものが、今回うまく満たされなかった。それだけのことです。",
  ].join("\n");
}

/**
 * Step5: 深掘り質問の生成（最大1問）
 */
export async function composeDeepQuestion(ctx: AIContext): Promise<string> {
  await wait(1000);

  const need = ctx.needLabels[0] ?? "そのこと";
  return `あなたにとって「${need}」は、なぜそんなに大切なのでしょう？`;
}

/**
 * Step5: 深掘り回答をもとにした、もう一段深いニーズの言語化
 */
export async function composeDeeperInsight(ctx: AIContext, answer: string): Promise<string> {
  await wait(1200);

  const need = ctx.needLabels[0] ?? "大切にしたいこと";
  const trimmedAnswer = answer.trim();

  if (!trimmedAnswer) {
    return `「${need}」という気持ちの奥に、まだ言葉になっていない大切な理由がありそうです。焦らず、また今度言葉にしてみても大丈夫です。`;
  }

  return [
    `今お話しいただいた中に、「${need}」がただの欲求ではなく、`,
    "あなたがこれまでの経験の中で積み重ねてきた、大切な価値観であることが見えてきました。",
    "それは決して大げさなことではなく、あなたという人らしさの一部なのだと思います。",
  ].join("");
}

/**
 * Step6: 自分へのメッセージ
 * -----------------------------------------------------------------------
 * 励まし過ぎず、説教せず、共感し過ぎない。静かに寄り添う一文。
 */
export async function composeSelfMessage(
  ctx: AIContext,
  deeperInsight: string | null
): Promise<string> {
  await wait(1100);

  const need = ctx.needLabels[0] ?? "大切にしているもの";

  if (deeperInsight) {
    return [
      `今日、あなたは自分の中にある「${need}」という大切なものに、少しだけ気づくことができました。`,
      "それに気づけただけで、もう十分です。",
      "",
      "この気持ちを、今すぐ誰かに伝える必要はありません。",
      "ただ、自分がそう感じていたという事実を、今日は覚えておいてあげてください。",
    ].join("\n");
  }

  return [
    `今日、あなたは自分の中にある「${need}」という大切なものに、少しだけ気づくことができました。`,
    "",
    "うまく言葉にならない日があってもいい。答えが出なくてもいい。",
    "自分がそう感じていたという事実を、今日はただ覚えておいてあげてください。",
  ].join("\n");
}

/**
 * Step7: リクエスト案の生成（任意画面）
 * -----------------------------------------------------------------------
 * 命令調・抽象的な要求ではなく、具体的で実行可能な「依頼」を3案つくる。
 */
export async function composeRequests(ctx: AIContext): Promise<RequestOption[]> {
  await wait(1300);

  const need = ctx.needLabels[0] ?? "";

  const base: RequestOption[] = [
    {
      id: "req-1",
      text: "次回、似たようなことがあったときは、結果だけでなく理由も一緒に伝えてもらえると助かります。",
    },
    {
      id: "req-2",
      text: "もし予定や状況が変わりそうなときは、わかった時点で早めに教えてもらえると安心します。",
    },
    {
      id: "req-3",
      text: "今度、5分だけ時間をもらって、今回のことについて率直に話せたらうれしいです。",
    },
  ];

  if (need) {
    base[0] = {
      ...base[0],
      text: `次回、似たようなことがあったときは、私が「${need}」と感じられるように、結果だけでなく理由も一緒に伝えてもらえると助かります。`,
    };
  }

  return base;
}

export const mockAiService: AIService = {
  rewriteObservation,
  suggestEmotions,
  suggestNeeds,
  composeSummary,
  composeDeepQuestion,
  composeDeeperInsight,
  composeSelfMessage,
  composeRequests,
};
