import { useEffect } from "react";
import { useArticleState, useArticlesDispatch } from "../../context/articles/context";
import { fetchArticles } from "../../context/articles/actions";
import { ArticleItem } from "../../context/articles/reducer";
import ArticleListItem from "./ArticleListItem";

export default function ArticlesList() {
    const state = useArticleState();
    const articlesDispatch = useArticlesDispatch();
    useEffect(()=>{
      fetchArticles(articlesDispatch);
    },[])
    if (state){
      const { articles, isLoading, isError, errorMessage } = state;
      
    
    console.log(articles);
  
    if (isLoading) {
      return <span>Loading...</span>;
    }
  
    if (isError) {
      return <span>{errorMessage}</span>;
    }
  
  
    return (
      <>
        {articles.map((articleItem: ArticleItem) => {
          return (
            <div
              key={articleItem.id}
              className=""
            >
              <ArticleListItem article={articleItem} />
            </div>
          );
        })}
      </>
    );
  }
  }