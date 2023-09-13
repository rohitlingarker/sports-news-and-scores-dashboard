import {
  usePreferenceState,
  usePreferencesDispatch,
} from "../../context/preferences/context";
import { TeamName } from "../../context/preferences/types";
import { useTeamState } from "../../context/teams/context";
import { Team } from "../../context/teams/reducer";

export default function Teams() {
  const preferenceState = usePreferenceState();
  const preferencesDispatch = usePreferencesDispatch();
  const teamState = useTeamState();

  if (!preferenceState || !preferencesDispatch) {
    return <>loading......</>;
  }

  const { preferredTeams } = preferenceState;

  const toggleTeam = (teamName: TeamName) => {
    preferencesDispatch({
      type: "TOGGLE_TEAM", // Replace with the actual action type for toggling teams
      payload: teamName,
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelect = (event: any) => {
    const element = event.target;
    element.classList.toggle("active");
    const teamName = element.id;
    toggleTeam(teamName);
  };

  return (
    <>
      <h3 className="font-semibold">Teams</h3>
      <div className="flex flex-wrap">
        {teamState &&
          teamState.map((team: Team) => {
            return (
              <div
                onClick={handleSelect}
                id={`${team.name}`}
                className={`${
                  preferredTeams.includes(team.name) ? "active" : ""
                } border p-1 m-1 rounded cursor-pointer`}
                key={team.id}
              >
                {team.name}
              </div>
            );
          })}
      </div>
    </>
  );
}
