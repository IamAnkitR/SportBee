import React, { useReducer, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_ENDPOINT } from "../../config/constants";
import Skeleton from "./Skeleton";
import NODATA from "../../assets/images/NODATa.webp";

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

const sports = [
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

  const [selectedSport, setSelectedSport] = useState(1);

  const [userPreferences, setUserPreferences] = useState<{
    [key: string]: boolean;
  }>({});

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
      setUserPreferences(preferences.preferences);
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

  return (
    <>
      <div>
        <div>
          <div>
            <h1 className="text-2xl font-mono pt-2 ml-80">Trending News</h1>
          </div>
          <div className="flex justify-start ml-6 pt-2 mt-1">
            {authToken ? (
              <h1 className="p-2 m-2 font-semibold rounded-lg ml-6 border-2 border-yellow-300">
                Your News
              </h1>
            ) : (
              ""
            )}
            {sports.map((sport) => {
              const sportKey = sport.name.split(" ").join("").toLowerCase();
              const userPreference = userPreferences[sportKey];
              const isSignedOutOrEmptyPreference =
                !authToken || Object.keys(userPreferences).length === 0;

              if (userPreference || isSignedOutOrEmptyPreference) {
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
                // Return null for buttons that are not visible
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
                <div key={article.id}>
                  <div className="w-full flex justify-between bg-white m-2 p-2 h-48">
                    <div className="w-screen flex flex-col p-2">
                      <h1 className="font-bold text-xl">
                        {article.sport.name}
                      </h1>
                      <h1 className="font-semibold">{article.title}</h1>
                      <p>{article.summary.slice(0, 100) + "..."}</p>
                      <span className="flex justify-between mt-4">
                        <p className="flex justify-start">
                          {new Date(article.date).toLocaleString("en-CA", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                        <Link to={`/articles/${article.id}`}>
                          <button className="rounded-md bg-gray-700 px-4 py-2 m-2 text-sm font-medium text-white hover-bg-opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                            Read More
                          </button>
                        </Link>
                      </span>
                    </div>
                    <div className="w-8/12 h-48 flex justify-center p-2">
                      <img
                        className="h-40 w-10/12 static border-4 rounded-xl border-gray-300"
                        src={article.thumbnail}
                        alt=""
                      />
                    </div>
                  </div>
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
