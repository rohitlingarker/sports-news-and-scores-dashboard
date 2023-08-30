export type Team = {
    id: number
    name: string,
}

export type MatchItem = {
    endsAt: string,
    id: number,
    isRunning: boolean,
    location: string,
    name: string,
    sportName: string,
    teams:Team[],
}

export interface MatchState{
    matches:MatchItem[];
    isLoading:boolean;
    isError: boolean;
    errorMessage: string;
}

export const initialState: MatchState = {
    matches: [],
    isLoading: false,
    isError: false,
    errorMessage: "",
  };

export type MatchesActions =
| { type: "FETCH_MATCHES_REQUEST" }
| { type: "FETCH_MATCHES_SUCCESS"; payload: MatchItem[] }
| { type: "FETCH_MATCHES_FAILURE"; payload: string };


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
          matches: action.payload,
        };
      case "FETCH_MATCHES_FAILURE":
        return {
          ...state,
          isLoading: false,
          isError: true,
          errorMessage: action.payload,
        };
      default:
        return state;
    }
  };
  