import axios from "axios";
import { ProductsResponseSchema, type ProductsResponse } from "@/domain/entities/product.schema";

// Memoize the function for server-side caching (using React's cache)
import { cache } from "react";

export const getProducts = cache(async (skip: number = 0): Promise<ProductsResponse> => {
  const limit = 30;
  const response = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);

  // Validate with Zod at runtime
  return ProductsResponseSchema.parse(response.data);
});
