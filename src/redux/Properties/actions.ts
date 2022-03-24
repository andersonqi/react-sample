import * as types from "./types";
import axios from "axios";
import config from "../../config/api";

export const getProperties = () => async (dispatch: any) => {
  try {
    const response = await axios.get(`${config.api_url}/property/all`);
    if (response.data.status === "ok") {
      dispatch({
        type: types.PROPERTIES_LOAD,
        payload: response.data.properties,
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

export const createProperty = (data: any) => async (dispatch: any) => {
  try {
    const response = await axios.post(
      `${config.api_url}/property/create`,
      data
    );
    if (response.data.status === "ok") {
      dispatch({
        type: types.PROPERTIES_CREATE,
        payload: response.data.property,
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

export const getProperty = (id: number) => async (dispatch: any) => {
  try {
    const response = await axios.get(`${config.api_url}/property/${id}`);
    if (response.data.status === "ok") {
      dispatch({
        type: types.PROPERTIE_LOAD,
        payload: response.data.property,
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

export const updateProperty =
  (propertyId: number, data: any) => async (dispatch: any) => {
    try {
      const response = await axios.put(
        `${config.api_url}/property/${propertyId}`,
        data
      );
      if (response.data.status === "ok") {
        dispatch({
          type: types.PROPERTIE_LOAD,
          payload: response.data.property,
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

export const deleteProperty = (id: number) => async (dispatch: any) => {
  try {
    const response = await axios.delete(`${config.api_url}/property/${id}`);
    if (response.data.status === "ok") {
      dispatch({
        type: types.PROPERTIE_DELETE,
        payload: id,
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

export const changePassword =
  (id: number, data: any) => async (dispatch: any) => {
    try {
      let response = await axios.put(
        `${config.api_url}/property/${id}/changePassword`,
        data
      );
      if (response.data.status === "ok") {
        dispatch({
          type: types.PROPERTIE_LOAD,
          payload: response.data.property,
        });
        return { error: false };
      }
    } catch (error) {
      return { error: true };
    }
  };
