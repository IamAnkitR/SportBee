import React from "react";
import { useReducer, useEffect } from "react";
import { API_ENDPOINT } from "../../config/constants";
// import { Link } from "react-router-dom";

interface Match {
  id: number;
  name: string;
  sportName: string;
  isRunning: boolean;
  summary: string;
  endsAt: string;
  teams: [];
}

interface State {
  matches: Match[];
  isLoading: boolean;
}

interface Action {
  type: string;
  payload?: any;
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "API_CALL_START":
      return {
        ...state,
        isLoading: true,
      };
    case "API_CALL_END":
      return {
        ...state,
        isLoading: false,
        matches: action.payload,
      };
    case "API_CALL_ERROR":
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};

const MatchList: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, {
    matches: [],
    isLoading: true,
  });
  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
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
      dispatch({ type: "API_CALL_END", payload: data.matches });
    } catch (error) {
      console.log("Error fetching articles:", error);
      dispatch({ type: "API_CALL_ERROR" });
    }
  };
  return (
    <>
      <div className="flex pt-4 border-b-2 border-gray-400 pb-6 bg-gray-300 pl-6">
        {state.matches.map(
          (match) =>
            match.isRunning && (
              <div
                key={match.id}
                className="m-2 p-2 pt-4 pb-4 w-80 border-2 border-black rounded-lg"
              >
                <div>
                  <h2 className="text-lg font-semibold">{match.sportName}</h2>
                </div>
                <div key={match.endsAt}>
                  <h1 className="font-bold">{match.name.split("at")[0]}</h1>
                  <h1>{match.endsAt.slice(0, 10)}</h1>
                </div>
              </div>
            )
        )}
      </div>
    </>
  );
};

export default MatchList;
