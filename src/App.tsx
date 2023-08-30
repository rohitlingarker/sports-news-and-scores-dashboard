import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { MatchesProvider } from "./context/matches/context";
import { ArticlesProvider } from "./context/articles/context";

function App() {
  return (
    <>
      <ArticlesProvider>
        <MatchesProvider>
          <RouterProvider router={router} />
        </MatchesProvider>
      </ArticlesProvider>
    </>
  );
}

export default App;
