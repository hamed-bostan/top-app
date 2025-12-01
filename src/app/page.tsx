"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { decrease, addToCart } from "@/lib/store/cartSlice";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { getProducts } from "./services/products";

export default function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);

  const totalQty = items.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.qty * i.finalPrice, 0);

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (error) return <p>خطا در دریافت اطلاعات</p>;
  console.log("products", data);

  return (
    <div className="flex flex-col gap-4 bg-[#241b20] max-w-[500px] mx-auto py-10">
      {data?.products.map((product) => {
        const finalPrice = product.discountPercentage
          ? Math.round(product.price * (1 - product.discountPercentage / 100))
          : product.price;

        const cartItem = items.find((i) => i.id === product.id);
        const qty = cartItem?.qty || 0;

        return (
          <div
            key={product.id}
            className="relative grid grid-cols-4 p-4 bg-[#241b20] border border-[rgba(0,0,0,0.25)] rounded-2xl shadow-[0_-1px_4px_rgba(0,0,0,0.1),0_4px_4px_rgba(0,0,0,0.15)]"
          >
            <div className="relative h-28 w-28">
              <Image fill src={product.thumbnail} alt={product.title} className="object-cover rounded-lg" />
              <div
                className={`absolute bottom-0 right-1 translate-y-[50%] flex items-center justify-between rounded-lg px-1 min-h-10 bg-[#c23e78] transition-all duration-200 ease-in-out ${
                  qty > 0 ? "left-1" : "left-[68px]"
                }`}
              >
                <button
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
                  className={`w-7 h-7 rounded-lg flex items-center cursor-pointer ${
                    qty > 0 ? "bg-[#2e252a]" : "mx-auto"
                  }`}
                >
                  <AddIcon className="text-white mx-auto flex" />
                </button>
                <p className={`text-white font-semibold ${qty > 0 ? "opacity-100" : "hidden opacity-0"}`}>{qty}</p>

                <button
                  onClick={() => dispatch(decrease(product.id))}
                  className={`w-7 h-7 cursor-pointer ${
                    qty > 0 ? "opacity-100 transition-all duration-75" : "opacity-0 hidden"
                  }`}
                >
                  <RemoveIcon className="text-white" />
                </button>
              </div>
            </div>

            <div className="col-span-3 flex flex-col gap-5">
              <p className="text-white">{product.title}</p>

              {product.discountPercentage && (
                <div className="absolute top-0 left-4 bg-[#FF0000] text-white rounded-b-sm flex flex-col items-center min-w-8 gap-1">
                  <p className="text-base">{product.discountPercentage}</p>
                  <p className="text-[10px]">تخفیف</p>
                </div>
              )}

              <p className="text-[#afafb9] text-xs">{product.description}</p>
            </div>

            <div className="col-span-full flex flex-col items-end">
              {product.discountPercentage && (
                <p className="text-[#afafb9] line-through flex justify-end text-sm mb-0.5">
                  {product.price}&nbsp;تومان
                </p>
              )}
              <div className="flex justify-end text-sm gap-1">
                <p className="text-white">{finalPrice}</p>
                <p className="text-[#afafb9]">تومان</p>
              </div>
            </div>
          </div>
        );
      })}

      <div className="mt-4 p-4 bg-[#c23e78] text-white rounded-xl flex items-center">
        <span className="text-sm w-7 h-7 bg-[#241b20] rounded-full flex justify-center items-center">{totalQty}</span>
        <p className="text-xs mr-1">تکمیل خرید</p>
        <p className=" mr-auto">{totalPrice} تومان</p>
      </div>
    </div>
  );
}
