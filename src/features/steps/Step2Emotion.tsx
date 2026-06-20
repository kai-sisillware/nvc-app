import { useEffect, useState } from "react";
import { useJourney } from "../../state/JourneyContext";
import { aiService } from "../../services";
import { ScreenContainer, StepHeader, NavRow } from "../../components/layout";
import { Button, Card, ProgressBar, SelectableChip, ThinkingIndicator } from "../../components/ui";

export function Step2Emotion() {
  const { state, dispatch } = useJourney();
  const { suggestions, matchedTone, selectedIds, status } = state.emotion;
  const [customDraft, setCustomDraft] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [showOtherTone, setShowOtherTone] = useState(false);

  useEffect(() => {
    if (status !== "idle") return;
    let cancelled = false;

    (async () => {
      dispatch({ type: "SET_EMOTION_STATUS", status: "loading" });
      const result = await aiService.suggestEmotions(state.observation.finalText);
      if (cancelled) return;
      dispatch({
        type: "SET_EMOTION_SUGGESTIONS",
        value: result.suggestions,
        matchedTone: result.matchedTone,
      });
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

  // 既定では「観察文から推定した傾向」に合う感情だけを表示し、
  // 反対側の傾向はトグルを押すまで隠しておく（消すわけではない）
  const primaryEmotions = suggestions.filter(
    (e) => !matchedTone || e.tone === matchedTone || e.id.startsWith("custom-")
  );
  const otherEmotions = suggestions.filter((e) => matchedTone && e.tone !== matchedTone);

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
          <div className="space-y-5 animate-fade-in">
            <div className="flex flex-wrap gap-2.5">
              {primaryEmotions.map((emotion) => (
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

            {otherEmotions.length > 0 && (
              <div>
                {!showOtherTone ? (
                  <button
                    type="button"
                    onClick={() => setShowOtherTone(true)}
                    className="text-[13px] text-ink-faint hover:text-moss-600 transition-colors underline-offset-4 hover:underline"
                  >
                    しっくりこなければ、ほかの気持ちも見てみる
                  </button>
                ) : (
                  <div className="space-y-2.5 pt-1 border-t border-line">
                    <p className="text-[12.5px] text-ink-faint pt-3">こちらの気持ちかもしれません</p>
                    <div className="flex flex-wrap gap-2.5">
                      {otherEmotions.map((emotion) => (
                        <SelectableChip
                          key={emotion.id}
                          label={emotion.label}
                          selected={selectedIds.includes(emotion.id)}
                          onToggle={() => dispatch({ type: "TOGGLE_EMOTION", id: emotion.id })}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
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
