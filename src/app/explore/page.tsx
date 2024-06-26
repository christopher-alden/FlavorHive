import { Suspense } from "react";
import SearchResults from "./_components/search-results";

interface ExploreProps {
  searchParams: { [key: string]: string | undefined };
}

export default function Explore({ searchParams }: ExploreProps) {
  const isSearchEmpty =
    !searchParams.search || searchParams.search.trim() === "";
  console.log(searchParams.search);
  return (
    <>
      <div className="flex flex-col gap-16">
        <div className="w-full flex flex-col items-center justify-center gap-2 h-48">
          <h1 className="text-3xl font-medium ">
            Find your next favorite place
          </h1>
          {isSearchEmpty ? (
            <p className="text-base text-gray-500">
              Explore many varieties of flavours
            </p>
          ) : (
            <>
              <p className="text-base text-gray-500">
                Showing results for "{searchParams.search}"
              </p>
            </>
          )}
        </div>
        <Suspense fallback="loading...">
          <SearchResults searchParams={searchParams.search ?? ""} />
        </Suspense>
      </div>
    </>
  );
}
