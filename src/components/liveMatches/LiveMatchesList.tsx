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
  },[])
  if (state){
    const { matches, isLoading, isError, errorMessage } = state;
    
  
  console.log(matches);

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
            className="box-border min-w-[20vw] mx-4 border-2 border-black rounded-lg"
          >
            <LiveMatchItem match={matchItem} />
          </div>
        );
      })}
    </>
  );
}
}