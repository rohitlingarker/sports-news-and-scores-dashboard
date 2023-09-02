import { useEffect, useState } from "react";
import { fetchMatchDetails } from "../../context/matches/actions";
import { MatchItem } from "../../context/matches/reducer";

type Props = {
  match: MatchItem;
};


export default function LiveMatchItem(props: Props) {
  const [match,setMatch] = useState(props.match);


  const refresh = async ()=>{
    const matchData = await fetchMatchDetails({id:match.id});
    setMatch(matchData);
  }
  console.log("score"+match.score);

  useEffect(()=>{
    refresh();
  },[])

  
  return (
    <>
      {match.isRunning && <div onClick={refresh} className="float-right cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
      </div>}
      <h2 className="text-lg text-white font-semi-bold">{match.sportName}</h2>
      <p className="text-xs text-slate-400 mb-2" >{match.location}</p>
      <p className={`${match.isRunning && match.playingTeam === match.teams[1].id?`text-green-300`:""} text-base font-light flex justify-between`}>  { match.teams[1].name } <span>{match.score !== undefined?match.score[match.teams[1].name]:"" }</span></p>
      <p className={`${match.isRunning && match.playingTeam === match.teams[0].id?`text-green-300`:""} text-base font-light flex justify-between`}>  { match.teams[0].name } <span>{match.score !== undefined?match.score[match.teams[0].name]:"" }</span></p>
    </>
  );
}
