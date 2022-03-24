import * as types from "./types";
import axios from "axios";
import config from "../../config/api";

export const getSubscriptions = () => async (dispatch: any) => {
  try {
    const response = await axios.get(`${config.api_url}/subscriptions/all`);
    if (response.data.status === "ok") {
      dispatch({
        type: types.SUBSCRIPTIONS_LOAD,
        payload: response.data.subscriptions,
      });
      return {
        error: false,
      };
    }
  } catch (error) {
    return {
      error: true,
    };
  }
};

export const getSubscription = (id: number) => async (dispatch: any) => {
  try {
    const response = await axios.get(`${config.api_url}/subscriptions/${id}`);
    if (response.data.status === "ok") {
      dispatch({
        type: types.SUBSCRIPTION_LOAD,
        payload: response.data.subscription,
      });
      return {
        error: false,
      };
    }
  } catch (error) {
    return {
      error: true,
    };
  }
};
