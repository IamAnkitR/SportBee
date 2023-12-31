import { API_ENDPOINT } from "../../config/constants";
import { Match } from "./reducer";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchMatches = async (dispatch: any) => {
  const token = localStorage.getItem("authToken") ?? "";

  try {
    const response = await fetch(`${API_ENDPOINT}/matches`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    data.matches.sort((a: Match, b: Match) =>
      a.isRunning === b.isRunning ? 0 : a.isRunning ? -1 : 1
    );

    dispatch({ type: "FETCH_MATCHES_SUCCESS", payload: data.matches });
  } catch (error) {
    console.log("Error fetching articles:", error);
    dispatch({ type: "FETCH_MATCHES_FAILURE" });
  }
};
