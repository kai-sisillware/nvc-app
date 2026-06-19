import { useEffect } from "react";
import { useJourney } from "../../state/JourneyContext";
import { aiService } from "../../services";
import { findEmotionById } from "../../data/emotions";
import { findNeedById } from "../../data/needs";
import { ScreenContainer, StepHeader, NavRow } from "../../components/layout";
import { Button, Card, ProgressBar, ThinkingIndicator } from "../../components/ui";

export function Step4Summary() {
  const { state, dispatch } = useJourney();
  const { message, status } = state.summary;

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
      dispatch({ type: "SET_SUMMARY_STATUS", status: "loading" });
      const result = await aiService.composeSummary({
        observationText: state.observation.finalText,
        emotionLabels,
        needLabels,
      });
      if (cancelled) return;
      dispatch({ type: "SET_SUMMARY_MESSAGE", value: result });
      dispatch({ type: "SET_SUMMARY_STATUS", status: "done" });
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <ScreenContainer>
      <ProgressBar current={4} />
      <StepHeader eyebrow="Step 4 ・ まとめ" title="あなたの気持ちを整理してみました。" />

      <Card className="bg-moss-50/60 border-moss-100">
        {status === "loading" && <ThinkingIndicator label="ここまでの気持ちをつなげています" />}

        {status === "done" && (
          <div className="space-y-7 animate-fade-in">
            <section>
              <p className="text-[12.5px] tracking-[0.15em] text-moss-500 uppercase mb-2.5">
                感じたこと
              </p>
              <div className="flex flex-wrap gap-2">
                {emotionLabels.map((label) => (
                  <span
                    key={label}
                    className="rounded-full bg-paper-soft border border-moss-200 px-3.5 py-1.5 text-[13.5px] text-ink"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </section>

            <div className="h-px bg-moss-100" />

            <section>
              <p className="text-[12.5px] tracking-[0.15em] text-moss-500 uppercase mb-2.5">
                大切にしているニーズ
              </p>
              <div className="flex flex-wrap gap-2">
                {needLabels.map((label) => (
                  <span
                    key={label}
                    className="rounded-full bg-moss-500 px-3.5 py-1.5 text-[13.5px] text-paper-soft"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </section>

            <div className="h-px bg-moss-100" />

            <section>
              <p className="text-[12.5px] tracking-[0.15em] text-moss-500 uppercase mb-3">
                AIからのまとめ
              </p>
              <p className="text-[16px] leading-[2] text-ink whitespace-pre-line">{message}</p>
            </section>
          </div>
        )}
      </Card>

      {status === "done" && (
        <NavRow onBack={() => dispatch({ type: "GO_TO_STEP", step: 3 })}>
          <Button onClick={() => dispatch({ type: "GO_TO_STEP", step: 5 })}>次へ進む</Button>
        </NavRow>
      )}
    </ScreenContainer>
  );
}
