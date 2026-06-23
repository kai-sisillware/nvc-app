import type { AIContext, EmotionSuggestionResult, RequestOption } from "../types";
import type { AIService } from "./AIService";
import { mockAiService } from "./mockAiService";

/**
 * Dify接続版 AIService（段階導入中）
 * 現在 Dify の実ワークフローに接続済み:
 *   - Step2: suggestEmotions（観察文から感情をピック）
 *   - Step4: composeSummary（まとめ）
 *   - Step7: composeRequests（リクエスト案）
 * それ以外は mockAiService に委譲。
 */

async function suggestEmotionsViaDify(observationText: string): Promise<EmotionSuggestionResult> {
  const base = await mockAiService.suggestEmotions(observationText);

  try {
    const res = await fetch("/.netlify/functions/dify-emotions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ observation_text: observationText }),
    });

    if (!res.ok) {
      console.error("Dify emotions call failed", res.status);
      return base;
    }

    const data = await res.json();
    const aiPickedIds: string[] = Array.isArray(data.emotion_ids) ? data.emotion_ids : [];

    return { ...base, aiPickedIds };
  } catch (err) {
    console.error("Dify emotions error", err);
    return base;
  }
}

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
    console.error("Dify summary request failed", res.status);
    return mockAiService.composeSummary(ctx);
  }

  const data = await res.json();
  if (!data.summary_text) {
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
    console.error("Dify requests call failed", res.status);
    return mockAiService.composeRequests(ctx);
  }

  const data = await res.json();
  const texts: unknown = data.requests;

  if (!Array.isArray(texts) || texts.length === 0) {
    return mockAiService.composeRequests(ctx);
  }

  return texts.map((text, index) => ({
    id: `req-${index + 1}`,
    text: String(text),
  }));
}

export const difyAiService: AIService = {
  ...mockAiService,
  suggestEmotions: suggestEmotionsViaDify,
  composeSummary: composeSummaryViaDify,
  composeRequests: composeRequestsViaDify,
};
