import type { EmotionOption } from "../types";

/**
 * 感情語彙リスト
 * -----------------------------------------------------------------------
 * 「裏切られた」「無視された」のような“解釈”ではなく、
 * 自分の内側で起きている“感情そのもの”を表す言葉だけを集めている。
 * tone: comfortable = ニーズが満たされている時に湧きやすい感情
 *       uncomfortable = ニーズが満たされていない時に湧きやすい感情
 */
export const EMOTION_LIBRARY: EmotionOption[] = [
  // uncomfortable（満たされていない時）
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

  // comfortable（満たされている時）
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
];

export const findEmotionById = (id: string): EmotionOption | undefined =>
  EMOTION_LIBRARY.find((e) => e.id === id);
