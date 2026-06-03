import { Link } from "react-router-dom";
import type { Post } from "@/types";
import { StarRating } from "@/components/ui/StarRating";
import { useRating } from "@/hooks/useRating";
import { useAuth } from "@/hooks/useAuth";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const { rating, setRating } = useRating(post.id);
  const { isAuthenticated } = useAuth();
  const summary = post.body.length > 120 ? post.body.slice(0, 120) + "…" : post.body;

  return (
    <article className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand/40 hover:shadow-md">
      <div className="mb-3 flex flex-wrap gap-1.5">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500"
          >
            #{tag}
          </span>
        ))}
      </div>

      <h2 className="mb-2 text-base font-semibold leading-snug text-slate-800 group-hover:text-brand">
        <Link to={`/posts/${post.id}`} className="hover:underline">
          {post.title}
        </Link>
      </h2>

      <p className="mb-4 flex-1 text-sm text-slate-500">{summary}</p>

      <div className="mb-4 flex items-center gap-4 text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <span className="text-emerald-500">👍</span>
          {post.reactions.likes}
        </span>
        <span className="flex items-center gap-1">
          <span className="text-rose-400">👎</span>
          {post.reactions.dislikes}
        </span>
        <span className="flex items-center gap-1">
          <span>👁️</span>
          {post.views.toLocaleString()}
        </span>
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 pt-3">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text-slate-400">
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
          className="rounded-lg border border-brand px-3 py-1.5 text-xs font-medium text-brand transition hover:bg-brand hover:text-white"
        >
          Ver más →
        </Link>
      </div>
    </article>
  );
}
