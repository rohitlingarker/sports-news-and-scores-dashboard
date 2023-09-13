/* eslint-disable no-case-declarations */

import { PreferenceState, initialState, PreferencesActions } from "./types";



export const reducer = (
  state: PreferenceState = initialState,
  action: PreferencesActions
): PreferenceState => {
  switch (action.type) {
    case "UPDATE_PREFERENCES":
      return action.payload;
    case "TOGGLE_SPORT":
      const { payload: sportName } = action;
      const isSportPreferred = state.preferredSports.includes(sportName);
      // If the sport is already preferred, remove it; otherwise, add it
      if (isSportPreferred) {
        console.log();
        return {
          ...state,
          preferredSports: state.preferredSports.filter(
            (name) => name !== sportName
          ),
        };
      } else {
        return {
          ...state,
          preferredSports: [...state.preferredSports, sportName],
        };
      }
    case "TOGGLE_TEAM":
      const { payload: teamId } = action;
      const isTeamPreferred = state.preferredTeams.includes(teamId);

      // If the team is already preferred, remove it; otherwise, add it
      if (isTeamPreferred) {
        return {
          ...state,
          preferredTeams: state.preferredTeams.filter((id) => id !== teamId),
        };
      } else {
        return {
          ...state,
          preferredTeams: [...state.preferredTeams, teamId],
        };
      }

    default:
      return state;
  }
};

