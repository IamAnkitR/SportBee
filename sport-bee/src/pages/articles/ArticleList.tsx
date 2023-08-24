import { useReducer, useEffect } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { Link } from "react-router-dom";

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
  payload?: any;
}

interface ArticlesProps {
  articles: number;
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

const ArticleList: React.FC<ArticlesProps> = () => {
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
        <div className="flex flex-col">
          {state.articles.map((article) => (
            <div key={article.id}>
              <div className="w-8/12 flex justify-between bg-white m-2 p-2 h-48">
                <div
                  key={article.sport.id}
                  className="w-screen flex flex-col p-2"
                >
                  <h1 className="font-bold text-xl">{article.sport.name}</h1>
                  <div key={article.title}>
                    <h1 className="font-semibold">{article.title}</h1>
                  </div>
                  <div key={article.summary}>
                    <p>{article.summary.slice(0, 100) + "..."}</p>
                  </div>
                  <span className="flex justify-between mt-4">
                    <p className="flex justify-start">
                      {article.date.slice(0, 10)}
                    </p>

                    <Link to={`/articles/${article.id}`}>
                      <button
                        id="newTaskBtn"
                        className="rounded-md bg-blue-600 px-4 py-2 m-2 text-sm font-medium text-white hover:bg-opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                      >
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
  );
};

export default ArticleList;
