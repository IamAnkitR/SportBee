import { API_ENDPOINT } from "../../config/constants";

export const fetchSports = async () => {
  try {
    const response = await fetch(`${API_ENDPOINT}/sports`);
    const data = await response.json();
    return data.sports;
  } catch (error) {
    console.log("Error fetching sports:", error);
  }
};

export const fetchTeams = async () => {
  try {
    const response = await fetch(`${API_ENDPOINT}/teams`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching matches: ", error);
  }
};

export const fetchPreferences = async () => {
  const token = localStorage.getItem("authToken");
  try {
    const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch user preferences");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching preferences", error);
  }
};
