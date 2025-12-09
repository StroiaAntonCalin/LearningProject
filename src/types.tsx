export interface Review {
  id: string;
  text: string;
  rating: number;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  reviews: Review[];
}