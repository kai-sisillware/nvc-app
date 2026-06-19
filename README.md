# きもち翻訳 ― 自分の気持ちに気づくノート

NVC（非暴力コミュニケーション）の考え方をベースにした、
**「自分の本当のニーズに気づく」ための7ステップ・セルフ理解アプリ**です。

リクエスト（誰かへの伝え方）を作ることはゴールではなく、
あくまで「自分を理解できた」という体験を最優先に設計しています。

---

## 技術スタック

- React 19 + TypeScript
- Vite
- TailwindCSS 3
- AI部分は現在すべて **mock実装**（`src/services/mockAiService.ts`）

---

## セットアップ

```bash
npm install
npm run dev       # 開発サーバー起動
npm run build     # 本番ビルド
npm run preview   # ビルド結果のプレビュー
```

---

## ディレクトリ構成

```
src/
  types/             ドメイン型定義（JourneyState など）
  data/
    emotions.ts       感情語彙ライブラリ
    needs.ts           ニーズ辞書（NVCの普遍的ニーズをカテゴリ整理）
  services/
    AIService.ts        AIサービスのインターフェース（契約）
    mockAiService.ts     mock実装（現在使用中）
    index.ts             実装の差し替えポイント
  state/
    journeyReducer.ts   useReducerによる状態管理ロジック
    JourneyContext.tsx  Context Provider / useJourney フック
  components/
    ui/                 Button, Card, ProgressBar などの汎用UI部品
    layout/              ScreenContainer, StepHeader, NavRow
  features/
    steps/                Step1〜Step7 各画面コンポーネント
  App.tsx                  ステップに応じた画面切り替え（簡易ルーター）
```

各Stepコンポーネントは `useJourney()` で状態を読み書きし、
`aiService`（`src/services/index.ts` 経由）を呼び出してAI候補を取得します。
画面側はmockかDifyかを意識しない設計になっています。

---

## Dify API への接続方法（将来対応）

1. `src/services/difyAiService.ts` を新規作成し、`AIService` インターフェースを実装する。
   各メソッドが対応するDifyワークフローは `AIService.ts` のコメントに記載しています。

   ```ts
   // src/services/difyAiService.ts
   import type { AIService } from "./AIService";

   const DIFY_API_BASE = import.meta.env.VITE_DIFY_API_BASE;
   const DIFY_API_KEY = import.meta.env.VITE_DIFY_API_KEY;

   export const difyAiService: AIService = {
     async rewriteObservation(rawInput) {
       const res = await fetch(`${DIFY_API_BASE}/workflows/run`, {
         method: "POST",
         headers: {
           Authorization: `Bearer ${DIFY_API_KEY}`,
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
           inputs: { raw_input: rawInput },
           response_mode: "blocking",
           user: "anonymous",
         }),
       });
       const data = await res.json();
       return data.data.outputs.rewritten_text;
     },
     // ...他のメソッドも同様に実装
   };
   ```

2. `src/services/index.ts` の `export const aiService` を差し替える。

   ```ts
   import { difyAiService } from "./difyAiService";
   export const aiService: AIService = difyAiService;
   ```

3. `.env` に `VITE_DIFY_API_BASE` / `VITE_DIFY_API_KEY` を追加する。

画面側（`features/steps/*`）の修正は一切不要です。

---

## 設計上のこだわり（抜粋）

- **評価しない**: ニーズの優先度は★ではなく、やわらかい円（`RelevanceDots`）で表現。採点されている感覚を避けています。
- **急かさない**: AIの応答には意図的に短い遅延を入れ、`ThinkingIndicator` で「今、ことばを整えている最中です」と伝えます。
- **選ばなくてもいい**: Step2（感情）は0件選択でも進めます。Step5（深掘り）は最大1問、スキップ可能です。
- **押し付けない**: Step6の自分へのメッセージは、励まし・説教・共感過多を避け、静かな文体で統一しています。
- **任意であることの明示**: Step7（リクエスト）は画面下部の小さなテキストリンクのみで導線を作り、メイン体験から切り離しています。

---

## 今後の拡張余地

- 入力内容のローカル保存（ブラウザを閉じても続きから）
- これまでの記録一覧（自分のニーズの傾向に気づく機能）
- 感情・ニーズ語彙の多言語化
