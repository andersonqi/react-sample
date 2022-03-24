export interface Worker {
  id: number;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  avatar: string;
  state: string;
  city: string;
  address: string;
  token: string;
  stripeId: string;
  status: string;
  createdAt: string;
  updateAt: string;
}

export interface Workers {
  workers: Worker[];
  currentWorker: Worker;
  loading: boolean;
  error: boolean;
  errorMessage: string;
}
