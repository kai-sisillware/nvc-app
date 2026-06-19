import type { JourneyState } from "../types";

export const createInitialState = (): JourneyState => ({
  step: 1,
  observation: {
    rawInput: "",
    aiSuggestion: "",
    finalText: "",
    status: "idle",
  },
  emotion: {
    suggestions: [],
    selectedIds: [],
    customEmotions: [],
    status: "idle",
  },
  need: {
    suggestions: [],
    selectedIds: [],
    status: "idle",
  },
  summary: {
    message: "",
    status: "idle",
  },
  deepDive: {
    started: false,
    question: "",
    answer: "",
    insight: "",
    status: "idle",
  },
  selfMessage: {
    message: "",
    status: "idle",
  },
  request: {
    opened: false,
    options: [],
    selectedId: null,
    status: "idle",
  },
});

export type JourneyAction =
  | { type: "GO_TO_STEP"; step: JourneyState["step"] }
  | { type: "SET_OBSERVATION_RAW"; value: string }
  | { type: "SET_OBSERVATION_STATUS"; status: JourneyState["observation"]["status"] }
  | { type: "SET_OBSERVATION_SUGGESTION"; value: string }
  | { type: "SET_OBSERVATION_FINAL"; value: string }
  | { type: "SET_EMOTION_STATUS"; status: JourneyState["emotion"]["status"] }
  | { type: "SET_EMOTION_SUGGESTIONS"; value: JourneyState["emotion"]["suggestions"] }
  | { type: "TOGGLE_EMOTION"; id: string }
  | { type: "ADD_CUSTOM_EMOTION"; label: string }
  | { type: "SET_NEED_STATUS"; status: JourneyState["need"]["status"] }
  | { type: "SET_NEED_SUGGESTIONS"; value: JourneyState["need"]["suggestions"] }
  | { type: "TOGGLE_NEED"; id: string }
  | { type: "SET_SUMMARY_STATUS"; status: JourneyState["summary"]["status"] }
  | { type: "SET_SUMMARY_MESSAGE"; value: string }
  | { type: "START_DEEP_DIVE" }
  | { type: "SET_DEEP_DIVE_STATUS"; status: JourneyState["deepDive"]["status"] }
  | { type: "SET_DEEP_DIVE_QUESTION"; value: string }
  | { type: "SET_DEEP_DIVE_ANSWER"; value: string }
  | { type: "SET_DEEP_DIVE_INSIGHT"; value: string }
  | { type: "SET_SELF_MESSAGE_STATUS"; status: JourneyState["selfMessage"]["status"] }
  | { type: "SET_SELF_MESSAGE"; value: string }
  | { type: "OPEN_REQUEST" }
  | { type: "SET_REQUEST_STATUS"; status: JourneyState["request"]["status"] }
  | { type: "SET_REQUEST_OPTIONS"; value: JourneyState["request"]["options"] }
  | { type: "SELECT_REQUEST"; id: string }
  | { type: "RESET" };

export function journeyReducer(state: JourneyState, action: JourneyAction): JourneyState {
  switch (action.type) {
    case "GO_TO_STEP":
      return { ...state, step: action.step };

    case "SET_OBSERVATION_RAW":
      return { ...state, observation: { ...state.observation, rawInput: action.value } };
    case "SET_OBSERVATION_STATUS":
      return { ...state, observation: { ...state.observation, status: action.status } };
    case "SET_OBSERVATION_SUGGESTION":
      return {
        ...state,
        observation: {
          ...state.observation,
          aiSuggestion: action.value,
          finalText: action.value,
        },
      };
    case "SET_OBSERVATION_FINAL":
      return { ...state, observation: { ...state.observation, finalText: action.value } };

    case "SET_EMOTION_STATUS":
      return { ...state, emotion: { ...state.emotion, status: action.status } };
    case "SET_EMOTION_SUGGESTIONS":
      return { ...state, emotion: { ...state.emotion, suggestions: action.value } };
    case "TOGGLE_EMOTION": {
      const exists = state.emotion.selectedIds.includes(action.id);
      return {
        ...state,
        emotion: {
          ...state.emotion,
          selectedIds: exists
            ? state.emotion.selectedIds.filter((id) => id !== action.id)
            : [...state.emotion.selectedIds, action.id],
        },
      };
    }
    case "ADD_CUSTOM_EMOTION": {
      const label = action.label.trim();
      if (!label) return state;
      const id = `custom-${label}`;
      return {
        ...state,
        emotion: {
          ...state.emotion,
          customEmotions: [...state.emotion.customEmotions, label],
          suggestions: [...state.emotion.suggestions, { id, label, tone: "uncomfortable" }],
          selectedIds: [...state.emotion.selectedIds, id],
        },
      };
    }

    case "SET_NEED_STATUS":
      return { ...state, need: { ...state.need, status: action.status } };
    case "SET_NEED_SUGGESTIONS":
      return { ...state, need: { ...state.need, suggestions: action.value } };
    case "TOGGLE_NEED": {
      const exists = state.need.selectedIds.includes(action.id);
      return {
        ...state,
        need: {
          ...state.need,
          selectedIds: exists
            ? state.need.selectedIds.filter((id) => id !== action.id)
            : [...state.need.selectedIds, action.id],
        },
      };
    }

    case "SET_SUMMARY_STATUS":
      return { ...state, summary: { ...state.summary, status: action.status } };
    case "SET_SUMMARY_MESSAGE":
      return { ...state, summary: { ...state.summary, message: action.value } };

    case "START_DEEP_DIVE":
      return { ...state, deepDive: { ...state.deepDive, started: true } };
    case "SET_DEEP_DIVE_STATUS":
      return { ...state, deepDive: { ...state.deepDive, status: action.status } };
    case "SET_DEEP_DIVE_QUESTION":
      return { ...state, deepDive: { ...state.deepDive, question: action.value } };
    case "SET_DEEP_DIVE_ANSWER":
      return { ...state, deepDive: { ...state.deepDive, answer: action.value } };
    case "SET_DEEP_DIVE_INSIGHT":
      return { ...state, deepDive: { ...state.deepDive, insight: action.value } };

    case "SET_SELF_MESSAGE_STATUS":
      return { ...state, selfMessage: { ...state.selfMessage, status: action.status } };
    case "SET_SELF_MESSAGE":
      return { ...state, selfMessage: { ...state.selfMessage, message: action.value } };

    case "OPEN_REQUEST":
      return { ...state, request: { ...state.request, opened: true } };
    case "SET_REQUEST_STATUS":
      return { ...state, request: { ...state.request, status: action.status } };
    case "SET_REQUEST_OPTIONS":
      return { ...state, request: { ...state.request, options: action.value } };
    case "SELECT_REQUEST":
      return { ...state, request: { ...state.request, selectedId: action.id } };

    case "RESET":
      return createInitialState();

    default:
      return state;
  }
}
