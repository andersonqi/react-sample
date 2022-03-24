import * as types from "./types";
import axios from "axios";
import config from "../../config/api";

export const getWorks = () => async (dispatch: any) => {
  try {
    dispatch({ type: types.WORKS_LOADING });
    const response = await axios.get(`${config.api_url}/works/all`);
    if (response.data.status === "ok") {
      dispatch({
        type: types.WORKS_LOAD,
        payload: response.data.works,
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

export const getWorksByDate =
  (from: string, to: string) => async (dispatch: any) => {
    try {
      dispatch({ type: types.WORKS_LOADING });
      const response = await axios.get(
        `${config.api_url}/works/byDate?from=${from}&to=${to}`
      );
      if (response.data.status === "ok") {
        dispatch({
          type: types.WORKS_LOAD,
          payload: response.data.works,
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

export const getWork = (id: number) => async (dispatch: any) => {
  try {
    dispatch({ type: types.WORKS_LOADING });
    const response = await axios.get(`${config.api_url}/works/${id}`);
    if (response.data.status === "ok") {
      dispatch({
        type: types.WORK_LOAD,
        payload: response.data.work,
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
