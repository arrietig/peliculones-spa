import { useState } from "react";
import type { Comment } from "@/types";
import { useAuth } from "@/hooks/useAuth";

interface CommentItemProps {
  comment: Comment;
  onEdit: (id: number, body: string) => void;
  onDelete: (id: number) => void;
}

export function CommentItem({ comment, onEdit, onDelete }: CommentItemProps) {
  const { user, isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editBody, setEditBody] = useState(comment.body);

  const canModify = isAuthenticated && user?.id === comment.user.id;

  function handleSave() {
    const trimmed = editBody.trim();
    if (!trimmed) return;
    onEdit(comment.id, trimmed);
    setIsEditing(false);
  }

  function handleCancelEdit() {
    setEditBody(comment.body);
    setIsEditing(false);
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="mb-2 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand/10 text-sm font-semibold text-brand">
            {comment.user.username[0].toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-medium text-slate-800">
              {comment.user.fullName ?? comment.user.username}
            </p>
            <p className="text-xs text-slate-400">@{comment.user.username}</p>
          </div>
        </div>

        {canModify && !isEditing && (
          <div className="flex gap-1">
            <button
              onClick={() => setIsEditing(true)}
              className="rounded-md px-2.5 py-1 text-xs text-slate-500 transition hover:bg-slate-100"
            >
              Editar
            </button>
            <button
              onClick={() => onDelete(comment.id)}
              className="rounded-md px-2.5 py-1 text-xs text-rose-500 transition hover:bg-rose-50"
            >
              Borrar
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="mt-2 space-y-2">
          <textarea
            value={editBody}
            onChange={(e) => setEditBody(e.target.value)}
            rows={3}
            className="w-full resize-none rounded-lg border border-slate-300 p-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="rounded-lg bg-brand px-3 py-1.5 text-xs font-medium text-white transition hover:bg-brand-dark"
            >
              Guardar
            </button>
            <button
              onClick={handleCancelEdit}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-600 transition hover:bg-slate-50"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-1 text-sm leading-relaxed text-slate-600">{comment.body}</p>
      )}

      {comment.likes > 0 && (
        <p className="mt-2 text-xs text-slate-400">👍 {comment.likes} likes</p>
      )}
    </div>
  );
}
