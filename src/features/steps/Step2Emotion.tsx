import { useEffect, useState } from "react";
import { useJourney } from "../../state/JourneyContext";
import { aiService } from "../../services";
import { ScreenContainer, StepHeader, NavRow } from "../../components/layout";
import { Button, Card, ProgressBar, SelectableChip, ThinkingIndicator } from "../../components/ui";

export function Step2Emotion() {
  const { state, dispatch } = useJourney();
  const { suggestions, selectedIds, status } = state.emotion;
  const [customDraft, setCustomDraft] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  useEffect(() => {
    if (status !== "idle") return;
    let cancelled = false;

    (async () => {
      dispatch({ type: "SET_EMOTION_STATUS", status: "loading" });
      const result = await aiService.suggestEmotions(state.observation.finalText);
      if (cancelled) return;
      dispatch({ type: "SET_EMOTION_SUGGESTIONS", value: result });
      dispatch({ type: "SET_EMOTION_STATUS", status: "done" });
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const handleAddCustom = () => {
    if (!customDraft.trim()) return;
    dispatch({ type: "ADD_CUSTOM_EMOTION", label: customDraft.trim() });
    setCustomDraft("");
    setShowCustomInput(false);
  };

  return (
    <ScreenContainer>
      <ProgressBar current={2} />
      <StepHeader
        eyebrow="Step 2 ・ 感情"
        title="その出来事を受けて、あなたはどんな気持ちになりましたか？"
        description={
          <>
            「裏切られた」「無視された」などは感情ではなく解釈です。
            <br />
            あなた自身の気持ちを選んでみましょう。いくつ選んでも、選ばなくても大丈夫です。
          </>
        }
      />

      <Card>
        {status === "loading" && <ThinkingIndicator label="気持ちの候補をさがしています" />}

        {status === "done" && (
          <div className="flex flex-wrap gap-2.5 animate-fade-in">
            {suggestions.map((emotion) => (
              <SelectableChip
                key={emotion.id}
                label={emotion.label}
                selected={selectedIds.includes(emotion.id)}
                onToggle={() => dispatch({ type: "TOGGLE_EMOTION", id: emotion.id })}
              />
            ))}

            {showCustomInput ? (
              <div className="flex items-center gap-2">
                <input
                  autoFocus
                  value={customDraft}
                  onChange={(e) => setCustomDraft(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddCustom()}
                  placeholder="ことばを入力"
                  className="rounded-full border border-line bg-paper-soft px-4 py-2.5 text-[14px]
                    focus:border-moss-300 focus:outline-none focus:ring-2 focus:ring-moss-100 w-32"
                />
                <button
                  type="button"
                  onClick={handleAddCustom}
                  className="text-[13px] text-moss-600 hover:underline"
                >
                  追加
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowCustomInput(true)}
                className="rounded-full border border-dashed border-line px-4 py-2.5 text-[14px] text-ink-faint hover:text-ink-soft hover:border-ink-faint transition-colors"
              >
                ＋ その他
              </button>
            )}
          </div>
        )}
      </Card>

      <NavRow onBack={() => dispatch({ type: "GO_TO_STEP", step: 1 })}>
        <Button onClick={() => dispatch({ type: "GO_TO_STEP", step: 3 })}>次へ進む</Button>
      </NavRow>
    </ScreenContainer>
  );
}
