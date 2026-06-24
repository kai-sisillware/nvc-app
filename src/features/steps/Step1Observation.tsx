import { useState } from "react";
import { useJourney } from "../../state/JourneyContext";
import { ScreenContainer, StepHeader, NavRow } from "../../components/layout";
import { Button, Card, ProgressBar, TextArea } from "../../components/ui";

/** プレースホルダー例文（マウント時にランダムで1つ選ぶ） */
const PLACEHOLDER_EXAMPLES = [
  "友達に連絡したのに、ずっと既読がつかなかった…",
  "飲み会に自分だけ呼ばれていなかった…",
  "約束の日に急にキャンセルされた…",
  "久しぶりに会ったら、なんとなく距離を感じた…",
  "頑張って仕上げた資料に、何のコメントもなかった…",
  "体調が悪いのに、気づいてもらえなかった…",
  "自分の気持ちを話したら「考えすぎ」と言われた…",
  "大事な話の途中でスマホを触られた…",
  "丁寧に話したのに、返信がとても雑だった…",
  "何かやる気が出なくて、ずっとぼーっとしていた…",
  "みんなが笑っている中で、自分だけ意味が分からなかった…",
  "言いたいことが言えないまま、その場が終わった…",
];

export function Step1Observation() {
  const { state, dispatch } = useJourney();
  const { rawInput } = state.observation;

  // マウント時にランダムで1つ選ぶ
  const [placeholder] = useState(
    () => PLACEHOLDER_EXAMPLES[Math.floor(Math.random() * PLACEHOLDER_EXAMPLES.length)]
  );

  const handleContinue = () => {
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
          placeholder={placeholder}
        />
        <p className="mt-3 text-[12.5px] text-ink-faint leading-relaxed">
          うまく書けなくても大丈夫です。テキストにしなくても、まず自分の中でじっくりと振り返ってから、次に進んでみてください。
        </p>
      </Card>

      <NavRow onBack={() => dispatch({ type: "GO_TO_STEP", step: 0 })}>
        <Button onClick={handleContinue} disabled={!rawInput.trim()}>
          次へ
        </Button>
      </NavRow>
    </ScreenContainer>
  );
}
