import { useJourney } from "../../state/JourneyContext";
import { ScreenContainer, StepHeader, NavRow } from "../../components/layout";
import { Button, Card, ProgressBar, TextArea } from "../../components/ui";

export function Step1Observation() {
  const { state, dispatch } = useJourney();
  const { rawInput } = state.observation;

  const handleContinue = () => {
    // AI整形は将来Dify接続時に復活予定。現在はそのままfinalTextとして使用。
    dispatch({ type: "SET_OBSERVATION_FINAL", value: rawInput });
    dispatch({ type: "GO_TO_STEP", step: 2 });
  };

  return (
    <ScreenContainer>
      <ProgressBar current={1} />
      <StepHeader
        eyebrow="Step 1 ・ 見る"
        title="何がありましたか？"
        description={
          <>
            実際にあった出来事を、なるべく事実だけで書いてみましょう。
            <br />
            気持ちや判断は、次のステップで整理できます。
            <br />
            「誰が・何を言った（した）」がわかると、進みやすくなります。
          </>
        }
      />

      <Card>
        <TextArea
          value={rawInput}
          onChange={(e) =>
            dispatch({ type: "SET_OBSERVATION_RAW", value: e.target.value })
          }
          placeholder="友達に連絡したのに、ずっと既読がつかなかった…"
        />
      </Card>

      <NavRow onBack={() => dispatch({ type: "GO_TO_STEP", step: 0 })}>
        <Button onClick={handleContinue} disabled={!rawInput.trim()}>
          次へ
        </Button>
      </NavRow>
    </ScreenContainer>
  );
}
