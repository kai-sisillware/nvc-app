import type { EmotionOption } from "../types";

/**
 * 感情語彙リスト
 * -----------------------------------------------------------------------
 * 「裏切られた」「無視された」のような“解釈”ではなく、
 * 自分の内側で起きている“感情そのもの”を表す言葉だけを集めている。
 * tone: comfortable = ニーズが満たされている時に湧きやすい感情
 *       uncomfortable = ニーズが満たされていない時に湧きやすい感情
 *
 * NVC（非暴力コミュニケーション）が一般に紹介している感情語彙の考え方を
 * 参考にしつつ、独自に選定・分類した語彙セット。
 */
export const EMOTION_LIBRARY: EmotionOption[] = [
  // ---- uncomfortable（満たされていない時に湧きやすい） ----
  { id: "sad", label: "悲しい", tone: "uncomfortable" },
  { id: "lonely", label: "さみしい", tone: "uncomfortable" },
  { id: "frustrated", label: "もどかしい", tone: "uncomfortable" },
  { id: "irritated", label: "イライラする", tone: "uncomfortable" },
  { id: "anxious", label: "不安", tone: "uncomfortable" },
  { id: "helpless", label: "無力感がある", tone: "uncomfortable" },
  { id: "confused", label: "戸惑う", tone: "uncomfortable" },
  { id: "tired", label: "疲れた", tone: "uncomfortable" },
  { id: "hurt", label: "傷ついた", tone: "uncomfortable" },
  { id: "tense", label: "緊張する", tone: "uncomfortable" },
  { id: "disappointed", label: "がっかりする", tone: "uncomfortable" },
  { id: "embarrassed", label: "恥ずかしい", tone: "uncomfortable" },
  { id: "angry", label: "腹立たしい", tone: "uncomfortable" },
  { id: "heavy", label: "重苦しい", tone: "uncomfortable" },
  { id: "empty", label: "むなしい", tone: "uncomfortable" },
  { id: "nervous", label: "落ち着かない", tone: "uncomfortable" },
  { id: "overwhelmed", label: "いっぱいいっぱい", tone: "uncomfortable" },
  { id: "discouraged", label: "気落ちする", tone: "uncomfortable" },
  { id: "guilty", label: "申し訳ない気持ち", tone: "uncomfortable" },
  { id: "regretful", label: "後悔している", tone: "uncomfortable" },
  { id: "ashamed", label: "情けない", tone: "uncomfortable" },
  { id: "resentful", label: "釈然としない", tone: "uncomfortable" },
  { id: "jealous", label: "うらやましい", tone: "uncomfortable" },
  { id: "suspicious", label: "疑わしい気持ち", tone: "uncomfortable" },
  { id: "powerless", label: "どうにもならない感じ", tone: "uncomfortable" },
  { id: "isolated", label: "孤立している感じ", tone: "uncomfortable" },
  { id: "misunderstood", label: "わかってもらえない感じ", tone: "uncomfortable" },
  { id: "exhausted", label: "へとへと", tone: "uncomfortable" },
  { id: "bored", label: "退屈", tone: "uncomfortable" },
  { id: "restless", label: "そわそわする", tone: "uncomfortable" },
  { id: "afraid", label: "怖い", tone: "uncomfortable" },
  { id: "worried", label: "心配", tone: "uncomfortable" },
  { id: "impatient", label: "せかせかする", tone: "uncomfortable" },
  { id: "uneasy", label: "気まずい", tone: "uncomfortable" },
  { id: "vulnerable", label: "無防備な感じ", tone: "uncomfortable" },
  { id: "numb", label: "感覚がまひする", tone: "uncomfortable" },
  { id: "stuck", label: "行き詰まる", tone: "uncomfortable" },
  { id: "disheartened", label: "しょんぼりする", tone: "uncomfortable" },
  { id: "tearful", label: "泣きたい気持ち", tone: "uncomfortable" },
  { id: "irritable", label: "ピリピリする", tone: "uncomfortable" },
  { id: "apathetic", label: "やる気が出ない", tone: "uncomfortable" },
  { id: "torn", label: "板挟みでつらい", tone: "uncomfortable" },
  { id: "small", label: "自分が小さく感じる", tone: "uncomfortable" },
  { id: "cold_inside", label: "心が冷える感じ", tone: "uncomfortable" },
  { id: "shaken", label: "動揺する", tone: "uncomfortable" },
  { id: "dazed", label: "茫然とする", tone: "uncomfortable" },
  { id: "panicked", label: "パニックになる", tone: "uncomfortable" },
  { id: "trapped", label: "追い詰められた感じ", tone: "uncomfortable" },
  { id: "lethargic", label: "気が重い", tone: "uncomfortable" },
  { id: "gloomy", label: "どんよりした気分", tone: "uncomfortable" },
  { id: "hesitant", label: "ためらいがある", tone: "uncomfortable" },
  { id: "self_conscious", label: "気後れする", tone: "uncomfortable" },

  // ---- comfortable（満たされている時に湧きやすい） ----
  { id: "relieved", label: "ほっとする", tone: "comfortable" },
  { id: "calm", label: "穏やか", tone: "comfortable" },
  { id: "glad", label: "うれしい", tone: "comfortable" },
  { id: "grateful", label: "ありがたい", tone: "comfortable" },
  { id: "satisfied", label: "満たされている", tone: "comfortable" },
  { id: "hopeful", label: "希望を感じる", tone: "comfortable" },
  { id: "warm", label: "あたたかい気持ち", tone: "comfortable" },
  { id: "energized", label: "やる気がわく", tone: "comfortable" },
  { id: "secure", label: "安心する", tone: "comfortable" },
  { id: "proud", label: "誇らしい", tone: "comfortable" },
  { id: "excited", label: "わくわくする", tone: "comfortable" },
  { id: "peaceful", label: "心が落ち着いている", tone: "comfortable" },
  { id: "content", label: "充実している", tone: "comfortable" },
  { id: "touched", label: "胸が熱くなる", tone: "comfortable" },
  { id: "refreshed", label: "すっきりする", tone: "comfortable" },
  { id: "curious", label: "興味がわく", tone: "comfortable" },
  { id: "inspired", label: "刺激を受ける", tone: "comfortable" },
  { id: "connected", label: "つながりを感じる", tone: "comfortable" },
  { id: "confident", label: "自信がある", tone: "comfortable" },
  { id: "playful", label: "楽しい気分", tone: "comfortable" },
  { id: "tender", label: "やさしい気持ち", tone: "comfortable" },
  { id: "free_feeling", label: "自由な感じ", tone: "comfortable" },
  { id: "comfortable_feeling", label: "心地よい", tone: "comfortable" },
  { id: "appreciated", label: "大事にされている感じ", tone: "comfortable" },
  { id: "lighthearted", label: "気持ちが軽い", tone: "comfortable" },
  { id: "moved", label: "感動した", tone: "comfortable" },
  { id: "joyful", label: "喜んでいる", tone: "comfortable" },
  { id: "cheerful", label: "晴れやかな気分", tone: "comfortable" },
  { id: "fulfilled", label: "満ち足りている", tone: "comfortable" },
  { id: "nostalgic_warm", label: "懐かしい気持ち", tone: "comfortable" },
  { id: "amused", label: "愉快な気分", tone: "comfortable" },
  { id: "vivid", label: "生き生きしている", tone: "comfortable" },
  { id: "tranquil", label: "落ち着いている", tone: "comfortable" },
];

export const findEmotionById = (id: string): EmotionOption | undefined =>
  EMOTION_LIBRARY.find((e) => e.id === id);
