import { useEffect, useState } from "react";
import {
  useArticleState,
  useArticlesDispatch,
} from "../../context/articles/context";
import { fetchArticles } from "../../context/articles/actions";
import { ArticleItem } from "../../context/articles/reducer";
import ArticleListItem from "./ArticleListItem";
import { useSportState } from "../../context/sports/context";
import "./index.css";

export default function ArticlesList() {
  const articleState = useArticleState();
  const articlesDispatch = useArticlesDispatch();
  const sportState = useSportState();
  const [articlesToRender, setArticlesToRender] = useState<ArticleItem[]>([]);
  const [selectedSport, setSelectedSport] = useState("all");

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articlesDispatch]);

  useEffect(() => {
    if (articleState) {
      switch (selectedSport) {
        case "all":
          setArticlesToRender(articleState.originalArticleList);
          break;
        case "yourNews":
          setArticlesToRender(articleState.filteredArticles);
          break;
        default:
          setArticlesToRender(
            articleState.originalArticleList.filter((item) => {
              return item?.sport.name === selectedSport;
            })
          );
      }
    }
  }, [selectedSport, articleState]);

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
        <div className="flex overflow-auto gap-4 whitespace-nowrap text-sm ">
          {
            <div
              className={`${selectedSport === "yourNews" ? "selected" : ""} cursor-pointer p-2`}
              onClick={() => {
                setSelectedSport("yourNews");
              }}
            >
              Your News
            </div>
          }
          <div
            className={`${selectedSport === "all" ? "selected" : ""} cursor-pointer p-2`}
            onClick={() => {
              setSelectedSport("all");
            }}
          >
            All Sports
          </div>
          {sportState &&
            sportState.map((sport) => (
              <div
                className={`${
                  selectedSport === sport.name ? "selected" : ""
                } cursor-pointer p-2`}
                onClick={() => {
                  setSelectedSport(sport.name);
                }}
              >
                {sport.name}
              </div>
            ))}
        </div>
        <div>
          {articlesToRender.map((articleItem: ArticleItem) => (
            <div key={articleItem.id} className="">
              <ArticleListItem article={articleItem} />
            </div>
          ))}
        </div>
      </>
    );
  }
}
