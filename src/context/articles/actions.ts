import { API_ENDPOINT } from "../../config/constants";
import { ArticleItem } from "./reducer";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchArticles = async (dispatch:any ) => {
  try {
    dispatch({ type: "FETCH_ARTICLES_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/articles`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    //   console.log("fetched successfully");
    const data = await response.json();
    const articles: ArticleItem[] = data;

    dispatch({
      type: "FETCH_ARTICLES_SUCCESS",
      payload: articles,
    });
  } catch (error) {
    console.error("", error);
    dispatch({ type: "FETCH_ARTICLES_FAILURE" });
  }
};
