import { useParams, Link } from "react-router-dom";
import { usePost, usePostComments } from "@/hooks/usePost";
import { ReactionBar } from "@/components/posts/ReactionBar";
import { CommentSection } from "@/components/comments/CommentSection";
import { StarRating } from "@/components/ui/StarRating";
import { useRating } from "@/hooks/useRating";
import { useAuth } from "@/hooks/useAuth";

export function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const postId = Number(id);

  const { data: post, isLoading: postLoading, isError: postError } = usePost(postId);
  const { data: commentsData, isLoading: commentsLoading } = usePostComments(postId);

  const { rating, setRating } = useRating(postId);
  const { isAuthenticated } = useAuth();

  if (isNaN(postId)) {
    return (
      <div className="py-20 text-center text-slate-400">ID de película inválido.</div>
    );
  }

  if (postLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-2/3 animate-pulse rounded-lg bg-slate-200" />
        <div className="h-4 w-1/3 animate-pulse rounded-lg bg-slate-100" />
        <div className="h-40 animate-pulse rounded-xl bg-slate-100" />
      </div>
    );
  }

  if (postError || !post) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
        <p className="text-red-700">No se pudo cargar la película.</p>
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
        className="mb-6 inline-flex items-center gap-1 text-sm text-slate-500 hover:text-brand"
      >
        ← Volver al listado
      </Link>

      <article>
        <div className="mb-3 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-medium text-brand"
            >
              #{tag}
            </span>
          ))}
        </div>

        <h1 className="mb-4 text-3xl font-bold leading-tight text-slate-900">
          {post.title}
        </h1>

        <div className="mb-6 flex items-center gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-slate-400">
              {isAuthenticated ? "Tu calificación" : "Inicia sesión para calificar"}
            </span>
            <StarRating
              value={rating}
              onChange={isAuthenticated ? setRating : undefined}
              readonly={!isAuthenticated}
            />
          </div>
        </div>

        <div className="mb-8 rounded-xl border border-slate-200 bg-white p-6 leading-relaxed text-slate-700">
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
