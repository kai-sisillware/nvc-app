import { JourneyProvider, useJourney } from "./state/JourneyContext";
import {
  Step0Welcome,
  Step1Observation,
  Step2Emotion,
  Step3Needs,
  Step4Summary,
  Step6SelfMessage,
  Step7Request,
} from "./features/steps";

function StepRouter() {
  const { state } = useJourney();

  switch (state.step) {
    case 0:
      return <Step0Welcome />;
    case 1:
      return <Step1Observation />;
    case 2:
      return <Step2Emotion />;
    case 3:
      return <Step3Needs />;
    case 4:
      return <Step4Summary />;
    case 5:
      // Step5（深掘り）は削除済み。念のためStep6にフォールスルー
      return <Step6SelfMessage />;
    case 6:
      return <Step6SelfMessage />;
    case 7:
      return <Step7Request />;
    default:
      return <Step0Welcome />;
  }
}

function App() {
  return (
    <JourneyProvider>
      <StepRouter />
    </JourneyProvider>
  );
}

export default App;
