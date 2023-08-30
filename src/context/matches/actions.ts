import { API_ENDPOINT } from "../../config/constants";
import { MatchItem } from "./reducer";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchMatches = async (dispatch:any ) => {
  try {
    dispatch({ type: "FETCH_MATCHES_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/matches`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    //   console.log("fetched successfully");
    const data = await response.json();
    const matches: MatchItem[] = data.matches;

    dispatch({
      type: "FETCH_MATCHES_SUCCESS",
      payload: matches.filter((item: MatchItem) => item.isRunning),
    });
  } catch (error) {
    console.error("", error);
    dispatch({ type: "FETCH_MATCHES_FAILURE" });
  }
};
