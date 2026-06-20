import type { AIContext, EmotionSuggestionResult, NeedOption, RequestOption } from "../types";

/**
 * AIサービスのインターフェース
 * -----------------------------------------------------------------------
 * 画面（features/steps配下）はこのインターフェースだけに依存する。
 * 現在は mockAiService.ts が実装を提供しているが、
 * 将来 Dify のワークフローAPIに接続する際は、
 * 同じシグネチャを持つ difyAiService.ts を作成して
 * services/index.ts の export を差し替えるだけで良い。
 *
 * 想定する Dify 側の対応関係（実装時の参考）:
 *   rewriteObservation   -> 「観察への書き直し」ワークフロー
 *   suggestEmotions      -> 「感情候補抽出」ワークフロー
 *   suggestNeeds         -> 「ニーズ候補抽出」ワークフロー
 *   composeSummary       -> 「気持ちの要約」ワークフロー
 *   composeDeepQuestion  -> 「深掘り質問生成」ワークフロー
 *   composeDeeperInsight -> 「深掘り回答の統合」ワークフロー
 *   composeSelfMessage   -> 「自分へのメッセージ生成」ワークフロー
 *   composeRequests      -> 「リクエスト文生成」ワークフロー
 */
export interface AIService {
  rewriteObservation(rawInput: string): Promise<string>;
  suggestEmotions(observationText: string): Promise<EmotionSuggestionResult>;
  suggestNeeds(ctx: AIContext): Promise<NeedOption[]>;
  composeSummary(ctx: AIContext): Promise<string>;
  composeDeepQuestion(ctx: AIContext): Promise<string>;
  composeDeeperInsight(ctx: AIContext, answer: string): Promise<string>;
  composeSelfMessage(ctx: AIContext, deeperInsight: string | null): Promise<string>;
  composeRequests(ctx: AIContext): Promise<RequestOption[]>;
}
