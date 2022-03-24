export interface Plan {
  id: number;
  name: string;
  description: string;
  price: number;
  period: string;
  information: any;
  currency: any;
  countryCode: string;
  status: string;
  priceId: string;
  productId: string;
}

export interface Plans {
  plans: Plan[];
  currentPlan: Plan;
  loading: boolean;
  error: boolean;
  errorMessage: string;
}
