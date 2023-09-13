import { API_ENDPOINT } from "../../config/constants";
import { TeamsDispatch } from "./context";

export async function fetchTeams(dispatch: TeamsDispatch) {
  try {
    const response = await fetch(`${API_ENDPOINT}/teams`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const teams = await response.json();

    dispatch({
      type: "FETCH_TEAM_SUCCESS",
      payload: teams,
    });
  } catch (error) {
    console.log("Error", error);
    return [];
  }
}
