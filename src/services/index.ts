import { mockAiService } from "./mockAiService";
import type { AIService } from "./AIService";

/**
 * 現在は mockAiService を使用。
 * Dify接続時は difyAiService.ts を作成し、ここを差し替えるだけでよい。
 *
 * 例:
 *   import { difyAiService } from "./difyAiService";
 *   export const aiService: AIService = difyAiService;
 */
export const aiService: AIService = mockAiService;

export type { AIService } from "./AIService";
