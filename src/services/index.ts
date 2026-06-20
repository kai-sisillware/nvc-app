import { difyAiService } from "./difyAiService";
import type { AIService } from "./AIService";

/**
 * Step4（まとめ）はDifyの実際のワークフローに接続済み。
 * 残りのStepは引き続きmockのまま（difyAiService.ts内でmockに委譲している）。
 * 各Stepの接続が完了するたびに difyAiService.ts 側を1つずつ実装していく。
 */
export const aiService: AIService = difyAiService;

export type { AIService } from "./AIService";
