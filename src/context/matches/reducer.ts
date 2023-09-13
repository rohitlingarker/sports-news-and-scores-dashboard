import { MatchState, initialState, MatchesActions } from "./types";

export const reducer = (
  state: MatchState = initialState,
  action: MatchesActions
): MatchState => {
  switch (action.type) {
    case "FETCH_MATCHES_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_MATCHES_SUCCESS":
      return {
        ...state,
        isLoading: false,
        originalMatches: action.payload,
        filteredMatches: action.payload,
      };
    case "FETCH_MATCHES_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    case "FETCH_DETAILS_SUCCESS": {
      const { matchId, updatedMatchData } = action.payload;

      // Find the index of the match item to update
      const matchIndex = state.filteredMatches.findIndex(
        (match) => match.id === matchId
      );

      if (matchIndex === -1) {
        // If the match item is not found, return the current state
        return state;
      }

      // Create a copy of the state to ensure immutability
      const newState = { ...state };

      // Update the specific match item in the copied state
      newState.filteredMatches[matchIndex] = {
        ...newState.filteredMatches[matchIndex],
        ...updatedMatchData,
      };
      console.log("newState", newState);

      // Return the updated state
      return newState;
    }

    case "UPDATE_ALL_MATCHES":
      return {
        ...state,
        filteredMatches: action.payload,
      };
    case "FILTER_MATCHES":
      return {
        ...state,
        isLoading: false,
        filteredMatches: action.payload,
      };
    case "UPDATE":
      return {
        ...state,
        isLoading: false,
        originalMatches: action.payload,
      };

    default:
      return state;
  }
};
