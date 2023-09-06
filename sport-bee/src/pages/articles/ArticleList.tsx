import React, { useReducer, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_ENDPOINT } from "../../config/constants";
import Skeleton from "./Skeleton";

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
  const [state, dispatch] = useReducer(reducer, {
    articles: [],
    isLoading: true,
  });

  const [selectedSport, setSelectedSport] = useState(1);

  useEffect(() => {
    fetchArticles(selectedSport);
  }, [selectedSport]);

  const handleSelectSport = (sportId: number) => {
    console.log(sportId);
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
            <h1 className=" text-2xl font-mono pt-2 ml-64">Trending News</h1>
          </div>
          <div className="flex justify-start ml-6 pt-2 mt-1">
            {sports.map((sport) => (
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
            ))}
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
            className="flex flex-col overflow-y-auto h-screen overflow-x-hidden"
            style={{ width: "1000px" }}
          >
            {state.articles.map((article) => (
              <div key={article.id}>
                <div className="w-full flex justify-between bg-white m-2 p-2 h-48">
                  <div className="w-screen flex flex-col p-2">
                    <h1 className="font-bold text-xl">{article.sport.name}</h1>
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
                        <button className="rounded-md bg-blue-600 px-4 py-2 m-2 text-sm font-medium text-white hover:bg-opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                          Read More...
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
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ArticleList;
