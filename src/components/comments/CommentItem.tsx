import { useState } from "react";
import type { Comment } from "@/types";
import { useAuth } from "@/hooks/useAuth";

function ThumbUpIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
      <path d="M7 10v12" />
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
    </svg>
  );
}

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
    <div className="glass glass-hover rounded-2xl p-4">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand/30 bg-brand/20 text-sm font-bold text-brand">
            {comment.user.username[0].toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">
              {comment.user.fullName ?? comment.user.username}
            </p>
            <p className="text-xs text-slate-500">@{comment.user.username}</p>
          </div>
        </div>

        {canModify && !isEditing && (
          <div className="flex gap-1">
            <button
              onClick={() => setIsEditing(true)}
              className="cursor-pointer rounded-lg px-2.5 py-1 text-xs text-slate-400 transition hover:bg-white/10 hover:text-white"
            >
              Editar
            </button>
            <button
              onClick={() => onDelete(comment.id)}
              className="cursor-pointer rounded-lg px-2.5 py-1 text-xs text-rose-500 transition hover:bg-rose-500/10"
            >
              Borrar
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-2">
          <textarea
            value={editBody}
            onChange={(e) => setEditBody(e.target.value)}
            rows={3}
            className="input-glass w-full resize-none rounded-xl p-2.5 text-sm"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="btn-primary cursor-pointer rounded-lg px-3 py-1.5 text-xs"
            >
              Guardar
            </button>
            <button
              onClick={handleCancelEdit}
              className="btn-ghost cursor-pointer rounded-lg px-3 py-1.5 text-xs"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <p className="text-sm leading-relaxed text-slate-300">{comment.body}</p>
      )}

      {comment.likes > 0 && (
        <div className="mt-2 flex items-center gap-1 text-xs text-slate-600">
          <ThumbUpIcon />
          {comment.likes}
        </div>
      )}
    </div>
  );
}
