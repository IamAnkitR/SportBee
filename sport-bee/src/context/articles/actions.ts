import { API_ENDPOINT } from "../../config/constants";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchArticles = async (dispatch: any) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/articles`);
    const data = await response.json();
    dispatch({ type: "FETCH_ARTICLES_SUCCESS", payload: data });
  } catch (error) {
    console.log("Error fetching articles", error);
  }
};
