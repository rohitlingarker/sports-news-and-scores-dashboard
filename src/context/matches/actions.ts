import { API_ENDPOINT } from "../../config/constants";
import { PreferenceState, TeamName } from "../preferences/types";
import { MatchesDispatch } from "./context";
import { MatchItem } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchMatches = async (dispatch: any) => {
  try {
    dispatch({ type: "FETCH_MATCHES_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/matches`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    //   console.log("fetched successfully");
    const data = await response.json();
    let matches: MatchItem[] = data.matches;

    // Custom sort function to prioritize live matches
    const customSort = (a: MatchItem, b: MatchItem) => {
      if (a.isRunning && !b.isRunning) {
        return -1;
      } else if (!a.isRunning && b.isRunning) {
        return 1;
      } else {
        return 0;
      }
    };
    matches = matches.sort(customSort);

    //filter...
    const userData = localStorage.getItem("userData");

    if (userData) {
      const userPreferences = await JSON.parse(userData).preferences;

      filterMatches(dispatch, matches, userPreferences);
      dispatch({
        type: "UPDATE",
        payload: matches,
      });
    } else {
      dispatch({
        type: "FETCH_MATCHES_SUCCESS",
        payload: matches,
      });
    }

    // console.log("matches",matches);

    // updateAllMatches(dispatch,matches)
  } catch (error) {
    console.error("", error);
    dispatch({ type: "FETCH_MATCHES_FAILURE" });
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchMatchDetails = async (args: any) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/matches/${args.id}`);
    const matchData = await response.json();
    // console.log(matchData,"matchdata")

    return matchData;
  } catch (error) {
    console.log("error", error, "fetch details");
  }
};

export function filterMatches(
  dispatch: MatchesDispatch,
  originalMatches: MatchItem[],
  preferenceState: PreferenceState
): void {
  const { preferredSports, preferredTeams } = preferenceState;

  if (preferredSports.length == 0 && preferredTeams.length == 0) {
    dispatch({
      type: "FILTER_MATCHES",
      payload: originalMatches,
    });
    return;
  }

  console.log("original matches", originalMatches);

  // Filter matches based on preferred sports and teams.
  const filteredMatches = originalMatches.filter((match) => {
    const isSportMatch = preferredSports.includes(match.sportName);
    const isTeamMatch = preferredTeams.some((teamName: TeamName) =>
      match.teams.some((team) => team.name === teamName)
    );

    return isSportMatch || isTeamMatch;
  });

  // Sort the filtered matches by date (you can use a custom sorting function).
  filteredMatches.sort((a, b) => {
    const dateA = new Date(a.startsAt).getTime();
    const dateB = new Date(b.startsAt).getTime();

    // Sort in descending order (newest first).
    return dateB - dateA;
  });

  // Dispatch the filtered matches.
  // console.log("filteredMatches",filteredMatches);

  dispatch({
    type: "FILTER_MATCHES",
    payload: filteredMatches,
  });
}
