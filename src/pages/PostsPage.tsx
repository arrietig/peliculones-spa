import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { usePosts, usePostsSearch } from "@/hooks/usePosts";
import { useDebounce } from "@/hooks/useDebounce";
import { PostCard } from "@/components/posts/PostCard";
import { Pagination } from "@/components/ui/Pagination";

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50] as const;
type PageSize = (typeof PAGE_SIZE_OPTIONS)[number];

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-slate-500">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

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
        <h1 className="font-display mb-1 text-4xl font-bold text-white">
          Películas
        </h1>
        <p className="text-slate-400">
          Explora, comenta y califica el catálogo.
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-xs">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
            <SearchIcon />
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Buscar película..."
            className="input-glass w-full rounded-xl py-2.5 pl-9 pr-3 text-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">Mostrar:</span>
          {PAGE_SIZE_OPTIONS.map((size) => (
            <button
              key={size}
              onClick={() => setLimit(size)}
              className={[
                "cursor-pointer rounded-xl border px-3 py-1.5 text-sm transition-all duration-200",
                limit === size
                  ? "border-brand bg-brand text-white shadow-glow-sm"
                  : "border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white",
              ].join(" ")}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {isError && (
        <div className="glass rounded-2xl p-6 text-center text-rose-400 border-rose-500/20">
          Error cargando las películas. Intenta de nuevo.
        </div>
      )}

      {isLoading && !data && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: limit > 6 ? 6 : limit }).map((_, i) => (
            <div
              key={i}
              className="h-72 animate-pulse rounded-2xl border border-white/5 bg-white/3"
            />
          ))}
        </div>
      )}

      {data && (
        <>
          <div
            className={[
              "mb-2 text-xs text-slate-600 transition-opacity",
              isFetching ? "opacity-100" : "opacity-0",
            ].join(" ")}
          >
            Actualizando…
          </div>

          {data.posts.length === 0 ? (
            <div className="py-20 text-center text-slate-500">
              No se encontraron resultados para "{debouncedQuery}"
            </div>
          ) : (
            <div
              className={[
                "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
                isFetching ? "opacity-60" : "opacity-100",
                "transition-opacity duration-200",
              ].join(" ")}
            >
              {data.posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}

          <div className="mt-8">
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          </div>

          <p className="mt-3 text-center text-xs text-slate-600">
            {data.total} películas · página {page} de {totalPages}
          </p>
        </>
      )}
    </div>
  );
}
