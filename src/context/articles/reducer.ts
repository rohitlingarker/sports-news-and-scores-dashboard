import { Team } from "../matches/reducer";

export interface Sport{
    id:number,
    name: string
}

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
    articles:ArticleItem[];
    isLoading:boolean;
    isError: boolean;
    errorMessage: string;
}

export const initialState: ArticleState = {
    articles: [],
    isLoading: false,
    isError: false,
    errorMessage: "",
  };

export type ArticlesActions =
| { type: "FETCH_ARTICLES_REQUEST" }
| { type: "FETCH_ARTICLES_SUCCESS"; payload: ArticleItem[] }
| { type: "FETCH_ARTICLES_FAILURE"; payload: string };


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
          articles: action.payload,
        };
      case "FETCH_ARTICLES_FAILURE":
        return {
          ...state,
          isLoading: false,
          isError: true,
          errorMessage: action.payload,
        };
      default:
        return state;
    }
  };
  