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

export const getProducts = async (): Promise<ProductsResponse> => {
  const response = await axios.get("https://dummyjson.com/products?limit=200");
  return response.data;
};
