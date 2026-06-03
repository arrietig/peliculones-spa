import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useMovies } from "@/hooks/useMovies";
import { useDebounce } from "@/hooks/useDebounce";
import { PostCard } from "@/components/posts/PostCard";
import { Pagination } from "@/components/ui/Pagination";
import { GENRE_LABELS } from "@/data/movies";
import type { Genre } from "@/data/movies";

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50] as const;
type PageSize = (typeof PAGE_SIZE_OPTIONS)[number];

const ALL_GENRES = Object.keys(GENRE_LABELS) as Genre[];

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
  const genreParam = searchParams.get("genre") as Genre | null;

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const debouncedQuery = useDebounce(query, 300);

  const { movies, total, totalPages } = useMovies({
    page,
    limit,
    query: debouncedQuery,
    genre: genreParam,
  });

  function setPage(p: number) {
    setSearchParams((prev) => { prev.set("page", String(p)); return prev; });
  }

  function setLimit(l: number) {
    setSearchParams((prev) => { prev.set("page", "1"); prev.set("limit", String(l)); return prev; });
  }

  function setGenre(g: Genre | null) {
    setSearchParams((prev) => {
      prev.set("page", "1");
      if (g) prev.set("genre", g); else prev.delete("genre");
      return prev;
    });
  }

  function handleSearch(value: string) {
    setQuery(value);
    setSearchParams((prev) => {
      prev.set("page", "1");
      if (value) prev.set("q", value); else prev.delete("q");
      return prev;
    });
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display mb-1 text-4xl font-bold text-white">Catálogo</h1>
        <p className="text-slate-400">Explorá, comentá y calificá las mejores películas.</p>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-xs">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
            <SearchIcon />
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Buscar película o director..."
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

      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setGenre(null)}
          className={[
            "cursor-pointer rounded-full border px-3 py-1 text-xs font-medium transition-all duration-200",
            !genreParam
              ? "border-brand bg-brand text-white shadow-glow-sm"
              : "border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white",
          ].join(" ")}
        >
          Todas
        </button>
        {ALL_GENRES.map((g) => (
          <button
            key={g}
            onClick={() => setGenre(g)}
            className={[
              "cursor-pointer rounded-full border px-3 py-1 text-xs font-medium transition-all duration-200",
              genreParam === g
                ? "border-brand bg-brand text-white shadow-glow-sm"
                : "border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white",
            ].join(" ")}
          >
            {GENRE_LABELS[g]}
          </button>
        ))}
      </div>

      {movies.length === 0 ? (
        <div className="py-20 text-center text-slate-500">
          No se encontraron películas para tu búsqueda.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {movies.map((movie) => (
            <PostCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

      <div className="mt-8">
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
      <p className="mt-3 text-center text-xs text-slate-600">
        {total} películas · página {page} de {Math.max(1, totalPages)}
      </p>
    </div>
  );
}
