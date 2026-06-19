import { useEffect } from "react";
import { useJourney } from "../../state/JourneyContext";
import { aiService } from "../../services";
import { findEmotionById } from "../../data/emotions";
import { findNeedById } from "../../data/needs";
import { ScreenContainer, StepHeader, NavRow } from "../../components/layout";
import { Button, Card, ProgressBar, TextArea, ThinkingIndicator } from "../../components/ui";

export function Step5DeepDive() {
  const { state, dispatch } = useJourney();
  const { started, question, answer, insight, status } = state.deepDive;

  const emotionLabels = state.emotion.selectedIds.map(
    (id) => findEmotionById(id)?.label ?? id.replace("custom-", "")
  );
  const needLabels = state.need.selectedIds
    .map((id) => findNeedById(id)?.label ?? state.need.suggestions.find((n) => n.id === id)?.label)
    .filter((v): v is string => Boolean(v));

  const ctx = { observationText: state.observation.finalText, emotionLabels, needLabels };

  useEffect(() => {
    if (!started || question) return;
    let cancelled = false;

    (async () => {
      dispatch({ type: "SET_DEEP_DIVE_STATUS", status: "loading" });
      const q = await aiService.composeDeepQuestion(ctx);
      if (cancelled) return;
      dispatch({ type: "SET_DEEP_DIVE_QUESTION", value: q });
      dispatch({ type: "SET_DEEP_DIVE_STATUS", status: "done" });
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started]);

  const handleSubmitAnswer = async () => {
    dispatch({ type: "SET_DEEP_DIVE_STATUS", status: "loading" });
    const result = await aiService.composeDeeperInsight(ctx, answer);
    dispatch({ type: "SET_DEEP_DIVE_INSIGHT", value: result });
    dispatch({ type: "SET_DEEP_DIVE_STATUS", status: "done" });
  };

  const goToStep6 = () => dispatch({ type: "GO_TO_STEP", step: 6 });

  return (
    <ScreenContainer>
      <ProgressBar current={5} />
      <StepHeader
        eyebrow="Step 5 ・ もう一歩（任意）"
        title="もう一歩だけ、自分の気持ちを見つめてみますか？"
        description="ここは無理に進まなくても大丈夫です。気が向いたときだけで構いません。"
      />

      <Card>
        {!started && (
          <p className="text-[14.5px] text-ink-soft leading-relaxed">
            よろしければ、AIから一つだけ質問をします。答えなくても、ここで終えても構いません。
          </p>
        )}

        {started && status === "loading" && !question && (
          <ThinkingIndicator label="一つだけ、問いを考えています" />
        )}

        {question && (
          <div className="space-y-4 animate-fade-in">
            <p className="text-[16px] leading-relaxed text-ink font-medium">{question}</p>

            {!insight && (
              <TextArea
                value={answer}
                onChange={(e) => dispatch({ type: "SET_DEEP_DIVE_ANSWER", value: e.target.value })}
                placeholder="思いつくままで大丈夫です"
                disabled={status === "loading"}
              />
            )}

            {status === "loading" && insight === "" && answer !== "" && (
              <ThinkingIndicator label="お話を受け取っています" />
            )}

            {insight && (
              <div className="rounded-2xl border border-moss-200 bg-moss-50 p-4 animate-fade-in">
                <p className="text-[15px] leading-[1.9] text-ink">{insight}</p>
              </div>
            )}
          </div>
        )}
      </Card>

      <NavRow onBack={() => dispatch({ type: "GO_TO_STEP", step: 4 })}>
        {!started && (
          <div className="flex gap-3">
            <Button variant="ghost" onClick={goToStep6}>
              今回はここまでにする
            </Button>
            <Button onClick={() => dispatch({ type: "START_DEEP_DIVE" })}>深掘りする</Button>
          </div>
        )}

        {started && question && !insight && (
          <Button onClick={handleSubmitAnswer} disabled={status === "loading"}>
            送信する
          </Button>
        )}

        {insight && <Button onClick={goToStep6}>次へ進む</Button>}
      </NavRow>
    </ScreenContainer>
  );
}
