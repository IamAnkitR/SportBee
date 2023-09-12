import React, { useReducer, useEffect, useState } from "react";
import { API_ENDPOINT } from "../../config/constants";
import Skeleton from "./Skeleton";
import NODATA from "../../assets/images/NODATa.webp";
import ArticleDetails from "./ArticleDetails";

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
}

interface State {
  articles: Article[];
  isLoading: boolean;
}

interface Action {
  type: string;
  payload?: Article[];
}

const sports: { id: number; name: string }[] = [
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
    default:
      return state;
  }
};

const ArticleList: React.FC = () => {
  const authToken = localStorage.getItem("authToken") || "";
  const [state, dispatch] = useReducer(reducer, {
    articles: [],
    isLoading: true,
  });
  const [userPreferences, setUserPreferences] = useState<{
    sportPreferences: { name: string }[];
    teamPreferences: string[];
  }>({
    sportPreferences: [], //initial values
    teamPreferences: [],
  });
  const [selectedSport, setSelectedSport] = useState(1);

  const fetchUserPreferences = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user preferences");
      }

      const preferences = await response.json();
      console.log(preferences);
      setUserPreferences(preferences.preferences || {});
    } catch (error) {
      console.error("Error fetching user preferences:", error);
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchUserPreferences();
    }
  }, [authToken]);

  useEffect(() => {
    fetchArticles(selectedSport);
  }, [selectedSport]);

  const handleSelectSport = (sportId: number) => {
    setSelectedSport(sportId);
  };

  const fetchArticles = async (sportId: number) => {
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
        (article: { sport: { id: number } }) => article.sport.id === sportId
      );
      dispatch({ type: "API_CALL_END", payload: filteredArticles });
    } catch (error) {
      console.log("Error fetching articles:", error);
      dispatch({ type: "API_CALL_ERROR" });
    }
  };

  const shouldDisplaySport = (sportName: string): boolean => {
    if (authToken) {
      if (userPreferences.sportPreferences) {
        // Check if the sportName is in the user's sport preferences
        return (
          userPreferences.sportPreferences?.length === 0 ||
          userPreferences.sportPreferences?.some(
            (pref) => pref.name === sportName
          )
        );
      }
      return true;
      // If no sport preferences, display all sports
    }
    // If user is not signed in, display all sports
    return true;
  };

  const renderArticleDetailsWithId = (id: number) => {
    return <ArticleDetails id={id} />;
  };

  return (
    <>
      <div>
        <div>
          <div>
            <h1 className="text-2xl font-mono pt-2 ml-80">Trending News</h1>
          </div>
          <div className="flex justify-start ml-6 pt-2 mt-1">
            {authToken ? (
              <button className="p-2 m-2 font-semibold rounded-lg ml-6 border-2 border-yellow-300">
                Your News
              </button>
            ) : (
              ""
            )}
            {sports.map((sport) => {
              const sportName = sport.name;
              const isSportSelected = shouldDisplaySport(sportName);

              if (!authToken || isSportSelected) {
                return (
                  <button
                    key={sport.id}
                    className={
                      selectedSport === sport.id
                        ? "active border-2 p-2 m-2 ml-6 border-gray-400 rounded-lg bg-gray-400"
                        : "p-2 m-2 bg-gray-300 rounded-lg ml-6"
                    }
                    onClick={() => handleSelectSport(sport.id)}
                  >
                    {sport.name}
                  </button>
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
      </div>
      <div className="bg-gray-100 min-h-screen py-2 px-4 sm:px-6 lg:px-8">
        {state.isLoading ? (
          <div>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        ) : (
          <div
            className="flex flex-col overflow-x-hidden"
            style={{ width: "1000px" }}
          >
            {state.articles.length === 0 ? (
              <div className="flex justify-center items-center h-11/12 w-11/12">
                <img
                  src={NODATA}
                  className="mix-blend-multiply"
                  alt="No data available"
                />
              </div>
            ) : (
              state.articles.map((article) => (
                <div key={article.id} className="pb-10">
                  <h1 className="font-bold text-2xl pb-2">
                    {article.sport.name}
                  </h1>
                  <div>{renderArticleDetailsWithId(article.id)}</div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ArticleList;
