import { Link } from "react-router-dom";
import type { Comment } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import { useCommentsCrud } from "@/hooks/useCommentsCrud";
import { CommentItem } from "./CommentItem";
import { CommentForm } from "./CommentForm";

interface CommentSectionProps {
  postId: number;
  serverComments: Comment[];
  isLoading: boolean;
}

export function CommentSection({ postId, serverComments, isLoading }: CommentSectionProps) {
  const { isAuthenticated } = useAuth();
  const { comments, addComment, editComment, deleteComment, isAdding } =
    useCommentsCrud({ postId, serverComments });

  return (
    <section>
      <h2 className="mb-4 text-xl font-bold text-slate-900">
        Comentarios{" "}
        <span className="text-sm font-normal text-slate-400">
          ({comments.length})
        </span>
      </h2>

      {isAuthenticated ? (
        <CommentForm onSubmit={addComment} isSubmitting={isAdding} />
      ) : (
        <div className="mb-6 rounded-xl border border-dashed border-slate-300 p-5 text-center text-sm text-slate-500">
          <Link to="/login" className="font-medium text-brand underline">
            Inicia sesión
          </Link>{" "}
          para dejar un comentario.
        </div>
      )}

      {isLoading && serverComments.length === 0 && (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-20 animate-pulse rounded-xl border border-slate-200 bg-slate-100"
            />
          ))}
        </div>
      )}

      {!isLoading && comments.length === 0 && (
        <p className="py-8 text-center text-sm text-slate-400">
          Sin comentarios aún. ¡Sé el primero!
        </p>
      )}

      <div className="space-y-3">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onEdit={editComment}
            onDelete={deleteComment}
          />
        ))}
      </div>
    </section>
  );
}
