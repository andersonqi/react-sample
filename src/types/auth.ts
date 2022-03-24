import { Property } from "./property";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ApiResponse {
  error: boolean;
  message?: string;
}

export interface Auth {
  user: Property;
}
