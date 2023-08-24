import { API_ENDPOINT } from "../../config/constants";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Content = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetchContent();
  }, [id]);

  const fetchContent = async () => {
    const token = localStorage.getItem("authToken") ?? "";

    try {
      const response = await fetch(`${API_ENDPOINT}/articles/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      setArticle(data);
    } catch (error) {
      console.log("Error fetching articles:", error);
    }
  };
  return (
    <div className="bg-gray-600 h-screen">
      {article ? (
        <div className="w-100">
          <div className="font-bold flex text-xl justify-center">
            <div className="mt-4">{article.title}</div>
          </div>
          <div className="mt-4 font-semibold text-lg flex justify-center">
            {article.sport.name}
          </div>
          <div className="m-auto p-2 text-xl w-6/12 mt-4 text-center">
            <h1>{article.summary}</h1>
          </div>
          <div className="flex justify-center m-2">
            <img
              className="h-90 w-4/12 static rounded-lg shadow-2xl"
              src={article.thumbnail}
              alt="Sport Image"
            />
          </div>
          <div className="m-auto p-2 w-9/12 text-justify">
            {article.content}
          </div>
        </div>
      ) : (
        <div>Loading article content...</div>
      )}
    </div>
  );
};

export default Content;
