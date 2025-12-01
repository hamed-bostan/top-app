import axios from "axios";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  discountPercentage: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export const getProducts = async (skip: number = 0): Promise<ProductsResponse> => {
  const limit = 30; // Chunk size; adjust if needed (API supports up to at least 100)
  const response = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
  return response.data;
};
