import { useReducer, useEffect } from "react";
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
}

interface State {
  articles: Article[];
  isLoading: boolean;
}

interface Action {
  type: string;
  payload?: any;
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
        articles: action.payload,
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

const ArticleList: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, {
    articles: [],
    isLoading: true,
  });

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    const token = localStorage.getItem("authToken") ?? "";

    try {
      const response = await fetch(`${API_ENDPOINT}/articles`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      dispatch({ type: "API_CALL_END", payload: data });
    } catch (error) {
      console.log("Error fetching articles:", error);
      dispatch({ type: "API_CALL_ERROR" });
    }
  };
  return (
    <div>
      {state.isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid gap-4 grid-cols-4 mt-5">
          {state.articles.map((article) => (
            <div
              key={article.id}
              className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
                {article.sport.id}
                {article.sport.name}
              </h5>
              <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
                {article.title}
              </h5>

              <div
                key={article.thumbnail}
                className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <img src={article.thumbnail} alt="" />
                <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
                  {article.summary}
                </h5>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticleList;
