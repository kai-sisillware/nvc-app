import { useState } from "react";
import { useJourney } from "../../state/JourneyContext";
import { aiService } from "../../services";
import { ScreenContainer, StepHeader, NavRow } from "../../components/layout";
import { Button, Card, ProgressBar, TextArea, ThinkingIndicator } from "../../components/ui";

export function Step1Observation() {
  const { state, dispatch } = useJourney();
  const { rawInput, aiSuggestion, finalText, status } = state.observation;
  const [editing, setEditing] = useState(false);

  const hasSuggestion = status === "done" && aiSuggestion;

  const handleRewrite = async () => {
    if (!rawInput.trim()) return;
    dispatch({ type: "SET_OBSERVATION_STATUS", status: "loading" });
    const suggestion = await aiService.rewriteObservation(rawInput);
    dispatch({ type: "SET_OBSERVATION_SUGGESTION", value: suggestion });
    dispatch({ type: "SET_OBSERVATION_STATUS", status: "done" });
  };

  const handleUseAsIs = () => {
    dispatch({ type: "SET_OBSERVATION_FINAL", value: rawInput });
    dispatch({ type: "GO_TO_STEP", step: 2 });
  };

  const handleContinue = () => {
    dispatch({ type: "GO_TO_STEP", step: 2 });
  };

  return (
    <ScreenContainer>
      <ProgressBar current={1} />
      <StepHeader
        eyebrow="Step 1 ・ 観察"
        title="何がありましたか？"
        description={
          <>
            実際に見聞きした出来事を、解釈や評価を加えず、事実だけで書いてみましょう。
            <br />
            「誰が・いつ・どこで・何を言った（した）」が伝わると、次のステップに進みやすくなります。
          </>
        }
      />

      <Card>
        <TextArea
          value={rawInput}
          onChange={(e) => {
            dispatch({ type: "SET_OBSERVATION_RAW", value: e.target.value });
            if (status !== "idle") {
              dispatch({ type: "SET_OBSERVATION_STATUS", status: "idle" });
            }
          }}
          placeholder="例：上司にバカにされた…のように、思ったままで大丈夫です"
          disabled={status === "loading"}
        />

        {status === "loading" && <ThinkingIndicator label="出来事を整理しています" />}

        {hasSuggestion && (
          <div className="mt-6 space-y-3 animate-fade-in">
            <p className="text-[13px] text-moss-600">
              事実に近いかたちで、こんなふうに言い表せそうです。気になるところは自由に直してください。
            </p>
            <div className="rounded-2xl border border-moss-200 bg-moss-50 p-4">
              {editing ? (
                <TextArea
                  value={finalText}
                  onChange={(e) =>
                    dispatch({ type: "SET_OBSERVATION_FINAL", value: e.target.value })
                  }
                  className="bg-paper-soft"
                />
              ) : (
                <p className="text-[15px] leading-relaxed text-ink">{finalText}</p>
              )}
            </div>
            <button
              type="button"
              onClick={() => setEditing((v) => !v)}
              className="text-[13px] text-moss-600 hover:underline underline-offset-4"
            >
              {editing ? "編集を終える" : "この文章を編集する"}
            </button>
          </div>
        )}
      </Card>

      <NavRow>
        {hasSuggestion ? (
          <Button onClick={handleContinue} disabled={!finalText.trim()}>
            次へ進む
          </Button>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3 items-end sm:items-center">
            <Button variant="ghost" onClick={handleUseAsIs} disabled={!rawInput.trim()}>
              自分の言葉のまま次へ
            </Button>
            <Button onClick={handleRewrite} disabled={!rawInput.trim() || status === "loading"}>
              AIに整えてもらう
            </Button>
          </div>
        )}
      </NavRow>
    </ScreenContainer>
  );
}
