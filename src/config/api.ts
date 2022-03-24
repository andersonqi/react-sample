import { ConfigNetwork } from "../types/config";

// eslint-disable-next-line
let config = <ConfigNetwork>{};

config.api_url = "http://localhost:3000/api/v1";
config.storage_url = "http://localhost:3000/";


export const PROPERTY_PREFIX_PATH = "/app";
export const USER_PREFIX_PATH = "/users";

export default config;
