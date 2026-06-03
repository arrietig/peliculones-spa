import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useCommentsCrud } from "@/hooks/useCommentsCrud";
import { CommentItem } from "./CommentItem";
import { CommentForm } from "./CommentForm";

interface CommentSectionProps {
  postId: number;
}

export function CommentSection({ postId }: CommentSectionProps) {
  const { isAuthenticated } = useAuth();
  const { comments, addComment, editComment, deleteComment, isAdding } =
    useCommentsCrud(postId);

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
          <Link
            to="/login"
            className="font-medium text-brand hover:text-brand-light transition-colors"
          >
            Iniciá sesión
          </Link>{" "}
          para dejar un comentario. ¡Sé el primero!
        </div>
      )}

      {comments.length === 0 && (
        <p className="py-8 text-center text-sm text-slate-500">
          Aún no hay comentarios. ¡Animate a ser el primero!
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
