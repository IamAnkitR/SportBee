import React from "react";
import { useReducer, useEffect } from "react";
import { API_ENDPOINT } from "../../config/constants";
import "./MatchList.css";
import MatchDetails from "./MatchDetails";
import Skeleton from "./Skeleton";

interface Match {
  id: number;
  name: string;
  sportName: string;
  isRunning: boolean;
  location: string;
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
  payload?: Match[];
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
        matches: action.payload || [],
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

  const renderMatchDetailsWithId = (id: number) => {
    return <MatchDetails id={id} />;
  };

  return (
    <>
      {state.isLoading ? (
        <div className="flex gap-3 w-screen">
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <div className="flex gap-4 w-full border-b-2 border-gray-400 pt-6 pb-6 bg-gray-300  overflow-x-scroll">
          {state.matches.map((match) => (
            <div
              key={match.id}
              className="ml-2 flex-shrink-0 h-40 w-64 p-2 border-2 border-black rounded-lg"
            >
              <div className="flex justify-between">
                <h2 className="text-lg font-semibold">{match.sportName}</h2>
                {match.isRunning ? (
                  <span>
                    <span className="animate-ping">🟢</span>Live
                  </span>
                ) : (
                  <span>
                    <span className="animate-pulse">🔴</span>Ended
                  </span>
                )}
              </div>

              <div key={match.endsAt}>
                <h1 className="font-bold pt-1">{match.name.split("at")[0]}</h1>
                <div>{renderMatchDetailsWithId(match.id)}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MatchList;
