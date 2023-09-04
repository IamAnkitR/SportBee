import React from "react";
import { useReducer, useEffect } from "react";
import { API_ENDPOINT } from "../../config/constants";
import "./MatchList.css";
import MatchDetails from "./MatchDetails";

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
      <div className="flex gap-4 w-full border-b-2 border-gray-400 pt-6 pb-6 bg-gray-300  overflow-x-scroll">
        {state.matches.map((match) => (
          <div
            key={match.id}
            className="ml-2 flex-shrink-0 h-40 w-64 p-2 border-2 border-black rounded-lg"
          >
            <div>
              <h2 className="text-lg font-semibold">{match.sportName}</h2>
            </div>
            <div key={match.endsAt}>
              <h1 className="font-bold">{match.name.split("at")[0]}</h1>
              <div className="flex mt-2 ">
                <div className="pt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 384 512"
                  >
                    <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                  </svg>
                </div>

                <h1 className="pl-2">{match.location}</h1>
              </div>
              <h1 className="flex justify-end">
                {renderMatchDetailsWithId(match.id)}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MatchList;
