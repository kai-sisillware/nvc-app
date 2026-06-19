import { useEffect } from "react";
import { useJourney } from "../../state/JourneyContext";
import { aiService } from "../../services";
import { findEmotionById } from "../../data/emotions";
import { ScreenContainer, StepHeader, NavRow } from "../../components/layout";
import { Button, Card, ProgressBar, RelevanceDots, ThinkingIndicator } from "../../components/ui";

export function Step3Needs() {
  const { state, dispatch } = useJourney();
  const { suggestions, selectedIds, status } = state.need;

  const emotionLabels = state.emotion.selectedIds.map(
    (id) => findEmotionById(id)?.label ?? id.replace("custom-", "")
  );

  useEffect(() => {
    if (status !== "idle") return;
    let cancelled = false;

    (async () => {
      dispatch({ type: "SET_NEED_STATUS", status: "loading" });
      const result = await aiService.suggestNeeds({
        observationText: state.observation.finalText,
        emotionLabels,
        needLabels: [],
      });
      if (cancelled) return;
      dispatch({ type: "SET_NEED_SUGGESTIONS", value: result });
      dispatch({ type: "SET_NEED_STATUS", status: "done" });
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <ScreenContainer>
      <ProgressBar current={3} />
      <StepHeader
        eyebrow="Step 3 ・ ニーズ"
        title="その感情の背景には、どのような大切なニーズがありましたか？"
        description="正解はありません。しっくりくるものを、いくつでも選んでみてください。"
      />

      <Card>
        {status === "loading" && <ThinkingIndicator label="大切にしていることをさがしています" />}

        {status === "done" && (
          <ul className="space-y-2.5 animate-fade-in">
            {suggestions.map((need) => {
              const selected = selectedIds.includes(need.id);
              return (
                <li key={need.id}>
                  <button
                    type="button"
                    onClick={() => dispatch({ type: "TOGGLE_NEED", id: need.id })}
                    aria-pressed={selected}
                    className={`w-full text-left rounded-2xl border px-5 py-4 transition-all duration-200
                      ${
                        selected
                          ? "bg-moss-50 border-moss-300"
                          : "bg-paper-soft border-line hover:border-moss-200"
                      }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[15.5px] text-ink font-medium">{need.label}</span>
                      <RelevanceDots value={need.relevance} />
                    </div>
                    <p className="mt-1 text-[13.5px] text-ink-soft leading-relaxed">
                      {need.description}
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </Card>

      <NavRow onBack={() => dispatch({ type: "GO_TO_STEP", step: 2 })}>
        <Button
          onClick={() => dispatch({ type: "GO_TO_STEP", step: 4 })}
          disabled={selectedIds.length === 0}
        >
          次へ進む
        </Button>
      </NavRow>
    </ScreenContainer>
  );
}
