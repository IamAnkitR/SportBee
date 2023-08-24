import React, { useEffect, useState } from "react";
import Articles from "../articles";
import Matches from "../matches";
import AccountLayout from "../../layouts/account";
import { API_ENDPOINT } from "../../config/constants";

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

const Dashboard: React.FC = () => {
  const [selectedSport, setSelectedSport] = useState(sports[0].id);
  const [articles, setArticles] = useState(1);
  useEffect(() => {
    fetchArticles(selectedSport);
  }, [selectedSport]);

  const handleSelectSport = (sportId: number) => {
    setSelectedSport(sportId);
  };

  const fetchArticles = async (sportId: number) => {
    console.log(sportId);
    try {
      const response = await fetch(`${API_ENDPOINT}/articles`);
      const data = await response.json();
      console.log(data);
      data.forEach((article) => {
        const sportId = article.sport.id;
        if (article.sport.id === sportId) {
          setArticles(article.sport.id);
        }
      });
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  return (
    <div className=" static min-h-screen flex-row justify-center bg-gray-100">
      <AccountLayout />
      <Matches />

      <div>
        <div className="flex justify-start border-t-2 border-gray-600">
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
        <Articles />
      </div>
    </div>
  );
};

export default Dashboard;
