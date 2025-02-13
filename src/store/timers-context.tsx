import { createContext, useContext, useReducer, type ReactNode } from "react";

export type Timer = {
  name: string;
  duration: number;
};

type TimersState = {
  isRunning: boolean;
  timers: Timer[];
};

const initialState: TimersState = {
  isRunning: false,
  timers: [],
};

type TimersContextValue = TimersState & {
  start: () => void;
  stop: () => void;
  addTimer: (timer: Timer) => void;
};

const TimersContext = createContext<TimersContextValue | null>(null);

export function useTimersContext() {
  const ctx = useContext(TimersContext);

  if (!ctx) {
    throw new Error(
      "TimersContext is Null. Make sure you are using the TimersContextProvider."
    );
  }

  return ctx;
}

type TimersContextProviderProps = {
  children: ReactNode;
};

type StartTimersAction = {
  type: "START";
};

type StopTimersAction = {
  type: "STOP";
};

type AddTimerAction = {
  type: "ADD_TIMER";
  payload: Timer;
};

type Action = StartTimersAction | StopTimersAction | AddTimerAction;

function timersReducer(state: TimersState, action: Action): TimersState {
  switch (action.type) {
    case "START":
      return { ...state, isRunning: true };
    case "STOP":
      return { ...state, isRunning: false };
    case "ADD_TIMER":
      return { ...state, timers: [...state.timers, action.payload!] };
    default:
      return state;
  }
}

export default function TimersContextProvider({
  children,
}: TimersContextProviderProps) {
  const [timersState, dispatch] = useReducer(timersReducer, initialState);

  const ctx: TimersContextValue = {
    isRunning: timersState.isRunning,
    timers: timersState.timers,
    start: () => {
      dispatch({ type: "START" });
    },
    stop: () => {
      dispatch({ type: "STOP" });
    },
    addTimer: (timer: Timer) => {
      dispatch({ type: "ADD_TIMER", payload: timer });
    },
  };

  return (
    <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>
  );
}
