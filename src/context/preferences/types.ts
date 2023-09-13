export type SportName = string;
export type TeamName = string;

export interface PreferenceState {
  preferredSports: SportName[];
  preferredTeams: TeamName[];
}

export const initialState: PreferenceState = {
  preferredSports: [],
  preferredTeams: [],
};

export type PreferencesActions =
  | { type: "UPDATE_PREFERENCES"; payload: PreferenceState }
  | { type: "TOGGLE_SPORT"; payload: SportName }
  | { type: "TOGGLE_TEAM"; payload: TeamName };
