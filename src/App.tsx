import { JourneyProvider, useJourney } from "./state/JourneyContext";
import {
  Step1Observation,
  Step2Emotion,
  Step3Needs,
  Step4Summary,
  Step5DeepDive,
  Step6SelfMessage,
  Step7Request,
} from "./features/steps";

function StepRouter() {
  const { state } = useJourney();

  switch (state.step) {
    case 1:
      return <Step1Observation />;
    case 2:
      return <Step2Emotion />;
    case 3:
      return <Step3Needs />;
    case 4:
      return <Step4Summary />;
    case 5:
      return <Step5DeepDive />;
    case 6:
      return <Step6SelfMessage />;
    case 7:
      return <Step7Request />;
    default:
      return <Step1Observation />;
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
