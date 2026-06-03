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
      <h2 className="font-display mb-4 text-xl font-bold text-white">
        Comentarios{" "}
        <span className="text-sm font-normal text-slate-500">
          ({comments.length})
        </span>
      </h2>

      {isAuthenticated ? (
        <CommentForm onSubmit={addComment} isSubmitting={isAdding} />
      ) : (
        <div className="mb-6 rounded-2xl border border-dashed border-white/10 p-5 text-center text-sm text-slate-500">
          <Link to="/login" className="font-medium text-brand hover:text-brand-light transition-colors">
            Inicia sesión
          </Link>{" "}
          para dejar un comentario.
        </div>
      )}

      {isLoading && serverComments.length === 0 && (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-2xl border border-white/5 bg-white/3" />
          ))}
        </div>
      )}

      {!isLoading && comments.length === 0 && (
        <p className="py-8 text-center text-sm text-slate-500">
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
