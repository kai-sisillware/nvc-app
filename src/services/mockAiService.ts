import type { AIContext, EmotionOption, NeedOption, RequestOption } from "../types";
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
 * 観察文の語感から、関連しそうな感情を一部抽出して並び替える。
 * mockではキーワードに応じて「不快寄り／快寄り」の重みを調整するのみ。
 */
export async function suggestEmotions(observationText: string): Promise<EmotionOption[]> {
  await wait(900);

  const uncomfortableHint = /(やり直し|無視|変更|怒|否定|拒否|残業|delayed|遅れ)/.test(
    observationText
  );

  const pool = EMOTION_LIBRARY.filter((e) =>
    uncomfortableHint ? e.tone === "uncomfortable" : true
  );

  // よく出やすい代表的な感情を優先的に並べる
  const priorityIds = uncomfortableHint
    ? [
        "frustrated",
        "hurt",
        "anxious",
        "disappointed",
        "helpless",
        "tired",
        "lonely",
        "irritated",
        "sad",
        "confused",
        "tense",
        "overwhelmed",
        "guilty",
        "discouraged",
        "embarrassed",
        "heavy",
      ]
    : [
        "calm",
        "relieved",
        "glad",
        "grateful",
        "secure",
        "satisfied",
        "warm",
        "content",
        "touched",
        "hopeful",
        "connected",
        "peaceful",
      ];

  const prioritized = priorityIds
    .map((id) => pool.find((e) => e.id === id))
    .filter((e): e is EmotionOption => Boolean(e));

  const rest = pool.filter((e) => !priorityIds.includes(e.id));

  return [...prioritized, ...rest].slice(0, 18);
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

    if (/(やり直し|否定|評価)/.test(text) && ["recognition", "respect", "understanding"].includes(need.id)) {
      score += 2;
    }
    if (/(無視|返事がなかった|孤立|さみしい)/.test(text) && ["belonging", "understanding", "empathy"].includes(need.id)) {
      score += 2;
    }
    if (/(変更|予定|裏切)/.test(text) && ["trust", "stability", "clarity"].includes(need.id)) {
      score += 2;
    }
    if (ctx.emotionLabels.some((l) => ["イライラする", "もどかしい"].includes(l)) && ["autonomy", "fairness"].includes(need.id)) {
      score += 1;
    }
    if (ctx.emotionLabels.some((l) => ["疲れた", "重苦しい"].includes(l)) && ["rest", "space"].includes(need.id)) {
      score += 1;
    }

    return { need, score };
  });

  weighted.sort((a, b) => b.score - a.score);

  const top = weighted.slice(0, 14).map(({ need, score }) => ({
    ...need,
    relevance: Math.max(1, Math.min(5, score)) as NeedOption["relevance"],
  }));

  return top;
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
    "うまく言葉にならない日があってもいいし、答えが出なくてもいいのだと思います。",
    "今日はここまで、自分の気持ちに付き合ってくれてありがとうございました。",
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
