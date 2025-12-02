import { z } from "zod";

// Product schema (for API data)
export const ProductSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  thumbnail: z.string().url(),
  discountPercentage: z.number().min(0).max(100),
  images: z.array(z.string().url()),
});

export type Product = z.infer<typeof ProductSchema>;

// ProductsResponse schema (for API response wrapper)
export const ProductsResponseSchema = z.object({
  products: z.array(ProductSchema),
  total: z.number().int().nonnegative(),
  skip: z.number().int().nonnegative(),
  limit: z.number().int().positive(),
});

export type ProductsResponse = z.infer<typeof ProductsResponseSchema>;

// CartItem schema (extends Product-like shape with extras)
export const CartItemSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1),
  price: z.number().positive(),
  finalPrice: z.number().positive(),
  thumbnail: z.string().url(),
  qty: z.number().int().positive(),
});

export type CartItem = z.infer<typeof CartItemSchema>;
