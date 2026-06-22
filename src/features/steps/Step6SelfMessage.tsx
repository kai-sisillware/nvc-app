import { useEffect } from "react";
import { useJourney } from "../../state/JourneyContext";
import { aiService } from "../../services";
import { findEmotionById } from "../../data/emotions";
import { findNeedById } from "../../data/needs";
import { ScreenContainer, StepHeader } from "../../components/layout";
import { Button, Card, ProgressBar, ThinkingIndicator } from "../../components/ui";

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

      {status === "done" && (
        <div className="mt-10 flex flex-col items-center gap-5">
          {!allComfortable && (
            <Button variant="secondary" onClick={handleOpenRequest}>
              もし誰かに伝えるとしたら
            </Button>
          )}
          <button
            type="button"
            onClick={handleRestart}
            className="text-[13px] text-ink-faint hover:text-ink-soft transition-colors"
          >
            はじめから記録する
          </button>
        </div>
      )}
    </ScreenContainer>
  );
}
