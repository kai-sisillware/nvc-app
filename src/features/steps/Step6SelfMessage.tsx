import { useEffect } from "react";
import { useJourney } from "../../state/JourneyContext";
import { aiService } from "../../services";
import { findEmotionById } from "../../data/emotions";
import { findNeedById } from "../../data/needs";
import { ScreenContainer, StepHeader } from "../../components/layout";
import { Card, ProgressBar, ThinkingIndicator } from "../../components/ui";

export function Step6SelfMessage() {
  const { state, dispatch } = useJourney();
  const { message, status } = state.selfMessage;
  const { started: deepDiveStarted, insight } = state.deepDive;

  const emotionLabels = state.emotion.selectedIds.map(
    (id) => findEmotionById(id)?.label ?? id.replace("custom-", "")
  );
  const needLabels = state.need.selectedIds
    .map((id) => findNeedById(id)?.label ?? state.need.suggestions.find((n) => n.id === id)?.label)
    .filter((v): v is string => Boolean(v));

  useEffect(() => {
    if (status !== "idle") return;
    let cancelled = false;

    (async () => {
      dispatch({ type: "SET_SELF_MESSAGE_STATUS", status: "loading" });
      const result = await aiService.composeSelfMessage(
        { observationText: state.observation.finalText, emotionLabels, needLabels },
        deepDiveStarted && insight ? insight : null
      );
      if (cancelled) return;
      dispatch({ type: "SET_SELF_MESSAGE", value: result });
      dispatch({ type: "SET_SELF_MESSAGE_STATUS", status: "done" });
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const handleOpenRequest = () => {
    dispatch({ type: "OPEN_REQUEST" });
    dispatch({ type: "GO_TO_STEP", step: 7 });
  };

  const handleRestart = () => dispatch({ type: "RESET" });

  return (
    <ScreenContainer>
      <ProgressBar current={6} />
      <StepHeader eyebrow="Step 6 ・ あなたへ" title="少し、自分に言葉をかけてみます。" />

      <Card className="bg-paper-soft">
        {status === "loading" && <ThinkingIndicator label="言葉を選んでいます" />}

        {status === "done" && (
          <p className="text-[16px] leading-[2.1] text-ink whitespace-pre-line animate-fade-in">
            {message}
          </p>
        )}
      </Card>

      {status === "done" && (
        <div className="mt-10 flex flex-col items-center gap-6">
          <button
            type="button"
            onClick={handleRestart}
            className="text-[13px] text-ink-faint hover:text-ink-soft transition-colors"
          >
            はじめから記録する
          </button>

          <button
            type="button"
            onClick={handleOpenRequest}
            className="text-[13px] text-ink-faint hover:text-moss-600 transition-colors underline-offset-4 hover:underline"
          >
            相手へのリクエストを考えてみる
          </button>
        </div>
      )}
    </ScreenContainer>
  );
}
