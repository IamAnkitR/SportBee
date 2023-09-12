import { useEffect, useReducer, useState } from "react";
import { API_ENDPOINT } from "../../config/constants";
import NODATA from "../../assets/images/NODATa.webp";
import ArticleDetails from "../articles/ArticleDetails";

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
  teams: { id: number; name: string; plays: string }[];
  filteredTeams: { id: number; name: string; plays: string }[];
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
      case "SET_FILTERED_TEAMS":
        return {
          ...state,
          filteredTeams: action.payload,
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
    filteredTeams: [],
  });

  const [userPreferences, setUserPreferences] = useState({
    sportPreferences: [],
    teamPreferences: [],
  });

  // Fetch sports and teams when the component mounts
  useEffect(() => {
    fetchSports();
    fetchTeams();
  }, [state.selectedSport, state.selectedTeam]);

  useEffect(() => {
    fetchUserPreferences();
  }, []);

  const fetchUserPreferences = async () => {
    try {
      const token = localStorage.getItem("authToken") || "";
      const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      dispatch({
        type: "SELECT_SPORT",
        payload: data.preferences.sportPreferences[0]?.id || 1,
      });
      dispatch({
        type: "SELECT_TEAM",
        payload: data.preferences.teamPreferences[0]?.name || "",
      });
      setUserPreferences(data.preferences);
    } catch (error) {
      console.error("Error fetching user preferences:", error);
    }
  };

  const fetchSports = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/sports`);
      const data = await response.json();
      dispatch({ type: "SET_SPORTS", payload: data.sports });
    } catch (error) {
      console.error("Error fetching sports:", error);
    }
  };

  const fetchTeams = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/teams`);
      const data = await response.json();
      dispatch({ type: "SET_TEAMS", payload: data });
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  const filterArticles = () => {
    const selectedSportId = state.selectedSport;
    const filteredArticles = state.articles.filter(
      (article: Article) => article.sport.id === selectedSportId
    );
    dispatch({ type: "API_CALL_END", payload: filteredArticles });
  };

  // Filter teams by sport
  const filterTeamsBySport = () => {
    const selectedSport = state.selectedSport;
    const filteredTeams = state.teams.filter(
      (team) =>
        team.plays === state.sports.find((s) => s.id === selectedSport)?.name
    );
    dispatch({ type: "SET_FILTERED_TEAMS", payload: filteredTeams });
  };

  useEffect(() => {
    filterTeamsBySport();
  }, [state.selectedSport, state.sports]);

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
        dispatch({ type: "API_CALL_END", payload: filteredArticles });
      } catch (error) {
        console.log("Error fetching articles:", error);
        dispatch({ type: "API_CALL_ERROR" });
      }
    };

    fetchArticles();
  }, [state.selectedSport, state.selectedTeam]);

  const authToken = localStorage.getItem("authToken");
  const shouldDisplaySport = (sportName: string): boolean => {
    if (authToken) {
      // Check if user has sport preferences
      if (userPreferences.sportPreferences) {
        // Check if the sportName is in the user's sport preferences
        return (
          userPreferences.sportPreferences.length === 0 ||
          userPreferences.sportPreferences.some(
            (pref) => pref.name === sportName
          )
        );
      }
      // If no sport preferences, display all sports
      return true;
    }
    // If user is not signed in, display all sports
    return true;
  };

  const renderArticleDetailsWithId = (id: number) => {
    return <ArticleDetails id={id} />;
  };

  return (
    <div>
      <h1 className="text-2xl font-mono pt-2 text-center">Favourites</h1>
      <div className="flex">
        <div>
          <label htmlFor="sportDropdown" className="font-semibold text-xl">
            Select Sport:
          </label>
          <select
            id="sportDropdown"
            value={state.selectedSport.toString()}
            onChange={(e) => {
              dispatch({
                type: "SELECT_SPORT",
                payload: parseInt(e.target.value),
              });
              dispatch({ type: "SELECT_TEAM", payload: "" });
            }}
            className="h-10 bg-gray-300 rounded-xl ml-6 mt-2 border-2 border-black"
          >
            {state.sports.map(
              (sport) =>
                // Render the option only if it's in the user's sport preferences
                shouldDisplaySport(sport.name) && (
                  <option key={sport.id} value={sport.id}>
                    {sport.name}
                  </option>
                )
            )}
          </select>
        </div>
        <div>
          <label htmlFor="teamDropdown" className="font-semibold text-xl">
            Select Team:
          </label>
          <select
            id="teamDropdown"
            value={state.selectedTeam}
            onChange={(e) =>
              dispatch({ type: "SELECT_TEAM", payload: e.target.value })
            }
            className="h-10 bg-gray-300 rounded-xl ml-6 my-2 border-2 border-black"
          >
            <option value="">All Teams</option>
            {state.filteredTeams.map((team) => (
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
          <div>
            {state.articles.length === 0 ? (
              <div className="flex justify-center items-center h-11/12 w-11/12">
                <img
                  src={NODATA}
                  className="mix-blend-multiply"
                  alt="No data available"
                />
              </div>
            ) : (
              <div className="bg-inherit">
                {state.articles.map((article) => (
                  <div
                    key={article.id}
                    className="bg-gray-300 p-4 m-2 rounded-lg"
                  >
                    <div>{renderArticleDetailsWithId(article.id)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourites;
