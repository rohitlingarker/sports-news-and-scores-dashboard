import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { MatchesProvider } from "./context/matches/context";
import { ArticlesProvider } from "./context/articles/context";
import { PreferencesProvider } from "./context/preferences/context";
import { SportsProvider } from "./context/sports/context";
import { TeamsProvider } from "./context/teams/context";

function App() {
  return (
    <>
      <PreferencesProvider>
        <ArticlesProvider>
          <MatchesProvider>
            <SportsProvider>
              <TeamsProvider>
                <RouterProvider router={router} />
              </TeamsProvider>
            </SportsProvider>
          </MatchesProvider>
        </ArticlesProvider>
      </PreferencesProvider>
    </>
  );
}

export default App;
