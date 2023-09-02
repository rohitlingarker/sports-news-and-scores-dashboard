import LiveMatchItem from "./LiveMatchItem";
import { MatchItem } from "../../context/matches/reducer";
import { useMatchState, useMatchesDispatch } from "../../context/matches/context";
import { useEffect } from "react";
import { fetchMatches } from "../../context/matches/actions";

export default function LiveMatchesList() {
  const state = useMatchState();
  const matchesDispatch = useMatchesDispatch();
  useEffect(()=>{
    fetchMatches(matchesDispatch);
  },[matchesDispatch])
  if (state){
    const { matches, isLoading, isError, errorMessage } = state;
    
  
  console.log("matches in livelist",matches);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }


  return (
    <>
      {matches.map((matchItem: MatchItem) => {
        return (
          <div
            key={matchItem.id}
            className={`${matchItem.isRunning?`bg-gray-800`:`bg-gray-700`} shadow-sm shadow-blue-600 rounded-md text-gray-100 mx-2 px-3 py-2 w-52 inline-block  hover:shadow-md hover:shadow-blue-300`}
          >
            <LiveMatchItem match={matchItem} />
          </div>
        );
      })}
    </>
  );
}
}