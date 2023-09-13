import { SportName } from "../preferences/types"

export type Team = {
  id: number
  name: string,
  plays:SportName
}

export type TeamState = Team[]

export const initialState:TeamState = []

export type TeamsActions = 
|{type:"FETCH_TEAM_SUCCESS",payload:TeamState}


export const reducer = (
    state: Team[] = initialState,
    action:TeamsActions
  ):TeamState => {
    switch (action.type) {
      case "FETCH_TEAM_SUCCESS":
        return action.payload
      
      default:
        return state;
    }
  };
  