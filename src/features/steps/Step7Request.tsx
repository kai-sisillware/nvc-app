import { useEffect } from "react";
import { useJourney } from "../../state/JourneyContext";
import { aiService } from "../../services";
import { findEmotionById } from "../../data/emotions";
import { findNeedById } from "../../data/needs";
import { ScreenContainer, StepHeader } from "../../components/layout";
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

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScreenContainer>
      <StepHeader
        eyebrow="もし誰かに伝えるとしたら"
        title="言葉の候補です。"
        description={
          <>
            自分の気持ちや大切にしていることを、
            もし誰かに伝えるとしたら、何と言えるでしょう。
            <br />
            正解はありません。あなたが話しやすい言葉に、自由に書き換えて使ってください。
          </>
        }
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
                      ${selected
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

      {/* エール */}
      {status === "done" && (
        <div className="mt-6 rounded-2xl border border-line bg-paper-soft px-5 py-5 space-y-2 animate-fade-in">
          <p className="text-[13.5px] leading-[1.9] text-ink-soft">
            誰かに自分の気持ちを伝えることは、本当に難しいことです。
            <br />
            でも今日、あなたは自分の感情と向き合い、その奥にある大切なものを探しました。
            <br />
            それだけで、もう十分です。
          </p>
        </div>
      )}

      {/* 閉幕 */}
      {status === "done" && (
        <div className="mt-10 flex flex-col items-center gap-5 pb-6 animate-fade-in">
          {/* ロゴ */}
          <div className="flex items-center gap-2 opacity-60">
            <svg viewBox="0 0 28 28" className="w-5 h-5 flex-shrink-0" aria-hidden="true">
              <path
                d="M14 24 C6 17.5, 1.5 11, 1.5 6.5 C1.5 2.8, 4.8 0.5, 8.5 0.5 C11 0.5, 12.8 1.8, 14 4.2 C15.2 1.8, 17 0.5, 19.5 0.5 C23.2 0.5, 26.5 2.8, 26.5 6.5 C26.5 11, 22 17.5, 14 24 Z"
                fill="#5B7065"
              />
            </svg>
            <span className="text-[14px] font-display text-ink-soft">SelfEmpathy</span>
          </div>

          <button
            type="button"
            onClick={() => dispatch({ type: "RESET" })}
            className="text-[13px] text-ink-faint hover:text-ink-soft transition-colors"
          >
            もう一度、別の出来事を記録する
          </button>

          <button
            type="button"
            onClick={() => dispatch({ type: "GO_TO_STEP", step: 6 })}
            className="text-[13px] text-ink-faint hover:text-ink-soft transition-colors"
          >
            ← メッセージにもどる
          </button>
        </div>
      )}
    </ScreenContainer>
  );
}
