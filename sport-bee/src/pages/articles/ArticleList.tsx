import React, { useEffect, useState } from "react";
import Skeleton from "./Skeleton";
import NODATA from "../../assets/images/NODATa.webp";
import ArticleDetails from "./ArticleDetails";
import { fetchArticles } from "../../context/articles/actions";
import { fetchSports } from "../../context/data/action";
import { Article } from "../../context/articles/reducer";
import { Sport } from "../../context/data/reducer";
import { fetchPreferences } from "../../context/data/action";
import {
  useArticlesDispatch,
  useArticlesState,
} from "../../context/articles/context";
import { useSnackbar } from "notistack";

const ArticleList: React.FC = () => {
  const authToken = localStorage.getItem("authToken");
  const userData = localStorage.getItem("userData");
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (userData) {
      const user = JSON.parse(userData);
      enqueueSnackbar(`Welcome to SportsBee ${user.name}`, {
        variant: "success",
      });
    } else {
      enqueueSnackbar(`Welcome to SportsBee`, {
        variant: "success",
      });
    }
  }, []);

  const dispatchArticles = useArticlesDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const state: any = useArticlesState();

  const { articles, isLoading } = state;
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [sports, setSports] = useState<Sport[]>([]);
  const [selectedSport, setSelectedSport] = useState(1);
  const [userPreferences, setUserPreferences] = useState<{
    preferences: {
      sportPreferences: { name: string; id: number }[];
      teamPreferences: string[];
    };
  }>({
    preferences: {
      sportPreferences: [], //initial values
      teamPreferences: [],
    },
  });

  const fetchData = async () => {
    const sportsData = await fetchSports();
    setSports(sportsData);
    if (authToken) {
      const preferecnces = await fetchPreferences();
      setUserPreferences(preferecnces);
      fetchUserPreferences(preferecnces);
    }
  };

  const fetchUserPreferences = async (preferences: {
    preferences: {
      sportPreferences: { name: string; id: number }[];
      teamPreferences: string[];
    };
  }) => {
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

    setUserPreferences(preferences || {});
  };

  const handleSelectSport = (sportId: number) => {
    setSelectedSport(sportId);
  };

  const filterArticles = async (sportId: number, articles: Article[]) => {
    const filteredArticles = articles.filter(
      (article) => article.sport.id === sportId
    );
    setFilteredArticles(filteredArticles);
  };

  // Function to fetch articles based on user preferences
  const fetchArticlesByUserPreferences = async (
    preferecnces: {
      preferences: {
        sportPreferences: { name: string; id: number }[];
        teamPreferences: string[];
      };
    },
    articles: Article[]
  ) => {
    const sportIds = preferecnces.preferences.sportPreferences.map(
      (pref: { id: number }) => pref.id
    );
    const filteredArticles = articles.filter((article) =>
      sportIds.includes(article.sport.id)
    );
    setFilteredArticles(filteredArticles);
  };

  const handleYourNewsButtonClick = () => {
    fetchArticlesByUserPreferences(userPreferences, articles);
  };

  const shouldDisplaySport = (sportName: string): boolean => {
    if (authToken) {
      if (userPreferences.preferences.sportPreferences) {
        if (userPreferences.preferences.sportPreferences.length === 0) {
          // If no sport preferences, display all sports
          return true;
        } else {
          // Check if the selected sportName is in the user's sportPreferences
          return userPreferences.preferences.sportPreferences.some(
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

  useEffect(() => {
    fetchArticles(dispatchArticles);
    fetchData();
  }, []);

  useEffect(() => {
    filterArticles(selectedSport, articles);
  }, [selectedSport, isLoading]);

  useEffect(() => {
    if (authToken) {
      fetchUserPreferences(userPreferences);
    }
  }, [authToken, userPreferences]);

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
        {isLoading ? (
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
            {filteredArticles.length === 0 ? (
              <div className="flex justify-center items-center h-11/12 w-11/12">
                <img
                  src={NODATA}
                  className="mix-blend-multiply"
                  alt="No data available"
                />
              </div>
            ) : (
              filteredArticles.map((article) => (
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
