import { useEffect } from "react";
import { useJourney } from "../../state/JourneyContext";
import { aiService } from "../../services";
import { findEmotionById } from "../../data/emotions";
import { findNeedById } from "../../data/needs";
import { ScreenContainer, StepHeader } from "../../components/layout";
import { Button, Card, ProgressBar, ThinkingIndicator } from "../../components/ui";

/**
 * 観察文に特定の相手（人物）が登場するかを簡易判定する。
 * 判定できない場合は「いる」扱いにする（ユーザー指示: よくわからなければいるていで）。
 */
function detectHasTarget(text: string): boolean {
  if (!text) return true;

  // 人物を明示するキーワードが含まれていれば「相手あり」
  const personHints =
    /友達|友人|彼女|彼氏|彼|上司|同僚|先輩|後輩|部長|社長|先生|親|お母さん|お父さん|母|父|兄|姉|弟|妹|家族|パートナー|夫|妻|子供|子ども|さん|くん|ちゃん|たち|から言われ|に言われ|された|してくれ|してもらえ|言った|怒られ|無視され|褒められ/;

  if (personHints.test(text)) return true;

  // 明確に「人がいない」ことを示すキーワードがあれば「相手なし」
  const noPersonHints =
    /天気|渋滞|電車|交通|システム|機械|アプリ|仕事量|締め切り|締切|進まない|うまくいかない|自分が|自分は/;

  if (noPersonHints.test(text)) return false;

  // どちらとも判定できなければ「いる」扱い
  return true;
}

export function Step6SelfMessage() {
  const { state, dispatch } = useJourney();
  const { message, status } = state.selfMessage;

  const emotionLabels = state.emotion.selectedIds.map(
    (id) => findEmotionById(id)?.label ?? id.replace("custom-", "")
  );
  const needLabels = state.need.selectedIds
    .map((id) => findNeedById(id)?.label ?? state.need.suggestions.find((n) => n.id === id)?.label)
    .filter((v): v is string => Boolean(v));

  // 選択した感情がすべて「快寄り」の場合、リクエストを提案しない
  const allComfortable =
    state.emotion.selectedIds.length > 0 &&
    state.emotion.selectedIds.every((id) => {
      const emotion = findEmotionById(id);
      return !emotion || emotion.tone === "comfortable";
    });

  // 相手が存在しそうかどうかをStep1の観察文から判定
  const hasTarget = detectHasTarget(state.observation.finalText);

  // リクエストボタンを表示するか
  const showRequestButton = !allComfortable && hasTarget;

  useEffect(() => {
    if (status !== "idle") return;
    let cancelled = false;

    (async () => {
      dispatch({ type: "SET_SELF_MESSAGE_STATUS", status: "loading" });
      const result = await aiService.composeSelfMessage(
        { observationText: state.observation.finalText, emotionLabels, needLabels },
        null
      );
      if (cancelled) return;
      dispatch({ type: "SET_SELF_MESSAGE", value: result });
      dispatch({ type: "SET_SELF_MESSAGE_STATUS", status: "done" });
    })();

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenRequest = () => {
    dispatch({ type: "OPEN_REQUEST" });
    dispatch({ type: "GO_TO_STEP", step: 7 });
  };

  const handleRestart = () => dispatch({ type: "RESET" });

  return (
    <ScreenContainer>
      <ProgressBar current={5} />
      <StepHeader eyebrow="Step 5 ・ あなたへ" title="少し、自分に言葉をかけてみます。" />

      <Card className="bg-paper-soft">
        {status === "loading" && <ThinkingIndicator label="言葉を選んでいます" />}
        {status === "done" && (
          <p className="text-[16px] leading-[2.1] text-ink whitespace-pre-line animate-fade-in">
            {message}
          </p>
        )}
      </Card>

      {/* ナビゲーションエリア（loading中も戻るボタンは表示） */}
      <div className="mt-10 flex flex-col items-center gap-5">

        {/* Step7への誘導（条件付き） */}
        {status === "done" && showRequestButton && (
          <Button variant="secondary" onClick={handleOpenRequest}>
            もし相手に伝えるとしたら…
          </Button>
        )}

        {/* 下部ナビゲーション */}
        <div className="flex items-center justify-between w-full mt-2">
          <button
            type="button"
            onClick={() => dispatch({ type: "GO_TO_STEP", step: 4 })}
            className="text-[14px] text-ink-faint hover:text-ink-soft transition-colors"
          >
            ← まとめにもどる
          </button>

          {status === "done" && (
            <button
              type="button"
              onClick={handleRestart}
              className="text-[13px] text-ink-faint hover:text-ink-soft transition-colors"
            >
              はじめから記録する
            </button>
          )}
        </div>

      </div>
    </ScreenContainer>
  );
}
