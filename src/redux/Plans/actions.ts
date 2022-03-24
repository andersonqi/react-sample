import * as types from "./types";
import axios from "axios";
import config from "../../config/api";

export const getPlans = () => async (dispatch: any) => {
  try {
    const response = await axios.get(`${config.api_url}/plans/all`);
    if (response.data.status === "ok") {
      dispatch({
        type: types.PLANS_LOAD,
        payload: response.data.plans,
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

export const createPlan = (data: any) => async (dispatch: any) => {
  try {
    const response = await axios.post(`${config.api_url}/plans/create`, data);
    if (response.data.status === "ok") {
      dispatch({
        type: types.PLANS_CREATE,
        payload: response.data.plan,
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

export const getPlan = (id: number) => async (dispatch: any) => {
  try {
    const response = await axios.get(`${config.api_url}/plans/${id}`);
    if (response.data.status === "ok") {
      dispatch({
        type: types.PLAN_LOAD,
        payload: response.data.plan,
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

export const updatePlan = (id: number, data: any) => async (dispatch: any) => {
  try {
    const response = await axios.put(`${config.api_url}/plans/${id}`, data);
    if (response.data.status === "ok") {
      dispatch({
        type: types.PLAN_LOAD,
        payload: response.data.plan,
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
