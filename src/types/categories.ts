export interface Categorie {
  id: number;
  name: string;
  status: boolean;
  createdAt: string;
  updateAt: string;
}

export interface Categories {
  categories: Categorie[];
  currentCategory: Categorie;
  loading: boolean;
  error: boolean;
  errorMessage: string;
}
