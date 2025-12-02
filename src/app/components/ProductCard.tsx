"use client";

import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { decrease, addToCart } from "@/lib/store/cartSlice";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Product } from "../services/products";
import toFaNumber from "@/lib/utils/toFaNumber";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);

  const finalPrice = product.discountPercentage
    ? Math.round(product.price * (1 - product.discountPercentage / 100))
    : product.price;
  const cartItem = items.find((i) => i.id === product.id);
  const qty = cartItem?.qty || 0;

  return (
    <article
      key={product.id}
      className="relative grid grid-cols-4 p-4 bg-[#241b20] border border-[rgba(0,0,0,0.25)] rounded-2xl shadow-[0_-1px_4px_rgba(0,0,0,0.1),0_4px_4px_rgba(0,0,0,0.15)]"
    >
      <figure className="relative h-28 w-28 col-span-1">
        <Image fill src={product.thumbnail} alt={product.title} className="object-cover rounded-lg" />
        <div
          className={`text-white absolute bottom-0 right-1.5 translate-y-[50%] flex items-center justify-between rounded-lg px-1 min-h-10 bg-[#c23e78] transition-all duration-200 ease-in-out ${
            qty > 0 ? "left-1.5" : "left-[68px]"
          }`}
        >
          <button
            aria-label={qty > 0 ? "Increase quantity" : "Add to cart"}
            onClick={() =>
              dispatch(
                addToCart({
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  finalPrice,
                  thumbnail: product.thumbnail,
                  qty: 1,
                })
              )
            }
            className={`w-7 h-7 rounded-lg flex items-center cursor-pointer ${qty > 0 ? "bg-[#2e252a]" : "mx-auto"}`}
          >
            <AddIcon className="flex mx-auto" />
          </button>
          <p className={`font-light ${qty > 0 ? "opacity-100" : "hidden opacity-0"}`}>{toFaNumber(qty)}</p>
          <button
            aria-label="Decrease quantity"
            onClick={() => dispatch(decrease(product.id))}
            className={`w-7 h-7 cursor-pointer ${
              qty > 0 ? "opacity-100 transition-all duration-75" : "opacity-0 hidden"
            }`}
          >
            <RemoveIcon />
          </button>
        </div>
      </figure>

      {product.discountPercentage && (
        <aside className="absolute top-0 left-4 bg-[#FF0000] text-white rounded-b-sm flex flex-col items-center min-w-9 gap-1">
          <p className="text-sm font-medium">{toFaNumber(product.discountPercentage)}</p>
          <p className="text-xs font-light">تخفیف</p>
        </aside>
      )}

      <section className="col-span-3 mr-1">
        <div className="flex flex-col gap-4 mb-3">
          <h2 className="text-white font-bold">{product.title}</h2>
          <p className="text-[#afafb9] mr-auto font-semibold">{product.title}</p>
          <p className="text-[#afafb9] text-xs text-justify">{product.description}</p>
        </div>
        <div className="col-span-full flex flex-col items-end">
          {product.discountPercentage && (
            <p className="text-[#afafb9] line-through flex justify-end text-sm mb-0.5 font-light">
              {toFaNumber(product.price)}&nbsp;تومان
            </p>
          )}
          <div className="flex justify-end gap-1 items-center">
            <p className="text-white font-medium">{toFaNumber(finalPrice)}</p>
            <p className="text-[#afafb9] font-light">تومان</p>
          </div>
        </div>
      </section>
    </article>
  );
}
