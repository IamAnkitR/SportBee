export interface Article {
  sport: {
    id: number;
    name: string;
  };
  id: number;
  title: string;
  thumbnail: string;
  summary: string;
  date: string;
  teams: { name: string }[];
}

export interface ArticlesState {
  articles: Article[];
  isLoading: boolean;
}

export const initialState: ArticlesState = {
  articles: [],
  isLoading: true,
};

export type ArticlesActions =
  | { type: "FETCH_ARTICLES_REQUEST" }
  | { type: "FETCH_ARTICLES_SUCCESS"; payload: Article[] }
  | { type: "FETCH_ARTICLES_FAILURE"; payload: string };

export const reducer = (
  state: ArticlesState = initialState,
  action: ArticlesActions
): ArticlesState => {
  switch (action.type) {
    case "FETCH_ARTICLES_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_ARTICLES_SUCCESS":
      return {
        ...state,
        isLoading: false,
        articles: action.payload || [],
      };
    case "FETCH_ARTICLES_FAILURE":
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
