import React, { createContext, useContext, useReducer } from "react";

import { reducer, initialState, TeamState, TeamsActions } from "./reducer";

const TeamStateContext = createContext<TeamState | undefined>(undefined);

export type TeamsDispatch = React.Dispatch<TeamsActions>;

const TeamsDispatchContext = createContext<TeamsDispatch | undefined>(
  undefined
);
export const TeamsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Next, I'll pass the `dispatch` object as value of this TeamsDispatchContext.

  return (
    <TeamStateContext.Provider value={state}>
      <TeamsDispatchContext.Provider value={dispatch}>
        {children}
      </TeamsDispatchContext.Provider>
    </TeamStateContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTeamState = () => useContext(TeamStateContext);
// eslint-disable-next-line react-refresh/only-export-components
export const useTeamsDispatch = () => useContext(TeamsDispatchContext);
