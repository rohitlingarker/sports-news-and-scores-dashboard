export type Team = {
    id: number
    name: string,
}

export type MatchItem = {
    startsAt:string,
    endsAt: string,
    id: number,
    isRunning: boolean,
    location: string,
    name: string,
    sportName: string,
    teams:Team[],
    score:{
      [teamName: string]: string;
    },
    playingTeam:number,
    story:string
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
| { type: "FETCH_MATCHES_FAILURE"; payload: string }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
| { type: "FETCH_DETAILS_SUCCESS"; payload: any }
| { type: "UPDATE_ALL_MATCHES"; payload: MatchItem[] }




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
      case "FETCH_DETAILS_SUCCESS":{
          const { matchId, updatedMatchData } = action.payload;

          // Find the index of the match item to update
          const matchIndex = state.matches.findIndex((match) => match.id === matchId);
    
          if (matchIndex === -1) {
            // If the match item is not found, return the current state
            return state;
          }
    
          // Create a copy of the state to ensure immutability
          const newState = { ...state };
    
          // Update the specific match item in the copied state
          newState.matches[matchIndex] = {
            ...newState.matches[matchIndex],
            ...updatedMatchData,
          };
          console.log("newState",newState);
          
          // Return the updated state
          return newState;
      } 

      case "UPDATE_ALL_MATCHES":
        return {
          ...state,
          matches: action.payload,
        }
      
      default:
        return state;
    }
  };
  