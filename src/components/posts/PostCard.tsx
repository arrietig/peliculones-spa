import { useState } from "react";
import { Link } from "react-router-dom";
import type { Movie } from "@/data/movies";
import { GENRE_LABELS } from "@/data/movies";
import { StarRating } from "@/components/ui/StarRating";
import { useRating } from "@/hooks/useRating";
import { useAuth } from "@/hooks/useAuth";
import { formatDuration } from "@/hooks/useMovies";

const FALLBACK_GRADIENTS = [
  "from-violet-700 to-indigo-900",
  "from-fuchsia-700 to-purple-900",
  "from-blue-700 to-cyan-900",
  "from-rose-700 to-pink-900",
  "from-amber-700 to-orange-900",
  "from-teal-700 to-emerald-900",
  "from-sky-700 to-blue-900",
  "from-purple-700 to-fuchsia-900",
];

interface MovieCardProps {
  movie: Movie;
}

export function PostCard({ movie }: MovieCardProps) {
  const { rating, setRating } = useRating(movie.id);
  const { isAuthenticated } = useAuth();
  const [imgError, setImgError] = useState(false);
  const gradient = FALLBACK_GRADIENTS[movie.id % FALLBACK_GRADIENTS.length];
  const summary =
    movie.description.length > 90
      ? movie.description.slice(0, 90) + "…"
      : movie.description;

  return (
    <article className="group glass glass-hover cursor-pointer rounded-2xl overflow-hidden flex flex-col hover:shadow-glow">
      <div className="relative h-52 overflow-hidden bg-black/40">
        {!imgError ? (
          <img
            src={movie.posterUrl}
            alt={movie.title}
            loading="lazy"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className={`bg-gradient-to-br ${gradient} h-full w-full flex items-center justify-center`}
          >
            <span className="text-4xl opacity-40">🎬</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
          {movie.genres.slice(0, 2).map((g) => (
            <span
              key={g}
              className="rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-medium text-white/80 backdrop-blur-sm border border-white/10"
            >
              {GENRE_LABELS[g]}
            </span>
          ))}
        </div>
        <div className="absolute top-2 right-2">
          <span className="rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white/70 backdrop-blur-sm">
            {movie.year}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h2 className="mb-1 font-display text-sm font-bold leading-snug text-white group-hover:text-brand-light transition-colors duration-200 line-clamp-2">
          <Link to={`/peliculas/${movie.id}`}>{movie.title}</Link>
        </h2>

        <p className="mb-1 text-xs text-slate-500">{movie.director} · {formatDuration(movie.duration)}</p>

        <p className="mb-3 flex-1 text-xs text-slate-400 leading-relaxed">{summary}</p>

        <div className="flex items-center justify-between border-t border-white/5 pt-3">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] text-slate-500">
              {isAuthenticated ? "Tu calificación" : "Iniciar sesión para calificar"}
            </span>
            <StarRating
              value={rating}
              onChange={isAuthenticated ? setRating : undefined}
              readonly={!isAuthenticated}
              size="sm"
            />
          </div>
          <Link
            to={`/peliculas/${movie.id}`}
            className="rounded-lg border border-brand/40 px-3 py-1.5 text-xs font-medium text-brand transition-all duration-200 hover:bg-brand hover:text-white hover:shadow-glow-sm cursor-pointer"
          >
            Ver más →
          </Link>
        </div>
      </div>
    </article>
  );
}
