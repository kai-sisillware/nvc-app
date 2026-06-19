import { createContext, useContext, useReducer, type ReactNode } from "react";
import { createInitialState, journeyReducer, type JourneyAction } from "./journeyReducer";
import type { JourneyState } from "../types";

interface JourneyContextValue {
  state: JourneyState;
  dispatch: React.Dispatch<JourneyAction>;
}

const JourneyContext = createContext<JourneyContextValue | undefined>(undefined);

export function JourneyProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(journeyReducer, undefined, createInitialState);

  return (
    <JourneyContext.Provider value={{ state, dispatch }}>{children}</JourneyContext.Provider>
  );
}

export function useJourney(): JourneyContextValue {
  const ctx = useContext(JourneyContext);
  if (!ctx) {
    throw new Error("useJourney は JourneyProvider の内側で使用してください");
  }
  return ctx;
}
