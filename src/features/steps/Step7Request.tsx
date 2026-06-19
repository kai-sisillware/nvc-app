import { useEffect } from "react";
import { useJourney } from "../../state/JourneyContext";
import { aiService } from "../../services";
import { findEmotionById } from "../../data/emotions";
import { findNeedById } from "../../data/needs";
import { ScreenContainer, StepHeader, NavRow } from "../../components/layout";
import { Card, ThinkingIndicator } from "../../components/ui";

export function Step7Request() {
  const { state, dispatch } = useJourney();
  const { options, selectedId, status } = state.request;

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
      dispatch({ type: "SET_REQUEST_STATUS", status: "loading" });
      const result = await aiService.composeRequests({
        observationText: state.observation.finalText,
        emotionLabels,
        needLabels,
      });
      if (cancelled) return;
      dispatch({ type: "SET_REQUEST_OPTIONS", value: result });
      dispatch({ type: "SET_REQUEST_STATUS", status: "done" });
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScreenContainer>
      <StepHeader
        eyebrow="Step 7 ・ もし伝えるとしたら（任意）"
        title="もし伝えるとしたら"
        description="これは“正解の言い方”ではありません。あなたが話しやすいように、自由に書き換えて使ってください。"
      />

      <Card>
        {status === "loading" && <ThinkingIndicator label="伝え方の案を考えています" />}

        {status === "done" && (
          <ul className="space-y-3 animate-fade-in">
            {options.map((option) => {
              const selected = selectedId === option.id;
              return (
                <li key={option.id}>
                  <button
                    type="button"
                    onClick={() => dispatch({ type: "SELECT_REQUEST", id: option.id })}
                    aria-pressed={selected}
                    className={`w-full text-left rounded-2xl border px-5 py-4 text-[15px] leading-relaxed transition-all duration-200
                      ${
                        selected
                          ? "bg-clay-100 border-clay-300 text-ink"
                          : "bg-paper-soft border-line text-ink-soft hover:border-clay-200"
                      }`}
                  >
                    {option.text}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </Card>

      <NavRow onBack={() => dispatch({ type: "GO_TO_STEP", step: 6 })} backLabel="メッセージにもどる">
        <button
          type="button"
          onClick={() => dispatch({ type: "RESET" })}
          className="text-[13px] text-ink-faint hover:text-ink-soft transition-colors"
        >
          はじめから記録する
        </button>
      </NavRow>
    </ScreenContainer>
  );
}
