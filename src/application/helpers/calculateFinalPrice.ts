import { Product } from "@/domain/entities/product.schema";

export const calculateFinalPrice = (product: Product) =>
  product.discountPercentage ? Math.round(product.price * (1 - product.discountPercentage / 100)) : product.price;
