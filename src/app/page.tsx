import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import HomeClient from "../presentation/pages/HomeClient";
import { getProducts } from "@/infrastructure/repositories/product.repository";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["products"],
    queryFn: ({ pageParam = 0 }) => getProducts(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.skip + lastPage.limit < lastPage.total ? lastPage.skip + lastPage.limit : undefined,
    pages: 1, // Prefetch only the first page on the server
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeClient />
    </HydrationBoundary>
  );
}
