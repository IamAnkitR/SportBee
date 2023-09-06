import React, { useEffect, useReducer } from "react";
import { API_ENDPOINT } from "../../config/constants";

interface Article {
  sport: {
    id: number;
    name: string;
  };
  id: number;
  title: string;
  thumbnail: string;
  summary: string;
  date: string;
  teams: { name: string }[];
}

interface State {
  articles: Article[];
  isLoading: boolean;
  selectedSport: number;
  selectedTeam: string;
  sports: { id: number; name: string }[];
  teams: { id: number; name: string }[];
}

interface Action {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
}

const Favourites = () => {
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
          articles: action.payload || [],
        };
      case "API_CALL_ERROR":
        return {
          ...state,
          isLoading: false,
        };
      case "SELECT_SPORT":
        return {
          ...state,
          selectedSport: action.payload,
        };
      case "SELECT_TEAM":
        return {
          ...state,
          selectedTeam: action.payload,
        };
      case "SET_SPORTS":
        return {
          ...state,
          sports: action.payload,
        };
      case "SET_TEAMS":
        return {
          ...state,
          teams: action.payload,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    articles: [],
    isLoading: true,
    selectedSport: 1,
    selectedTeam: "",
    sports: [],
    teams: [],
  });

  // Fetch sports and teams when the component mounts
  useEffect(() => {
    fetchSports();
    fetchTeams();
  }, []);

  const fetchSports = async () => {
    const sportsData = [
      {
        id: 1,
        name: "Basketball",
      },
      {
        id: 2,
        name: "American Football",
      },
      {
        id: 3,
        name: "Rugby",
      },
      {
        id: 4,
        name: "Field Hockey",
      },
      {
        id: 5,
        name: "Table Tennis",
      },
      {
        id: 6,
        name: "Cricket",
      },
    ];
    dispatch({ type: "SET_SPORTS", payload: sportsData });
  };

  const fetchTeams = async () => {
    const teamsData = [
      {
        id: 1,
        name: "Thunderbolts",
        plays: "Basketball",
      },
      {
        id: 2,
        name: "Dragonslayers",
        plays: "Basketball",
      },
      {
        id: 3,
        name: "Phoenix Rising",
        plays: "Basketball",
      },
      {
        id: 4,
        name: "Avalanche",
        plays: "Basketball",
      },
      {
        id: 5,
        name: "Titans",
        plays: "American Football",
      },
      {
        id: 6,
        name: "Vortex Vipers",
        plays: "American Football",
      },
      {
        id: 7,
        name: "Spectral Shadows",
        plays: "American Football",
      },
      {
        id: 8,
        name: "Blitzkrieg",
        plays: "American Football",
      },
      {
        id: 9,
        name: "Fury United",
        plays: "Rugby",
      },
      {
        id: 10,
        name: "Lightning Strikes",
        plays: "Rugby",
      },
      {
        id: 11,
        name: "Serpents of Fire",
        plays: "Rugby",
      },
      {
        id: 12,
        name: "Galaxy Warriors",
        plays: "Rugby",
      },
      {
        id: 13,
        name: "Stormbreakers",
        plays: "Field Hockey",
      },
      {
        id: 14,
        name: "Enigma Enforcers",
        plays: "Field Hockey",
      },
      {
        id: 15,
        name: "Blaze Squadron",
        plays: "Field Hockey",
      },
      {
        id: 16,
        name: "Phantom Phantoms",
        plays: "Field Hockey",
      },
      {
        id: 17,
        name: "Celestial Chargers",
        plays: "Table Tennis",
      },
      {
        id: 18,
        name: "Rebel Renegades",
        plays: "Table Tennis",
      },
      {
        id: 19,
        name: "Inferno Ignitors",
        plays: "Table Tennis",
      },
      {
        id: 20,
        name: "Stealth Strikers",
        plays: "Table Tennis",
      },
      {
        id: 21,
        name: "Nova Knights",
        plays: "Cricket",
      },
      {
        id: 22,
        name: "Crimson Crushers",
        plays: "Cricket",
      },
      {
        id: 23,
        name: "Rapid Raptors",
        plays: "Cricket",
      },
      {
        id: 24,
        name: "Shadow Assassins",
        plays: "Cricket",
      },
    ];
    dispatch({ type: "SET_TEAMS", payload: teamsData });
  };

  const filterArticles = () => {
    const filteredArticles = state.articles.filter(
      (article: Article) =>
        article.sport.name.toLowerCase() ===
        state.sports
          .find((s) => s.id === state.selectedSport)
          ?.name.toLowerCase()
    );
    dispatch({ type: "API_CALL_END", payload: filteredArticles });
  };

  useEffect(() => {
    filterArticles();
  }, [state.selectedSport]);

  useEffect(() => {
    const selectedSport = state.selectedSport;

    const fetchArticles = async () => {
      const token = localStorage.getItem("authToken") || "";

      try {
        dispatch({ type: "API_CALL_START" });
        const response = await fetch(`${API_ENDPOINT}/articles`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        const filteredArticles = data.filter(
          (article: Article) =>
            article.sport.id === selectedSport &&
            (state.selectedTeam === "" ||
              article.teams.some((team) =>
                team.name
                  .toLowerCase()
                  .includes(state.selectedTeam.toLowerCase())
              ))
        );
        console.log(filteredArticles);
        dispatch({ type: "API_CALL_END", payload: filteredArticles });
      } catch (error) {
        console.log("Error fetching articles:", error);
        dispatch({ type: "API_CALL_ERROR" });
      }
    };

    fetchArticles();
  }, [state.selectedSport, state.selectedTeam]);

  return (
    <div>
      <h1>Favorites</h1>
      <div>
        <div>
          <label htmlFor="sportDropdown">Select Sport:</label>
          <select
            id="sportDropdown"
            value={state.selectedSport.toString()}
            onChange={(e) => {
              dispatch({
                type: "SELECT_SPORT",
                payload: parseInt(e.target.value),
              });
            }}
          >
            {state.sports.map((sport) => (
              <option key={sport.id} value={sport.id}>
                {sport.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="teamDropdown">Select Team:</label>
          <select
            id="teamDropdown"
            value={state.selectedTeam}
            onChange={(e) =>
              dispatch({ type: "SELECT_TEAM", payload: e.target.value })
            }
          >
            <option value="">All Teams</option>
            {state.teams.map((team) => (
              <option key={team.id} value={team.name}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        {state.isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="bg-gray-400 overflow-y-auto h-screen">
            {state.articles.map((article) => (
              <div
                key={article.id}
                className="bg-gray-600 p-4 border-2 border-black"
              >
                <h2>{article.title}</h2>
                <p>{article.summary}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourites;
