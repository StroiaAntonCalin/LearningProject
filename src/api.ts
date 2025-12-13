import axios from "axios";
import type { Product } from "./types";

const BASE_URL = "http://localhost:8055";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export async function fetchProducts(): Promise<Product[]> {
  const res = await apiClient.get<Product[]>("/products");
  return res.data;
}

export async function fetchProduct(productId: string): Promise<Product | null> {
  const res = await apiClient.get<Product[]>(`/products/${productId}`);
  return res.data?.[0] ?? null;
}

export async function addReview(
  productId: string,
  text: string,
  rating: number,
): Promise<Product> {
  const res = await apiClient.post<{ product: Product }>(
    `/products/${productId}/reviews`,
    { text, rating },
  );

  return res.data.product;
}
