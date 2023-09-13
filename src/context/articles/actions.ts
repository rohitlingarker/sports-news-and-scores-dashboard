import { API_ENDPOINT } from "../../config/constants";
import { PreferenceState, TeamName } from "../preferences/types";
import { ArticlesDispatch } from "./context";
import { ArticleItem } from "./reducer";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchArticles = async (dispatch: any) => {
  try {
    dispatch({ type: "FETCH_ARTICLES_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/articles`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    //   console.log("fetched successfully");
    const data = await response.json();
    const articles: ArticleItem[] = data;
    const userData = localStorage.getItem("userData");

    if (userData) {
      const parsedUserData = await JSON.parse(userData);
      filterArticles(dispatch, articles, parsedUserData.preferences);
      dispatch({
        type: "UPDATE_ARTICLES",
        payload: articles,
      });
    } else {
      dispatch({
        type: "FETCH_ARTICLES_SUCCESS",
        payload: articles,
      });
    }
    return articles;
  } catch (error) {
    console.error("", error);
    dispatch({ type: "FETCH_ARTICLES_FAILURE" });
  }
};

export function filterArticles(
  dispatch: ArticlesDispatch,
  originalArticles: ArticleItem[],
  preferenceState: PreferenceState
): void {
  const { preferredSports, preferredTeams } = preferenceState;

  if (preferredSports.length == 0 && preferredTeams.length == 0) {
    dispatch({
      type: "FILTER_ARTICLES",
      payload: originalArticles,
    });
    return;
  }

  // Filter articles based on preferred sports and teams.
  const filteredArticles = originalArticles.filter((article) => {
    const isSportMatch = preferredSports.includes(article.sport.name);
    const isTeamMatch = preferredTeams.some((teamName: TeamName) =>
      article.teams.some((team) => team.name === teamName)
    );

    return isSportMatch || isTeamMatch;
  });

  // Sort the filtered articles by date (you can use a custom sorting function).
  filteredArticles.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();

    // Sort in descending order (newest first).
    return dateB - dateA;
  });

  // Dispatch the filtered articles.
  // console.log("filteredArticles",filteredArticles);

  dispatch({
    type: "FILTER_ARTICLES",
    payload: filteredArticles,
  });
}
