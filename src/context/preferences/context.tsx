import React, { createContext, useContext, useReducer } from "react";
import { PreferenceState, PreferencesActions, initialState } from "./types";
import { reducer } from "./reducer";


const PreferenceStateContext = createContext<PreferenceState | undefined>(undefined);

    export type PreferencesDispatch = React.Dispatch<PreferencesActions>;

    const PreferencesDispatchContext = createContext<PreferencesDispatch | undefined>(undefined);
    export const PreferencesProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
      const [state, dispatch] = useReducer(reducer, initialState);
    
      // Next, I'll pass the `dispatch` object as value of this PreferencesDispatchContext.
    
      return (
        <PreferenceStateContext.Provider value={state}>
          <PreferencesDispatchContext.Provider value={dispatch}>
            {children}
          </PreferencesDispatchContext.Provider>
        </PreferenceStateContext.Provider>
      );
    };

    // eslint-disable-next-line react-refresh/only-export-components
    export const usePreferenceState = () => useContext(PreferenceStateContext);
    // eslint-disable-next-line react-refresh/only-export-components
    export const usePreferencesDispatch = () => useContext(PreferencesDispatchContext);