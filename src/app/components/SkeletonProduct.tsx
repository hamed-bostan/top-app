export function SkeletonProduct() {
  return (
    <div className="relative grid grid-cols-4 p-4 bg-[#241b20] border border-[rgba(0,0,0,0.25)] rounded-2xl shadow-[0_-1px_4px_rgba(0,0,0,0.1),0_4px_4px_rgba(0,0,0,0.15)] animate-pulse">
      <div className="relative h-28 w-28">
        <div className="h-full w-full bg-gray-700 rounded-lg" />
        <div className="absolute bottom-0 right-1 translate-y-[50%] flex items-center justify-between rounded-lg px-1 min-h-10 bg-[#c23e78] w-[100px]" />
      </div>
      <div className="col-span-3 flex flex-col gap-5">
        <div className="h-5 w-3/4 bg-gray-700 rounded" />
        <div className="h-3 w-full bg-gray-700 rounded" />
        <div className="h-3 w-2/3 bg-gray-700 rounded" />
      </div>
      <div className="col-span-full flex flex-col items-end">
        <div className="h-4 w-1/4 bg-gray-700 rounded mb-0.5" />
        <div className="h-4 w-1/3 bg-gray-700 rounded" />
      </div>
    </div>
  );
}
