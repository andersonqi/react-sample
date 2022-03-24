export interface Property {
  id: number;
  name: string;
  cover: string;
  email: string;
  status: boolean;
  countryCode: string;
  createdAt: string;
  updateAt: string;
}

export interface Properties {
  properties: Property[];
  currentProperty: Property;
  loading: boolean;
  error: boolean;
  errorMessage: string;
}
