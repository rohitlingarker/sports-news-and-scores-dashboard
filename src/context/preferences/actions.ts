import { API_ENDPOINT } from "../../config/constants";
import { PreferencesDispatch } from "./context";
import { PreferenceState } from "./types";

export async function getPreferences(dispatch: PreferencesDispatch) {
  try {
    //fetch userdata from local storage
    const authToken = localStorage.getItem("authToken");
    if (!authToken || !localStorage.getItem("userData")) return;

    const response = await fetch(`${API_ENDPOINT}/user`, {
      method: "GET",
      headers: {
        Authorization: `${authToken}`,
      },
    });

    const parsedUserData = await response.json();
    if (!parsedUserData.preferences.preferredSports) {
      // console.log("fresh");

      parsedUserData.preferences = {
        preferredSports: [],
        preferredTeams: [],
      };
    }
    // console.log(parsedUserData);
    const userData = JSON.stringify(parsedUserData);
    localStorage.setItem("userData", userData);

    dispatch({
      type: "UPDATE_PREFERENCES",
      payload: parsedUserData.preferences,
    });
  } catch (error) {
    console.log("Error", error);
  }
}

export async function setPreferences(
  preferences: PreferenceState
): Promise<void> {
  try {
    console.log("Setting preferences:", preferences);

    const userData = localStorage.getItem("userData");
    if (!userData) {
      throw new Error("No user data or preferences");
    }

    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
      method: "PATCH",
      headers: {
        Authorization: authToken,
        "Content-Type": "application/json", // Set content type explicitly.
      },
      body: JSON.stringify({ preferences }),
    });

    if (!response.ok) {
      const errorMessage = `Failed to update preferences. Status: ${response.status}`;
      throw new Error(errorMessage);
    }

    const responseData = await response.json();
    console.log("Preferences updated successfully:", responseData);
  } catch (err) {
    console.error("Error while setting preferences:", err);
    // Optionally rethrow the error if necessary.
    // throw err;
  }
}

export function emptyPreferences(dispatch: PreferencesDispatch) {
  const defaultPrefs: PreferenceState = {
    preferredSports: [],
    preferredTeams: [],
  };

  dispatch({ type: "UPDATE_PREFERENCES", payload: defaultPrefs });
}
