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
  const authToken = localStorage.getItem("authToken");
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

      const arr = preferences.preferences.sportPreferences.map(
        (pref: { id: number }) => pref.id
      );
      const smallestIndex = arr.reduce(
        (minIndex: number, current: number, currentIndex: number) => {
          return current < arr[minIndex] ? currentIndex : minIndex;
        },
        0
      );
      setSelectedSport(arr[smallestIndex]);

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

  // Function to fetch articles based on user preferences
  const fetchArticlesByUserPreferences = async () => {
    if (!authToken) {
      return;
    }

    const sportIds = userPreferences.sportPreferences.map(
      (pref) => sports.find((sport) => sport.name === pref.name)?.id
    );

    if (!sportIds || sportIds.length === 0) {
      return;
    }

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

      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }

      const data = await response.json();
      const filteredArticles = data.filter(
        (article: { sport: { id: number } }) =>
          sportIds.includes(article.sport.id)
      );
      dispatch({ type: "API_CALL_END", payload: filteredArticles });
    } catch (error) {
      console.log("Error fetching articles:", error);
      dispatch({ type: "API_CALL_ERROR" });
    }
  };

  const handleYourNewsButtonClick = () => {
    fetchArticlesByUserPreferences();
  };

  const shouldDisplaySport = (sportName: string): boolean => {
    if (authToken) {
      if (userPreferences.sportPreferences) {
        if (userPreferences.sportPreferences.length === 0) {
          // If no sport preferences, display all sports
          return true;
        } else {
          // Check if the selected sportName is in the user's sportPreferences
          return userPreferences.sportPreferences.some(
            (pref) => pref.name === sportName
          );
        }
      }
      // If user preferences exist but no sport preferences, display all sports
      return true;
    }
    // If the user is not signed in, display all sports
    return true;
  };

  const renderArticleDetailsWithId = (id: number) => {
    return <ArticleDetails id={id} />;
  };

  return (
    <>
      <div className="bg-white">
        <div>
          <div>
            <h1 className="text-2xl font-mono pt-2 ml-80">Trending News</h1>
          </div>
          <div className="flex justify-start ml-6 pt-2 mt-1">
            {authToken ? (
              <button
                onClick={handleYourNewsButtonClick}
                className="p-2 m-2 font-semibold rounded-lg ml-6 border-2 border-yellow-300"
              >
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
                        ? "active border-2 p-2 m-2 ml-6 border-gray-400 rounded-lg bg-[#96B6C5]"
                        : "p-2 m-2 bg-[#F1F6F9] rounded-lg ml-6"
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
      <div className="bg-white min-h-screen py-2 px-2">
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
                <div
                  key={article.id}
                  className="pb-2 bg-[#F1F6F9] my-3 rounded-lg "
                >
                  <div>
                    <img
                      src={article.thumbnail}
                      alt={article.title}
                      className="object-cover w-full max-h-60 rounded-lg"
                    />
                  </div>
                  <div className="px-2 py-2">
                    {renderArticleDetailsWithId(article.id)}
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
