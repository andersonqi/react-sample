import * as types from "./types";

const INITIAL_STATE = {
  statistics: {},
  loading: false,
  error: false,
  errorMessage: "",
};

const reducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case types.STATISTICS_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case types.STATISTICS_LOAD:
      return {
        ...state,
        statistics: action.payload,
        error: false,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
