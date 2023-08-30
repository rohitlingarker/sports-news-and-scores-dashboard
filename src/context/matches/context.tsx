/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useReducer } from "react";

import { reducer, initialState, MatchState, MatchesActions } from "./reducer";

const MatchStateContext = createContext<MatchState | undefined>(undefined);

    export type MatchesDispatch = React.Dispatch<MatchesActions>;

    const MatchesDispatchContext = createContext<MatchesDispatch | undefined>(undefined);
    export const MatchesProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
      const [state, dispatch] = useReducer(reducer, initialState);
    
      // Next, I'll pass the `dispatch` object as value of this MatchesDispatchContext.
    
      return (
        <MatchStateContext.Provider value={state}>
          <MatchesDispatchContext.Provider value={dispatch}>
            {children}
          </MatchesDispatchContext.Provider>
        </MatchStateContext.Provider>
      );
    };

    export const useMatchState = () => useContext(MatchStateContext);
    export const useMatchesDispatch = () => useContext(MatchesDispatchContext);