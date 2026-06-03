import { useParams, Link } from "react-router-dom";
import { usePost, usePostComments } from "@/hooks/usePost";
import { ReactionBar } from "@/components/posts/ReactionBar";
import { CommentSection } from "@/components/comments/CommentSection";
import { StarRating } from "@/components/ui/StarRating";
import { useRating } from "@/hooks/useRating";
import { useAuth } from "@/hooks/useAuth";

function ArrowLeftIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

export function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const postId = Number(id);

  const { data: post, isLoading: postLoading, isError: postError } = usePost(postId);
  const { data: commentsData, isLoading: commentsLoading } = usePostComments(postId);

  const { rating, setRating } = useRating(postId);
  const { isAuthenticated } = useAuth();

  if (isNaN(postId)) {
    return <div className="py-20 text-center text-slate-500">ID de película inválido.</div>;
  }

  if (postLoading) {
    return (
      <div className="mx-auto max-w-3xl space-y-4">
        <div className="h-6 w-32 animate-pulse rounded-lg bg-white/5" />
        <div className="h-10 w-3/4 animate-pulse rounded-xl bg-white/5" />
        <div className="h-40 animate-pulse rounded-2xl bg-white/5" />
        <div className="h-32 animate-pulse rounded-2xl bg-white/5" />
      </div>
    );
  }

  if (postError || !post) {
    return (
      <div className="glass rounded-2xl p-8 text-center border-rose-500/20">
        <p className="text-rose-400">No se pudo cargar la película.</p>
        <Link to="/" className="mt-3 inline-block text-sm text-brand underline">
          Volver al listado
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-brand transition-colors duration-200"
      >
        <ArrowLeftIcon />
        Volver al listado
      </Link>

      <article>
        <div className="mb-3 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-brand/30 bg-brand/10 px-2.5 py-0.5 text-xs font-medium text-brand-light"
            >
              #{tag}
            </span>
          ))}
        </div>

        <h1 className="font-display mb-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
          {post.title}
        </h1>

        <div className="mb-6 flex items-center gap-3">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-slate-500">
              {isAuthenticated ? "Tu calificación" : "Inicia sesión para calificar"}
            </span>
            <StarRating
              value={rating}
              onChange={isAuthenticated ? setRating : undefined}
              readonly={!isAuthenticated}
            />
          </div>
        </div>

        <div className="glass mb-8 rounded-2xl p-6 leading-relaxed text-slate-300">
          {post.body}
        </div>

        <div className="mb-10">
          <ReactionBar reactions={post.reactions} views={post.views} />
        </div>
      </article>

      <CommentSection
        postId={postId}
        serverComments={commentsData?.comments ?? []}
        isLoading={commentsLoading}
      />
    </div>
  );
}
