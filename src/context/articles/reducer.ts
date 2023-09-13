import { Sport } from "../sports/reducer";
import { Team } from "../teams/reducer";



export type ArticleItem = {
    id: number,
    title:string,
    thumbnail:string,
    sport:Sport,
    date:string,
    summary:string,
    teams:Team[],
}

export interface ArticleState{
    filteredArticles:ArticleItem[];
    originalArticleList:ArticleItem[];
    isLoading:boolean;
    isError: boolean;
    errorMessage: string;
}

export const initialState: ArticleState = {
    filteredArticles: [],
    originalArticleList:[],
    isLoading: false,
    isError: false,
    errorMessage: "",
  };

export type ArticlesActions =
| { type: "FETCH_ARTICLES_REQUEST" }
| { type: "FETCH_ARTICLES_SUCCESS"; payload: ArticleItem[] }
| { type: "FETCH_ARTICLES_FAILURE"; payload: string }
| { type: "FILTER_ARTICLES"; payload: ArticleItem[] }
| { type: "UPDATE_ARTICLES"; payload: ArticleItem[] }


export const reducer = (
    state: ArticleState = initialState,
    action: ArticlesActions
  ): ArticleState => {
    switch (action.type) {
      case "FETCH_ARTICLES_REQUEST":
        return {
          ...state,
          isLoading: true,
        };
      case "FETCH_ARTICLES_SUCCESS":
        return {
          ...state,
          isLoading: false,
          filteredArticles: action.payload,
          originalArticleList:action.payload,
        };
      case "FETCH_ARTICLES_FAILURE":
        return {
          ...state,
          isLoading: false,
          isError: true,
          errorMessage: action.payload,
        };
      case "FILTER_ARTICLES":
        return {
          ...state,
          filteredArticles: action.payload,
        };
      case "UPDATE_ARTICLES":
        return {
          ...state,
          isLoading:false,
          originalArticleList:action.payload
        }
      default:
        return state;
    }
  };
  