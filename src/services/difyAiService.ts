import type { AIContext, RequestOption } from "../types";
import type { AIService } from "./AIService";
import { mockAiService } from "./mockAiService";

/**
 * Dify接続版 AIService（段階導入中）
 * -----------------------------------------------------------------------
 * 現在 Dify の実ワークフローに接続済み:
 *   - Step4: composeSummary
 *   - Step7: composeRequests
 * それ以外（Step1〜3, Step5, Step6）は引き続き mockAiService を使用。
 * Difyワークフローを用意できたタイミングで1つずつ本実装に差し替えていく。
 *
 * いずれも直接Difyを呼ばず、必ず Netlify Functions
 * （netlify/functions/*.js）を経由する。
 * これはAPIキーをブラウザに露出させないための必須の構成。
 */
async function composeSummaryViaDify(ctx: AIContext): Promise<string> {
  const res = await fetch("/.netlify/functions/dify-summary", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      observation_text: ctx.observationText,
      emotion_labels: ctx.emotionLabels.join(", "),
      need_labels: ctx.needLabels.join(", "),
    }),
  });

  if (!res.ok) {
    // Dify側の不調時は、ユーザーを止めないようmockの文面にフォールバックする
    console.error("Dify summary request failed", res.status, await res.text());
    return mockAiService.composeSummary(ctx);
  }

  const data = await res.json();
  if (!data.summary_text) {
    console.error("Dify summary response missing summary_text", data);
    return mockAiService.composeSummary(ctx);
  }

  return data.summary_text as string;
}

async function composeRequestsViaDify(ctx: AIContext): Promise<RequestOption[]> {
  const res = await fetch("/.netlify/functions/dify-requests", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      observation_text: ctx.observationText,
      emotion_labels: ctx.emotionLabels.join(", "),
      need_labels: ctx.needLabels.join(", "),
    }),
  });

  if (!res.ok) {
    console.error("Dify requests call failed", res.status, await res.text());
    return mockAiService.composeRequests(ctx);
  }

  const data = await res.json();
  const texts: unknown = data.requests;

  if (!Array.isArray(texts) || texts.length === 0) {
    console.error("Dify requests response missing requests array", data);
    return mockAiService.composeRequests(ctx);
  }

  return texts.map((text, index) => ({
    id: `req-${index + 1}`,
    text: String(text),
  }));
}

export const difyAiService: AIService = {
  ...mockAiService,
  composeSummary: composeSummaryViaDify,
  composeRequests: composeRequestsViaDify,
};
