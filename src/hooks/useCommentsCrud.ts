import { useState, useCallback } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { localCommentsStorage } from "@/lib/storage";
import type { Comment } from "@/types";

export function useCommentsCrud(postId: number) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>(() =>
    localCommentsStorage.getAll(postId)
  );
  const [isAdding, setIsAdding] = useState(false);

  function persist(next: Comment[]) {
    localCommentsStorage.saveAll(postId, next);
  }

  const addComment = useCallback(
    async (body: string) => {
      if (!user) return;
      setIsAdding(true);
      const tempId = -Date.now();
      const optimistic: Comment = {
        id: tempId,
        body,
        postId,
        likes: 0,
        user: {
          id: user.id,
          username: user.username,
          fullName: `${user.firstName} ${user.lastName}`,
        },
      };
      setComments((prev) => {
        const next = [optimistic, ...prev];
        persist(next);
        return next;
      });
      try {
        const created = await api.post<Comment>(
          "/comments/add",
          { body, postId, userId: user.id },
          { auth: true }
        );
        setComments((prev) => {
          const next = prev.map((c) => (c.id === tempId ? created : c));
          persist(next);
          return next;
        });
      } catch {
        /* keep optimistic comment */
      } finally {
        setIsAdding(false);
      }
    },
    [user, postId]
  );

  const editComment = useCallback(
    async (id: number, body: string) => {
      if (!user) return;
      setComments((prev) => {
        const next = prev.map((c) => (c.id === id ? { ...c, body } : c));
        persist(next);
        return next;
      });
      if (id > 0) {
        try {
          await api.put(`/comments/${id}`, { body }, { auth: true });
        } catch {
          /* local state already updated */
        }
      }
    },
    [user, postId]
  );

  const deleteComment = useCallback(
    async (id: number) => {
      if (!user) return;
      setComments((prev) => {
        const next = prev.filter((c) => c.id !== id);
        persist(next);
        return next;
      });
      if (id > 0) {
        try {
          await api.del(`/comments/${id}`, { auth: true });
        } catch {
          /* local state already updated */
        }
      }
    },
    [user, postId]
  );

  return { comments, addComment, editComment, deleteComment, isAdding };
}
