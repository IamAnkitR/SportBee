import React, { useEffect, useReducer } from "react";
import { Link, useParams } from "react-router-dom";
import { API_ENDPOINT } from "../../config/constants";

interface Team {
  name: string;
}

interface Content {
  id: number;
  sport: {
    name: string;
  };
  teams: Team[];
  date: string;
  title: string;
  thumbnail: string;
  summary: string;
  content: string;
}

interface ContentState {
  content: Content;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

type ContentActions =
  | { type: "FETCH_CONTENT_REQUEST" }
  | { type: "FETCH_CONTENT_SUCCESS"; payload: Content }
  | { type: "FETCH_CONTENT_FAILURE"; payload: string };

const initialState: ContentState = {
  content: {
    id: 0,
    sport: { name: "" },
    teams: [],
    date: "",
    title: "",
    thumbnail: "",
    summary: "",
    content: "",
  },
  isLoading: true,
  isError: false,
  errorMessage: "",
};

const reducer = (state: ContentState, action: ContentActions): ContentState => {
  switch (action.type) {
    case "FETCH_CONTENT_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_CONTENT_SUCCESS":
      return {
        ...state,
        isLoading: false,
        content: action.payload,
      };
    case "FETCH_CONTENT_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
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
  }, []);

  const fetchContent = async () => {
    const token = localStorage.getItem("authToken") || "";

    try {
      dispatch({ type: "FETCH_CONTENT_REQUEST" });
      const response = await fetch(`${API_ENDPOINT}/articles/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      dispatch({ type: "FETCH_CONTENT_SUCCESS", payload: data });
    } catch (error) {
      console.log("Error fetching content:", error);
      dispatch({
        type: "FETCH_CONTENT_FAILURE",
        payload: "Unable to fetch Content",
      });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {state.isLoading ? (
        <div>Loading Article Content...</div>
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
            {state.content.sport.name && (
              <p className="mt-2 text-lg leading-6 text-gray-500 font-semibold">
                {state.content.sport.name} | {state.content.date.slice(0, 10)}
              </p>
            )}
          </div>
          {state.content.teams && state.content.teams.length === 2 && (
            <p className="mt-2 leading-6 text-gray-500 text-center text-xl">
              {state.content.teams[0].name} vs {state.content.teams[1].name}
            </p>
          )}
          <div className="text-center">
            <h1 className="text-3xl leading-8 font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
              {state.content.title}
            </h1>
          </div>
          <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
            <img
              className="h-90 w-4/12 static rounded-lg shadow-2xl mx-auto"
              src={state.content.thumbnail}
              alt="Sport"
            />
            <p>{state.content.summary}</p>
            <div dangerouslySetInnerHTML={{ __html: state.content.content }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Content;
