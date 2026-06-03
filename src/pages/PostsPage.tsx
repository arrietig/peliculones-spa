import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { usePosts, usePostsSearch } from "@/hooks/usePosts";
import { useDebounce } from "@/hooks/useDebounce";
import { PostCard } from "@/components/posts/PostCard";
import { Pagination } from "@/components/ui/Pagination";

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50] as const;
type PageSize = (typeof PAGE_SIZE_OPTIONS)[number];

export function PostsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const limit = (PAGE_SIZE_OPTIONS.find(
    (n) => n === Number(searchParams.get("limit"))
  ) ?? 10) as PageSize;

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const isSearching = debouncedQuery.length > 0;

  const listResult = usePosts(page, limit);
  const searchResult = usePostsSearch(debouncedQuery, page, limit);

  const { data, isLoading, isError, isFetching } = isSearching
    ? searchResult
    : listResult;

  const totalPages = data ? Math.ceil(data.total / limit) : 0;

  function setPage(p: number) {
    setSearchParams((prev) => {
      prev.set("page", String(p));
      return prev;
    });
  }

  function setLimit(l: number) {
    setSearchParams({ page: "1", limit: String(l) });
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-1 text-3xl font-bold text-slate-900">Películas</h1>
        <p className="text-slate-500">
          Explora, comenta y califica el catálogo.
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-xs">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            🔍
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Buscar película..."
            className="w-full rounded-lg border border-slate-300 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">Mostrar:</span>
          {PAGE_SIZE_OPTIONS.map((size) => (
            <button
              key={size}
              onClick={() => setLimit(size)}
              className={[
                "rounded-lg border px-3 py-1.5 text-sm transition",
                limit === size
                  ? "border-brand bg-brand text-white"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50",
              ].join(" ")}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {isError && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
          Error cargando las películas. Intenta de nuevo.
        </div>
      )}

      {isLoading && !data && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: limit }).map((_, i) => (
            <div
              key={i}
              className="h-56 animate-pulse rounded-xl border border-slate-200 bg-slate-100"
            />
          ))}
        </div>
      )}

      {data && (
        <>
          <div
            className={[
              "mb-2 text-sm text-slate-400 transition-opacity",
              isFetching ? "opacity-100" : "opacity-0",
            ].join(" ")}
          >
            Actualizando…
          </div>

          {data.posts.length === 0 ? (
            <div className="py-20 text-center text-slate-400">
              No se encontraron resultados para "{debouncedQuery}"
            </div>
          ) : (
            <div
              className={[
                "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
                isFetching ? "opacity-70" : "opacity-100",
                "transition-opacity duration-200",
              ].join(" ")}
            >
              {data.posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}

          <div className="mt-8">
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>

          <p className="mt-3 text-center text-xs text-slate-400">
            {data.total} películas en total · página {page} de {totalPages}
          </p>
        </>
      )}
    </div>
  );
}
