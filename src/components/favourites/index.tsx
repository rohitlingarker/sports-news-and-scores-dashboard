import { useEffect } from "react";
import { useSportsDispatch } from "../../context/sports/context";
import { useTeamsDispatch } from "../../context/teams/context";
import FavList from "./FavList";
import { fetchSports } from "../../context/sports/actions";
import { fetchTeams } from "../../context/teams/actions";

export default function Favourites() {
  const sportsDispatch = useSportsDispatch();
  const teamDispatch = useTeamsDispatch();

  useEffect(() => {
    if (teamDispatch) fetchTeams(teamDispatch);
    if (sportsDispatch) fetchSports(sportsDispatch);
  }, []);
  return (
    <div className=" col-span-3 bg-zinc-200 rounded px-2">
      <FavList />
    </div>
  );
}
