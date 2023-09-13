import {
  usePreferenceState,
  usePreferencesDispatch,
} from "../../context/preferences/context";
import { SportName } from "../../context/preferences/types";
import { useSportState } from "../../context/sports/context";
import { Sport } from "../../context/sports/reducer";

export default function Sports() {
  const preferenceState = usePreferenceState();
  const preferencesDispatch = usePreferencesDispatch();
  const sportState = useSportState();

  if (!preferenceState || !preferencesDispatch) {
    return <>loading......</>;
  }

  const { preferredSports } = preferenceState;

  const toggleSport = (sportName: SportName) => {
    preferencesDispatch({
      type: "TOGGLE_SPORT", // Replace with the actual action type for toggling sports
      payload: sportName,
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelect = (event: any) => {
    const element = event.target;
    element.classList.toggle("active");
    const sportName = element.id;
    toggleSport(sportName);
  };

  return (
    <>
      <h3 className="font-semibold">Sports</h3>
      <div className="flex flex-wrap">
        {sportState &&
          sportState.map((sport: Sport) => {
            return (
              <div
                onClick={handleSelect}
                id={`${sport.name}`}
                className={`${
                  preferredSports.includes(sport.name) ? "active" : ""
                } border p-1 m-1 rounded cursor-pointer`}
                key={sport.id}
              >
                {sport.name}
              </div>
            );
          })}
      </div>
    </>
  );
}
