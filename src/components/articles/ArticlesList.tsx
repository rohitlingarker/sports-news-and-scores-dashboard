import { useEffect } from "react";
import {
  useArticleState,
  useArticlesDispatch,
} from "../../context/articles/context";
import { fetchArticles } from "../../context/articles/actions";
import { ArticleItem } from "../../context/articles/reducer";
import ArticleListItem from "./ArticleListItem";

export default function ArticlesList() {
  const articleState = useArticleState();
  const articlesDispatch = useArticlesDispatch();

  // useEffect to fetch articles when the page is initially loaded
  useEffect(() => {
    async function fetchData() {
      try {
        fetchArticles(articlesDispatch);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    }

    if (articleState && !articleState.filteredArticles.length) {
      // Fetch only if articles are not already loaded
      fetchData();
      console.log(".................", articleState);
    }
  }, [articlesDispatch]);

  if (articleState) {
    const { filteredArticles, isLoading, isError, errorMessage } = articleState;
    // if (articlesDispatch && state && preferenceState)
    // filterArticles(articlesDispatch,state.originalArticleList,preferenceState);

    console.log("filteredArticles in component", filteredArticles);

    if (isLoading) {
      return <span>Loading...</span>;
    }

    if (isError) {
      return <span>{errorMessage}</span>;
    }

    return (
      <>
        {filteredArticles.map((articleItem: ArticleItem) => (
          <div key={articleItem.id} className="">
            <ArticleListItem article={articleItem} />
          </div>
        ))}
      </>
    );
  }
}
