import { useEffect, useReducer } from "react";
import { Link, useParams } from "react-router-dom";
import { API_ENDPOINT } from "../../config/constants";

const initialState = {
  article: null,
  isLoading: true,
};

const reducer = (state, action) => {
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
        article: action.payload,
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

const Content = () => {
  const { id } = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchContent();
  }, [id]);

  const fetchContent = async () => {
    const token = localStorage.getItem("authToken") || "";

    try {
      dispatch({ type: "API_CALL_START" });
      const response = await fetch(`${API_ENDPOINT}/articles/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      dispatch({ type: "API_CALL_END", payload: data });
    } catch (error) {
      console.log("Error fetching article:", error);
      dispatch({ type: "API_CALL_ERROR" });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {state.isLoading ? (
        <div>Loading article content...</div>
      ) : (
        <div className="max-w-3xl mx-auto">
          <Link
            to="/"
            className="text-blue-600
              bg-red-400 p-1 rounded border-black border-2 cursor-pointer"
          >
            Home
          </Link>
          <div className="flex justify-center">
            {state.article.sport.name && (
              <p className="mt-2 text-lg leading-6 text-gray-500 font-semibold">
                {state.article.sport.name} | {state.article.date.slice(0, 10)}
              </p>
            )}
          </div>
          {state.article.teams && state.article.teams.length === 2 && (
            <p className="mt-2 leading-6 text-gray-500 text-center text-xl">
              {state.article.teams[0].name} vs {state.article.teams[1].name}
            </p>
          )}
          <div className="text-center">
            <h1 className="text-3xl leading-8 font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
              {state.article.title}
            </h1>
          </div>
          <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
            <img
              className="h-90 w-4/12 static rounded-lg shadow-2xl mx-auto"
              src={state.article.thumbnail}
              alt="Sport"
            />
            <p>{state.article.summary}</p>
            <div dangerouslySetInnerHTML={{ __html: state.article.content }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Content;
