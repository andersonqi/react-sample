import * as types from "./types";

const INITIAL_STATE = {
  plans: [],
  currentPlan: {},
  loading: false,
  error: false,
  errorMessage: "",
};

const reducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case types.PLANS_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case types.PLANS_CREATE:
      return {
        ...state,
        plans: [...state.plans, action.payload],
        error: false,
        loading: false,
      };
    case types.PLANS_LOAD:
      return {
        ...state,
        plans: action.payload,
        error: false,
        loading: false,
      };
    case types.PLAN_LOAD:
      return {
        ...state,
        currentPlan: action.payload,
        error: false,
        loading: false,
      };
    case types.PLANS_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
