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
      console.log(data);
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
    <div className="w-9/12 transform overflow-hidden bg-gray-900  text-white p-6 text-left shadow-xl transition-all rounded-lg m-auto">
      <div className="mx-auto p-4">
        <Link
          to="/"
          className="text-white bg-red-600 p-1 rounded-lg border-black border-2 cursor-pointer block text-center mb-2 w-20"
        >
          Home
        </Link>
        <div className="flex">
          <div className="w-1/2 pr-8 max-h-screen overflow-hidden relative mx-auto">
            <div className="h-8/12 w-full absolute inset-0 mt-6">
              <img
                className="my-32 h-1/2 w-full object-cover rounded-lg shadow-2xl align-middle"
                src={state.content.thumbnail}
                alt="Sport Image"
              />
            </div>
          </div>
          <div className="w-8/12 bg-gray-800 ml-4 p-6 rounded-lg h-screen overflow-y-auto">
            <div className="text-center">
              <h1 className="text-3xl leading-8 font-extrabold text-gray-100 sm:text-4xl sm:leading-10 mt-4">
                {state.content.title}
              </h1>
            </div>
            <div>
              {state.content.teams && state.content.teams.length === 2 && (
                <p className="mt-4 leading-6 text-red-500 text-center text-xl">
                  {state.content.teams[0].name} vs {state.content.teams[1].name}
                </p>
              )}
            </div>
            <div className="mt-6 prose prose-indigo prose-lg text-gray-100 text-center">
              <p className="text-xl">{state.content.summary}</p>
              <div className="flex justify-center mt-4">
                <div
                  className="w-9/12 text-start text-lg mb-2 "
                  dangerouslySetInnerHTML={{ __html: state.content.content }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
