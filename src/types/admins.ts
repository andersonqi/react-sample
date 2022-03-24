export interface Admin {
  id: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
  status: boolean;
  pushToken: string;
  property_id: number;
}

export interface Admins {
  admins: Admin[];
  currentAdmin: Admin;
  loading: boolean;
  error: boolean;
  errorMessage: string;
}
