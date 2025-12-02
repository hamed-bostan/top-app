"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { setItems } from "@/lib/store/cartSlice";
import { getProducts } from "./services/products";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { SkeletonProduct } from "./components/SkeletonProduct";
import { ProductCard } from "./components/ProductCard";

export default function Home() {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);
  const totalQty = items.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.qty * i.finalPrice, 0);

  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: ({ pageParam = 0 }) => getProducts(pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.skip + lastPage.limit < lastPage.total ? lastPage.skip + lastPage.limit : undefined,
    initialPageParam: 0,
  });

  const products = data?.pages.flatMap((page) => page.products) ?? [];

  // Load cart from localStorage after mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cart");
      if (saved) {
        try {
          dispatch(setItems(JSON.parse(saved)));
        } catch (e) {
          console.error("Failed to load cart from localStorage", e);
        }
      }
    }
  }, [dispatch]);

  // IntersectionObserver for infinite scroll
  const observerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 } // Trigger when the ref is fully visible
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (error) return <p>خطا در دریافت اطلاعات</p>;

  return (
    <>
      <div className="flex flex-col gap-4 bg-[#241b20] max-w-[500px] mx-auto py-10 px-4">
        {isLoading
          ? // Initial skeleton loading: Render 5 placeholders
            Array.from({ length: 5 }).map((_, index) => <SkeletonProduct key={`skeleton-initial-${index}`} />)
          : products.map((product) => <ProductCard key={product.id} product={product} />)}
        {isFetchingNextPage &&
          // Append 3 skeleton cards while fetching next page
          Array.from({ length: 3 }).map((_, index) => <SkeletonProduct key={`skeleton-next-${index}`} />)}
        <div ref={observerRef} className="h-10" /> {/* Invisible trigger for observer */}
      </div>
      <footer className="p-4 bg-[#c23e78] text-white rounded-xl flex items-center font-bold sticky bottom-6 max-w-[500px] mx-auto">
        <span className="text-sm w-6 h-6 bg-[#241b20] rounded-full flex justify-center items-center">{totalQty}</span>
        <p className="text-xs mr-1">مشاهده سبد خرید</p>
        <p className="mr-auto text-base">{totalPrice} تومان</p>
      </footer>
    </>
  );
}
