/**
 * ドメイン型定義
 * -----------------------------------------------------------------------
 * このアプリの中心的なデータ構造。
 * Step1〜Step7 の各画面が読み書きする「ユーザーの気づきの記録」を表す。
 * 将来 Dify API に接続する際も、この型はそのままリクエスト/レスポンスの
 * 受け皿として利用できるように設計している。
 */

/** ウィザード全体のステップ番号（0=ウェルカム画面、Step7 は任意なので isRequestOpen で制御） */
export type StepNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

/** AIへの問い合わせが進行中かどうかを表す共通ステータス */
export type AsyncStatus = "idle" | "loading" | "done" | "error";

/* ----------------------------- Step1: 観察 ----------------------------- */

export interface ObservationState {
  /** ユーザーが最初に書いた、評価や解釈を含むかもしれない生の文章 */
  rawInput: string;
  /** AIが事実ベースの表現に書き直した提案文 */
  aiSuggestion: string;
  /** ユーザーが最終的に採用した文章（編集された場合はその内容） */
  finalText: string;
  status: AsyncStatus;
}

/* ----------------------------- Step2: 感情 ----------------------------- */

export interface EmotionOption {
  id: string;
  label: string;
  /** 感情のカテゴリ（怒り・悲しみ・不安 など） */
  category: string;
  tone: "comfortable" | "uncomfortable";
}

export interface EmotionState {
  suggestions: EmotionOption[];
  /** Step1の文章から推定された「満たされている／いない」の傾向。判定できた方を初期表示で優先する */
  matchedTone: EmotionOption["tone"] | null;
  selectedIds: string[];
  /** ユーザーが「その他」から自由入力した感情 */
  customEmotions: string[];
  status: AsyncStatus;
}

/** suggestEmotions の戻り値。判定したtoneと、それに基づいて並べた候補一覧をセットで返す */
export interface EmotionSuggestionResult {
  suggestions: EmotionOption[];
  matchedTone: EmotionOption["tone"];
}

/* ----------------------------- Step3: ニーズ ----------------------------- */

export interface NeedOption {
  id: string;
  label: string;
  /** ニーズの大分類（例: つながり・安心・自由 など） */
  category: string;
  /** AIが推定した「今回これがどれくらい関係していそうか」の度合い 1〜5 */
  relevance: 1 | 2 | 3 | 4 | 5;
  description: string;
}

export interface NeedState {
  suggestions: NeedOption[];
  selectedIds: string[];
  status: AsyncStatus;
}

/* ----------------------------- Step4: まとめ ----------------------------- */

export interface SummaryState {
  message: string;
  status: AsyncStatus;
}

/* --------------------------- Step5: 深掘り（最大1問） --------------------------- */

export interface DeepDiveState {
  /** 深掘りを開始したか */
  started: boolean;
  question: string;
  answer: string;
  insight: string;
  status: AsyncStatus;
}

/* ----------------------------- Step6: 自分へのメッセージ ----------------------------- */

export interface SelfMessageState {
  message: string;
  status: AsyncStatus;
}

/* ----------------------------- Step7: リクエスト（任意） ----------------------------- */

export interface RequestOption {
  id: string;
  text: string;
}

export interface RequestState {
  /** ユーザーがリンクを押して開いたかどうか */
  opened: boolean;
  options: RequestOption[];
  selectedId: string | null;
  status: AsyncStatus;
}

/* ----------------------------- 全体の状態 ----------------------------- */

export interface JourneyState {
  step: StepNumber;
  observation: ObservationState;
  emotion: EmotionState;
  need: NeedState;
  summary: SummaryState;
  deepDive: DeepDiveState;
  selfMessage: SelfMessageState;
  request: RequestState;
}

/** AIサービス層（mock / 将来のDify接続）が共通して受け取る入力 */
export interface AIContext {
  observationText: string;
  emotionLabels: string[];
  needLabels: string[];
}
