import { useMemo } from "react";
import { MOVIES } from "@/data/movies";
import type { Genre, Movie } from "@/data/movies";

interface UseMoviesParams {
  page: number;
  limit: number;
  query?: string;
  genre?: Genre | null;
}

interface UseMoviesResult {
  movies: Movie[];
  total: number;
  totalPages: number;
}

export function useMovies({
  page,
  limit,
  query = "",
  genre = null,
}: UseMoviesParams): UseMoviesResult {
  const filtered = useMemo(() => {
    let result = MOVIES;
    if (genre) {
      result = result.filter((m) => m.genres.includes(genre));
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.description.toLowerCase().includes(q) ||
          m.director.toLowerCase().includes(q)
      );
    }
    return result;
  }, [query, genre]);

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const skip = (page - 1) * limit;
  const movies = filtered.slice(skip, skip + limit);

  return { movies, total, totalPages };
}

export function useMovie(id: number): Movie | null {
  return useMemo(() => MOVIES.find((m) => m.id === id) ?? null, [id]);
}

export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m.toString().padStart(2, "0")}m`;
}

export function getYouTubeId(url: string): string | null {
  const match = url.match(/[?&]v=([^&]+)/);
  return match ? match[1] : null;
}
