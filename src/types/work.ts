import { Categorie } from "./categories";
import { Property } from "./property";
import { User } from "./user";

export interface Work {
  id: number;
  number: string;
  title: string;
  indications: string;
  files: any;
  amount: number;
  status: string;
  workDate: string;
  state: string;
  city: string;
  categories: Categorie[];
  user: User;
  property: Property;
  createdAt: string;
  updateAt: string;
}

export interface Works {
  works: Work[];
  currentWork: Work;
  loading: boolean;
  error: boolean;
  errorMessage: string;
}
