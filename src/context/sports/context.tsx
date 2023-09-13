import React, { createContext, useContext, useReducer } from "react";

import { reducer, initialState, SportState, SportsActions } from "./reducer";

const SportStateContext = createContext<SportState | undefined>(undefined);

export type SportsDispatch = React.Dispatch<SportsActions>;

const SportsDispatchContext = createContext<SportsDispatch | undefined>(
  undefined
);
export const SportsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Next, I'll pass the `dispatch` object as value of this SportsDispatchContext.

  return (
    <SportStateContext.Provider value={state}>
      <SportsDispatchContext.Provider value={dispatch}>
        {children}
      </SportsDispatchContext.Provider>
    </SportStateContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSportState = () => useContext(SportStateContext);
// eslint-disable-next-line react-refresh/only-export-components
export const useSportsDispatch = () => useContext(SportsDispatchContext);
