/**
 * Netlify Function: dify-requests
 * -----------------------------------------------------------------------
 * Step7（もし伝えるとしたら）用のDifyワークフローを安全に呼び出す中継サーバー。
 * 必要な環境変数（Netlifyのサイト設定で登録する）:
 *   DIFY_REQUESTS_API_KEY ... Step7(リクエスト)ワークフローの API Key
 *   DIFY_API_BASE          ... 省略時は https://api.dify.ai/v1 を使用
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

  const apiKey = process.env.DIFY_REQUESTS_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "DIFY_REQUESTS_API_KEY is not configured on the server" }),
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

    const raw = data?.data?.outputs?.request_json;

    if (!raw) {
      return {
        statusCode: 502,
        body: JSON.stringify({ error: "request_json not found in Dify response", raw: data }),
      };
    }

    // プロンプトでJSON配列のみを出力するよう指示しているが、
    // 念のためコードブロック記号(```)が混ざっていた場合に備えて取り除く
    const cleaned = String(raw)
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      return {
        statusCode: 502,
        body: JSON.stringify({ error: "Failed to parse request_json as JSON", raw: cleaned }),
      };
    }

    if (!Array.isArray(parsed) || parsed.length === 0) {
      return {
        statusCode: 502,
        body: JSON.stringify({ error: "request_json did not contain a non-empty array", raw: cleaned }),
      };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requests: parsed }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to reach Dify", detail: String(err) }),
    };
  }
};
