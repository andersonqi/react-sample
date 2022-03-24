export interface Statistic {
  totalProperties: number;
  totalUsers: number;
  totalWorkers: number;
  services: any[];
  subscriptions: any[];
}

export interface Statistics {
  statistics: Statistic;
  loading: boolean;
  error: boolean;
}
