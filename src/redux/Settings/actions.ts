import axios from "axios";
import * as types from "./types";
import config from "../../config/api";

export const getSettings = () => async (dispatch: any) => {
  try {
    let response = await axios.get(`${config.api_url}/settings/site`);
    if (response.data.status === "ok") {
      dispatch({
        type: types.GET_SETTING,
        payload: response.data.setting,
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

export const updateSettings =
  (id: number, data: any) => async (dispatch: any) => {
    try {
      let response = await axios.put(
        `${config.api_url}/settings/${id}/site`,
        data
      );
      if (response.data.status === "ok") {
        dispatch({
          type: types.UPDATE_SETTING,
          payload: response.data.setting,
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
