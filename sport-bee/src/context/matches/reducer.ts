export interface Match {
  id: number;
  name: string;
  sportName: string;
  isRunning: boolean;
  location: string;
  summary: string;
  endsAt: string;
  teams: [];
}

export interface MatchesState {
  matches: Match[];
  isLoading: boolean;
}

export type MatchesActions =
  | { type: "FETCH_MATCHES_REQUEST" }
  | { type: "FETCH_MATCHES_SUCCESS"; payload: Match[] }
  | { type: "FETCH_MATCHES_FAILURE"; payload: string };

export const initialState: MatchesState = {
  matches: [],
  isLoading: true,
};

export const reducer = (
  state: MatchesState = initialState,
  action: MatchesActions
): MatchesState => {
  switch (action.type) {
    case "FETCH_MATCHES_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_MATCHES_SUCCESS":
      return {
        ...state,
        isLoading: false,
        matches: action.payload || [],
      };
    case "FETCH_MATCHES_FAILURE":
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};
