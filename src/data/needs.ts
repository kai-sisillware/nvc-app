import type { NeedOption } from "../types";

/**
 * ニーズ辞書
 * -----------------------------------------------------------------------
 * NVC（非暴力コミュニケーション）における「ニーズ」は、
 * 特定の人や状況に限定されない、誰もが持つ普遍的な大切なものを指す。
 * ここでは西任暁子氏の「本音がわかる会話術」が大切にしている
 * 　“感情の奥には、必ず大切にしたい何かがある”
 * という考え方を尊重し、日常語で扱いやすいカテゴリに整理した。
 *
 * mock実装では、Step1/Step2の入力内容にあるキーワードと
 * カテゴリの relevance（関連度）を簡易マッチングして候補を生成する。
 */
export const NEED_LIBRARY: NeedOption[] = [
  {
    id: "understanding",
    label: "理解されること",
    category: "つながり",
    relevance: 3,
    description: "自分の状況や気持ちを、ちゃんとわかってもらえること",
  },
  {
    id: "respect",
    label: "尊重されること",
    category: "つながり",
    relevance: 3,
    description: "一人の人間として、丁寧に扱ってもらえること",
  },
  {
    id: "belonging",
    label: "つながり",
    category: "つながり",
    relevance: 3,
    description: "孤立せず、誰かと心が通じ合っている感覚",
  },
  {
    id: "empathy",
    label: "共感してもらうこと",
    category: "つながり",
    relevance: 3,
    description: "頑張りや苦しさに、そうだよねと寄り添ってもらえること",
  },
  {
    id: "safety",
    label: "安心・安全",
    category: "安心",
    relevance: 3,
    description: "脅かされず、安全な場所にいると感じられること",
  },
  {
    id: "trust",
    label: "信頼",
    category: "安心",
    relevance: 3,
    description: "相手や状況を、安心して頼れると感じられること",
  },
  {
    id: "stability",
    label: "安定",
    category: "安心",
    relevance: 2,
    description: "予測できる範囲で物事が進み、落ち着いていられること",
  },
  {
    id: "fairness",
    label: "公正さ",
    category: "尊重",
    relevance: 3,
    description: "一方的でなく、対等に扱われること",
  },
  {
    id: "recognition",
    label: "認められること",
    category: "尊重",
    relevance: 3,
    description: "自分の努力や存在そのものを認めてもらえること",
  },
  {
    id: "honesty",
    label: "誠実さ",
    category: "尊重",
    relevance: 2,
    description: "正直で、嘘や建前のないやり取りができること",
  },
  {
    id: "autonomy",
    label: "自分で選べること",
    category: "自由",
    relevance: 3,
    description: "他人にコントロールされず、自分の意思で決められること",
  },
  {
    id: "freedom",
    label: "自由",
    category: "自由",
    relevance: 2,
    description: "枠にはめられず、自分らしくいられること",
  },
  {
    id: "space",
    label: "余裕・ゆとり",
    category: "休息",
    relevance: 2,
    description: "心や時間に、せかされない余白があること",
  },
  {
    id: "rest",
    label: "休息",
    category: "休息",
    relevance: 2,
    description: "無理をせず、心身を休められること",
  },
  {
    id: "ease",
    label: "心の平穏",
    category: "休息",
    relevance: 2,
    description: "波立たず、穏やかでいられること",
  },
  {
    id: "competence",
    label: "役に立てている感覚",
    category: "貢献",
    relevance: 2,
    description: "自分の力が、誰かや何かの役に立っていると感じられること",
  },
  {
    id: "growth",
    label: "成長",
    category: "貢献",
    relevance: 2,
    description: "自分なりに前に進んでいる、学んでいると感じられること",
  },
  {
    id: "meaning",
    label: "意味を感じられること",
    category: "貢献",
    relevance: 2,
    description: "していることに、自分にとっての意味があると感じられること",
  },
  {
    id: "consideration",
    label: "配慮してもらうこと",
    category: "つながり",
    relevance: 2,
    description: "自分の事情や状況をくみ取ってもらえること",
  },
  {
    id: "clarity",
    label: "見通しが持てること",
    category: "安心",
    relevance: 2,
    description: "何がどうなっているか、はっきりわかっていたいこと",
  },
];

export const NEED_CATEGORIES = Array.from(
  new Set(NEED_LIBRARY.map((n) => n.category))
);

export const findNeedById = (id: string): NeedOption | undefined =>
  NEED_LIBRARY.find((n) => n.id === id);
