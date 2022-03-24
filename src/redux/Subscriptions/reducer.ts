import * as types from "./types";

const INITIAL_STATE = {
  subscriptions: [],
  currentSubscription: {},
  loading: false,
  error: false,
};

const reducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case types.SUBSCRIPTIONS_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case types.SUBSCRIPTIONS_LOAD:
      return {
        ...state,
        subscriptions: action.payload,
        error: false,
        loading: false,
      };
    case types.SUBSCRIPTION_LOAD:
      return {
        ...state,
        currentSubscription: action.payload,
        error: false,
        loading: false,
      };
    case types.SUBSCRIPTIONS_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default reducer;
