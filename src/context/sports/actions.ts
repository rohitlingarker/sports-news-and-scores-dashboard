import { API_ENDPOINT } from "../../config/constants";
import { SportsDispatch } from "./context";

export async function fetchSports(dispatch: SportsDispatch) {
  try {
    const response = await fetch(`${API_ENDPOINT}/sports`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    const sports = data.sports;

    dispatch({
      type: "FETCH_SPORTS_SUCCESS",
      payload: sports,
    });
  } catch (error) {
    console.log("Error", error);
    return [];
  }
}
