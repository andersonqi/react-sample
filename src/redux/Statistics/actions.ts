import * as types from "./types";
import axios from "axios";
import config from "../../config/api";

export const getStatistics = () => async (dispatch: any) => {
  try {
    const response = await axios.get(`${config.api_url}/statistics/site`);
    if (response.data.status === "ok") {
      dispatch({
        type: types.STATISTICS_LOAD,
        payload: response.data.data,
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
