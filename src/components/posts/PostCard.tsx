import { Link } from "react-router-dom";
import type { Post } from "@/types";
import { StarRating } from "@/components/ui/StarRating";
import { useRating } from "@/hooks/useRating";
import { useAuth } from "@/hooks/useAuth";

const POSTER_GRADIENTS = [
  "from-violet-700 to-indigo-900",
  "from-fuchsia-700 to-purple-900",
  "from-blue-700 to-cyan-900",
  "from-rose-700 to-pink-900",
  "from-amber-700 to-orange-900",
  "from-teal-700 to-emerald-900",
  "from-sky-700 to-blue-900",
  "from-purple-700 to-fuchsia-900",
];

function ThumbUpIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className ?? "h-3.5 w-3.5"}>
      <path d="M7 10v12" />
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
    </svg>
  );
}

function ThumbDownIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className ?? "h-3.5 w-3.5"}>
      <path d="M17 14V2" />
      <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" />
    </svg>
  );
}

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className ?? "h-3.5 w-3.5"}>
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const { rating, setRating } = useRating(post.id);
  const { isAuthenticated } = useAuth();
  const summary = post.body.length > 100 ? post.body.slice(0, 100) + "…" : post.body;
  const gradient = POSTER_GRADIENTS[post.id % POSTER_GRADIENTS.length];

  return (
    <article className="group glass glass-hover cursor-pointer rounded-2xl overflow-hidden flex flex-col hover:shadow-glow">
      <div className={`bg-gradient-to-br ${gradient} h-28 relative flex items-end p-3`}>
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 flex flex-wrap gap-1">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-black/40 px-2 py-0.5 text-[10px] font-medium text-white/80 backdrop-blur-sm border border-white/10"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h2 className="mb-2 font-display text-base font-bold leading-snug text-white group-hover:text-brand-light transition-colors duration-200">
          <Link to={`/posts/${post.id}`} className="hover:underline">
            {post.title}
          </Link>
        </h2>

        <p className="mb-4 flex-1 text-sm text-slate-400 leading-relaxed">{summary}</p>

        <div className="mb-4 flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1 text-emerald-400">
            <ThumbUpIcon />
            {post.reactions.likes}
          </span>
          <span className="flex items-center gap-1 text-rose-400">
            <ThumbDownIcon />
            {post.reactions.dislikes}
          </span>
          <span className="flex items-center gap-1 text-slate-500">
            <EyeIcon />
            {post.views.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-white/5 pt-3">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] text-slate-500">
              {isAuthenticated ? "Tu calificación" : "Inicia sesión para calificar"}
            </span>
            <StarRating
              value={rating}
              onChange={isAuthenticated ? setRating : undefined}
              readonly={!isAuthenticated}
              size="sm"
            />
          </div>
          <Link
            to={`/posts/${post.id}`}
            className="rounded-lg border border-brand/40 px-3 py-1.5 text-xs font-medium text-brand transition-all duration-200 hover:bg-brand hover:text-white hover:shadow-glow-sm cursor-pointer"
          >
            Ver más →
          </Link>
        </div>
      </div>
    </article>
  );
}
