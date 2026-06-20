/**
 * Netlify Function: dify-summary
 * -----------------------------------------------------------------------
 * ブラウザから直接Difyを呼ばず、必ずこの中継サーバーを経由させることで
 * Dify APIキーをフロントエンドのコードに含めないようにする。
 *
 * 必要な環境変数（Netlifyのサイト設定で登録する）:
 *   DIFY_SUMMARY_API_KEY ... Step4(まとめ)ワークフローの API Key
 *   DIFY_API_BASE         ... 省略時は https://api.dify.ai/v1 を使用
 */
exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON body" }) };
  }

  const { observation_text, emotion_labels, need_labels } = payload;

  if (!observation_text) {
    return { statusCode: 400, body: JSON.stringify({ error: "observation_text is required" }) };
  }

  const apiKey = process.env.DIFY_SUMMARY_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "DIFY_SUMMARY_API_KEY is not configured on the server" }),
    };
  }

  const apiBase = process.env.DIFY_API_BASE || "https://api.dify.ai/v1";

  try {
    const res = await fetch(`${apiBase}/workflows/run`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: {
          observation_text,
          emotion_labels: emotion_labels || "",
          need_labels: need_labels || "",
        },
        response_mode: "blocking",
        user: "kimochi-checker-user",
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        statusCode: res.status,
        body: JSON.stringify({ error: "Dify API error", detail: data }),
      };
    }

    const summaryText = data?.data?.outputs?.summary_text;

    if (!summaryText) {
      return {
        statusCode: 502,
        body: JSON.stringify({ error: "summary_text not found in Dify response", raw: data }),
      };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ summary_text: summaryText }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to reach Dify", detail: String(err) }),
    };
  }
};
