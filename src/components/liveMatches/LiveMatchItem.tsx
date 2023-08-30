import React from "react";
import { MatchItem } from "../../context/matches/reducer";

type Props = {
  match: MatchItem;
};

export default function LiveMatchItem(props: Props) {
  const match = props.match;
  return (
    <div className="border">
      <h2>{match.sportName}</h2>
      <h2>{match.name}</h2>
      {/* <h2>{ match.location }</h2>
        <h2>{ match.teams[0].name }</h2>
        <h2>{ match.teams[1].name }</h2> */}
    </div>
  );
}
