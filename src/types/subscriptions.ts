import { Worker } from "./workers";

export interface Subscription {
  id: number;
  subscriptionId: string;
  price: number;
  start_date: number;
  current_period_start: number;
  current_period_end: number;
  trial_start: number;
  trial_end: number;
  status: string;
  worker: Worker;
}

export interface Subscriptions {
  subscriptions: Subscription[];
  currentSubscription: Subscription;
  loading: boolean;
  error: boolean;
}
