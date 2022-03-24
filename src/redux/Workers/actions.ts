import * as types from "./types";
import axios from "axios";
import config from "../../config/api";

export const createWorker = (data: any) => async (dispatch: any) => {
  try {
    const response = await axios.post(`${config.api_url}/workers/create`, data);
    if (response.data.status === "ok") {
      dispatch({
        type: types.WORKERS_CREATE,
        payload: response.data.worker,
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

export const getWorkers = () => async (dispatch: any) => {
  try {
    const response = await axios.get(`${config.api_url}/workers/all`);
    if (response.data.status === "ok") {
      dispatch({
        type: types.WORKERS_LOAD,
        payload: response.data.workers,
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

export const getWorker = (id: number) => async (dispatch: any) => {
  try {
    const response = await axios.get(`${config.api_url}/workers/${id}`);
    if (response.data.status === "ok") {
      dispatch({
        type: types.WORKER_LOAD,
        payload: response.data.worker,
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

export const updateWorker =
  (id: number, data: any) => async (dispatch: any) => {
    try {
      const response = await axios.put(`${config.api_url}/workers/${id}`, data);
      if (response.data.status === "ok") {
        dispatch({
          type: types.WORKER_LOAD,
          payload: response.data.worker,
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

export const sendWorkerNotification =
  (id: number, data: any) => async (dispatch: any) => {
    try {
      const response = await axios.put(
        `${config.api_url}/workers/${id}/sendNotification`,
        data
      );
      if (response.data.status === "ok") {
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
