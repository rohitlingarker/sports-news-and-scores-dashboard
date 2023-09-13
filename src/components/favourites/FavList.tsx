import React, { useEffect, useState } from "react";
import { useArticleState } from "../../context/articles/context";
import FavItem from "./FavItem";
import { useSportState } from "../../context/sports/context";
import { ArticleItem } from "../../context/articles/reducer";
import { Sport } from "../../context/sports/reducer";
import { useTeamState } from "../../context/teams/context";
import { Team } from "../../context/teams/reducer";

export default function FavList() {
  const articleState = useArticleState();
  const sportState = useSportState();
  const teamState = useTeamState();
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [selectedSport, setSelectedSport] = useState<Sport | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  useEffect(() => {
    if (articleState) {
      setArticles(articleState.originalArticleList);
    }
    
  }, [articleState]);

  // Filter articles based on the selected sport and team
  const filteredArticles = articles.filter((articleItem) => {
    if (selectedSport && selectedTeam) {
      return (
        articleItem.sport.id === selectedSport.id &&
        articleItem.teams.some((team) => team.id === selectedTeam.id)
      );
    } else if (selectedSport) {
      return articleItem.sport.id === selectedSport.id;
    } else {
      return true; // No sport or team selected, show all articles
    }
  });

  // Function to handle sport selection change
  const handleSportChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sportId = parseInt(e.target.value, 10);
    const selectedSport = sportState
      ? sportState.find((sport) => sport.id === sportId)
      : null;
    setSelectedSport(selectedSport || null);
    // Clear the selected team when the sport changes
    setSelectedTeam(null);
  };

  // Function to handle team selection change
  const handleTeamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const teamId = parseInt(e.target.value, 10);
    const selectedTeam = teamState
      ? teamState.find((team) => team.id === teamId)
      : null;
    setSelectedTeam(selectedTeam || null);
  };

  // Get a list of unique teams for the selected sport
  const teamsForSelectedSport = selectedSport
    ? teamState?.filter((team) => team.plays === selectedSport.name) || []
    : [];
  console.log(teamsForSelectedSport, teamState, "teamsForSelectedSport");

  return (
    <>
      <div className="my-4">
        {/* <label htmlFor="sportFilter" className="block ml-2 text-gray-700">Select a Sport:</label> */}
        <select
          id="sportFilter"
          className="block w-full px-4 py-2 mt-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          onChange={handleSportChange}
          value={selectedSport ? selectedSport.id.toString() : ""}
        >
          <option value="">Select Sport</option>
          {sportState &&
            sportState.map((sport) => (
              <option key={sport.id} value={sport.id.toString()}>
                {sport.name}
              </option>
            ))}
        </select>
      </div>

      {selectedSport && (
        <div className="my-4">
          {/* <label htmlFor="teamFilter" className="block ml-2 text-gray-700">Select a Team:</label> */}
          <select
            id="teamFilter"
            className="block w-full px-4 py-2 mt-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            onChange={handleTeamChange}
            value={selectedTeam ? selectedTeam.id.toString() : ""}
          >
            <option value="">Select Team</option>
            {teamsForSelectedSport &&
              teamsForSelectedSport.map((team) => (
                <option key={team.id} value={team.id.toString()}>
                  {team.name}
                </option>
              ))}
          </select>
        </div>
      )}

      {filteredArticles.map((articleItem: ArticleItem) => (
        <div key={articleItem.id} className="">
          <FavItem article={articleItem} />
        </div>
      ))}
    </>
  );
}
