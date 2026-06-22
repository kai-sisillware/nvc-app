import { useEffect } from "react";
import { useJourney } from "../../state/JourneyContext";
import { aiService } from "../../services";
import { findEmotionById } from "../../data/emotions";
import { findNeedById } from "../../data/needs";
import { ScreenContainer, StepHeader } from "../../components/layout";
import { Card, ThinkingIndicator } from "../../components/ui";

/** Step0 と同じ海藻ロゴを小さく表示するインラインSVG */
function SeaweedLogo({ size = 180 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 300 64"
      width={size}
      role="img"
      aria-label="SelfEmpathy"
      xmlns="http://www.w3.org/2000/svg"
      style={{ fontFamily: "'Zen Old Mincho', serif", opacity: 0.55 }}
    >
      <title>SelfEmpathy</title>
      <path fill="none" stroke="#5B7065" strokeWidth="2.2" strokeLinecap="round"
        d="M 18 60 C 14 50, 26 42, 18 30 C 10 18, 24 10, 18 2"/>
      <path fill="none" stroke="#5B7065" strokeWidth="1.6" strokeLinecap="round"
        d="M 18 38 C 30 32, 36 24, 30 16"/>
      <path fill="none" stroke="#5B7065" strokeWidth="1.6" strokeLinecap="round"
        d="M 16 22 C 4 16, 0 8, 6 2"/>
      <path fill="none" stroke="#5B7065" strokeWidth="1.2" strokeLinecap="round"
        d="M 18 50 C 8 46, 4 40, 8 34"/>
      <path fill="none" stroke="#5B7065" strokeWidth="1.6" strokeLinecap="round"
        d="M 34 60 C 40 48, 28 38, 36 26 C 44 14, 34 6, 40 0"/>
      <path fill="none" stroke="#5B7065" strokeWidth="1.4" strokeLinecap="round"
        d="M 36 44 C 26 40, 20 34, 24 28"/>
      <path fill="none" stroke="#5B7065" strokeWidth="1.2" strokeLinecap="round"
        d="M 36 28 C 48 22, 52 14, 46 8"/>
      <path fill="none" stroke="#5B7065" strokeWidth="1.2" strokeLinecap="round"
        d="M 50 60 C 48 50, 56 42, 50 30 C 46 20, 52 12, 50 4"/>
      <path fill="none" stroke="#5B7065" strokeWidth="1.0" strokeLinecap="round"
        d="M 50 36 C 60 30, 64 22, 58 16"/>
      <circle fill="none" stroke="#5B7065" strokeWidth="1.2" cx="68" cy="50" r="3.5"/>
      <circle fill="none" stroke="#5B7065" strokeWidth="1.0" cx="76" cy="38" r="2.5"/>
      <circle fill="none" stroke="#5B7065" strokeWidth="1.2" cx="72" cy="24" r="3"/>
      <circle fill="none" stroke="#5B7065" strokeWidth="0.9" cx="80" cy="14" r="2"/>
      <circle fill="none" stroke="#5B7065" strokeWidth="1.0" cx="66" cy="10" r="2.5"/>
      <circle fill="none" stroke="#5B7065" strokeWidth="0.8" cx="78" cy="4"  r="1.5"/>
      <circle fill="none" stroke="#5B7065" strokeWidth="0.8" cx="64" cy="30" r="1.2"/>
      <text
        x="90" y="42"
        fontSize="28"
        fontWeight="400"
        fill="#2E2B27"
        letterSpacing="2"
        fontFamily="'Zen Old Mincho', serif"
      >
        SelfEmpathy
      </text>
    </svg>
  );
}

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
        eyebrow="Step 6 ・ もし伝えるとしたら"
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
          <SeaweedLogo size={180} />

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
