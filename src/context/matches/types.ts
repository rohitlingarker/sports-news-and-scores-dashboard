import { Team } from "../teams/reducer";


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
    filteredMatches:MatchItem[];
    originalMatches:MatchItem[];
    isLoading:boolean;
    isError: boolean;
    errorMessage: string;
}

export const initialState: MatchState = {
    filteredMatches: [],
    originalMatches : [],
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
| { type: "FILTER_MATCHES"; payload: MatchItem[] }
| { type: "UPDATE"; payload: MatchItem[] }




