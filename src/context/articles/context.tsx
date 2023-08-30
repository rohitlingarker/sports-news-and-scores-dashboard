import React, { createContext, useContext, useReducer } from "react";

import { reducer, initialState, ArticleState, ArticlesActions } from "./reducer";

const ArticleStateContext = createContext<ArticleState | undefined>(undefined);

    export type ArticlesDispatch = React.Dispatch<ArticlesActions>;

    const ArticlesDispatchContext = createContext<ArticlesDispatch | undefined>(undefined);
    export const ArticlesProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
      const [state, dispatch] = useReducer(reducer, initialState);
    
      // Next, I'll pass the `dispatch` object as value of this ArticlesDispatchContext.
    
      return (
        <ArticleStateContext.Provider value={state}>
          <ArticlesDispatchContext.Provider value={dispatch}>
            {children}
          </ArticlesDispatchContext.Provider>
        </ArticleStateContext.Provider>
      );
    };

    // eslint-disable-next-line react-refresh/only-export-components
    export const useArticleState = () => useContext(ArticleStateContext);
    // eslint-disable-next-line react-refresh/only-export-components
    export const useArticlesDispatch = () => useContext(ArticlesDispatchContext);