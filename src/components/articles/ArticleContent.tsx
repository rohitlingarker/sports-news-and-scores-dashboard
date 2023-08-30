

import { useEffect, useState } from 'react'
import { API_ENDPOINT } from '../../config/constants';

export default function ArticleContent(props: { id: number; }) {
    const [articleContent, setArticleContent] = useState("");
    const fetchArticleDetails = async (articleId:number) => {
        try {
            setArticleContent("Loading...")
          const response = await fetch(`${API_ENDPOINT}/articles/${articleId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
          //   console.log("fetched successfully");
          const data = await response.json();
          setArticleContent(data.content)

      
          
        } catch (error) {
          console.error("content fetch error", error);
          
        }
      };
    
    useEffect(()=>{
        fetchArticleDetails(props.id)
    },[props.id])
      
  return (
    <>
        {articleContent}
    </>
  )
}
