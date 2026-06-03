import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useMovie, formatDuration, getYouTubeId } from "@/hooks/useMovies";
import { GENRE_LABELS } from "@/data/movies";
import { CommentSection } from "@/components/comments/CommentSection";
import { StarRating } from "@/components/ui/StarRating";
import { useRating } from "@/hooks/useRating";
import { useAuth } from "@/hooks/useAuth";

function ArrowLeftIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="m12 19-7-7 7-7" /><path d="M19 12H5" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

export function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const movieId = Number(id);
  const movie = useMovie(movieId);
  const { rating, setRating } = useRating(movieId);
  const { isAuthenticated } = useAuth();
  const [imgError, setImgError] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);

  if (!movie) {
    return (
      <div className="py-20 text-center">
        <p className="text-slate-400 mb-4">Película no encontrada.</p>
        <Link to="/" className="text-brand hover:underline">← Volver al catálogo</Link>
      </div>
    );
  }

  const videoId = getYouTubeId(movie.trailerUrl);

  return (
    <div className="mx-auto max-w-4xl">
      <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-brand transition-colors duration-200">
        <ArrowLeftIcon />
        Volver al catálogo
      </Link>

      <div className="mb-8 flex flex-col gap-6 sm:flex-row">
        <div className="shrink-0 mx-auto sm:mx-0">
          <div className="w-48 sm:w-52 rounded-2xl overflow-hidden border border-white/10 shadow-glow bg-black/40">
            {!imgError ? (
              <img
                src={movie.posterUrl}
                alt={movie.title}
                onError={() => setImgError(true)}
                className="w-full h-auto object-cover"
              />
            ) : (
              <div className="h-72 bg-gradient-to-br from-violet-700 to-indigo-900 flex items-center justify-center">
                <span className="text-5xl opacity-40">🎬</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1">
          <div className="mb-2 flex flex-wrap gap-1.5">
            {movie.genres.map((g) => (
              <span key={g} className="rounded-full border border-brand/30 bg-brand/10 px-2.5 py-0.5 text-xs font-medium text-brand-light">
                {GENRE_LABELS[g]}
              </span>
            ))}
          </div>

          <h1 className="font-display mb-3 text-2xl sm:text-3xl font-bold leading-tight text-white">
            {movie.title}
          </h1>

          <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-400">
            <span>{movie.year}</span>
            <span>·</span>
            <span>{movie.director}</span>
            <span>·</span>
            <span>{formatDuration(movie.duration)}</span>
          </div>

          <div className="mb-4">
            <p className="mb-1 text-xs text-slate-500">
              {isAuthenticated ? "Tu calificación" : "Iniciá sesión para calificar"}
            </p>
            <StarRating
              value={rating}
              onChange={isAuthenticated ? setRating : undefined}
              readonly={!isAuthenticated}
            />
          </div>

          <p className="text-sm leading-relaxed text-slate-300">{movie.description}</p>

          {videoId && (
            <button
              onClick={() => setShowTrailer((v) => !v)}
              className="mt-5 btn-primary cursor-pointer inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm"
            >
              <PlayIcon />
              {showTrailer ? "Ocultar trailer" : "Ver trailer"}
            </button>
          )}
        </div>
      </div>

      {showTrailer && videoId && (
        <div className="mb-10">
          <h2 className="font-display mb-3 text-lg font-bold text-white">Trailer oficial</h2>
          <div className="aspect-video w-full overflow-hidden rounded-2xl border border-white/10 shadow-glow bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title={`Trailer de ${movie.title}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        </div>
      )}

      <CommentSection postId={movieId} />
    </div>
  );
}
