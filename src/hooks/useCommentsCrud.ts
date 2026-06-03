import { useMemo, useState, useCallback } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import {
  localCommentsStorage,
  deletedCommentsStorage,
  editedCommentsStorage,
} from "@/lib/storage";
import type { Comment } from "@/types";

interface UseCommentsCrudOptions {
  postId: number;
  serverComments: Comment[];
}

export function useCommentsCrud({ postId, serverComments }: UseCommentsCrudOptions) {
  const { user } = useAuth();
  const [localComments, setLocalComments] = useState<Comment[]>(() =>
    localCommentsStorage.getAll(postId)
  );
  const [deletedIds, setDeletedIds] = useState<Set<number>>(
    () => new Set(deletedCommentsStorage.getAll(postId))
  );
  const [editedBodies, setEditedBodies] = useState<Record<number, string>>(
    () => editedCommentsStorage.getAll(postId)
  );
  const [isAdding, setIsAdding] = useState(false);

  const comments = useMemo<Comment[]>(() => {
    const withEdits = serverComments
      .filter((c) => !deletedIds.has(c.id))
      .map((c) =>
        editedBodies[c.id] !== undefined ? { ...c, body: editedBodies[c.id] } : c
      );
    return [...localComments.filter((c) => !deletedIds.has(c.id)), ...withEdits];
  }, [serverComments, localComments, deletedIds, editedBodies]);

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
        user: { id: user.id, username: user.username, fullName: `${user.firstName} ${user.lastName}` },
      };
      setLocalComments((prev) => [optimistic, ...prev]);
      localCommentsStorage.add(postId, optimistic);
      try {
        const created = await api.post<Comment>(
          "/comments/add",
          { body, postId, userId: user.id },
          { auth: true }
        );
        setLocalComments((prev) =>
          prev.map((c) => (c.id === tempId ? created : c))
        );
        localCommentsStorage.remove(postId, tempId);
        localCommentsStorage.add(postId, created);
      } catch {
        /* keep optimistic comment on failure */
      } finally {
        setIsAdding(false);
      }
    },
    [user, postId]
  );

  const editComment = useCallback(
    async (id: number, body: string) => {
      if (!user) return;
      setEditedBodies((prev) => ({ ...prev, [id]: body }));
      editedCommentsStorage.set(postId, id, body);
      const isLocal = id < 0;
      if (isLocal) {
        localCommentsStorage.update(postId, id, body);
        setLocalComments((prev) =>
          prev.map((c) => (c.id === id ? { ...c, body } : c))
        );
        return;
      }
      try {
        await api.put(`/comments/${id}`, { body }, { auth: true });
      } catch {
        /* local state already updated */
      }
    },
    [user, postId]
  );

  const deleteComment = useCallback(
    async (id: number) => {
      if (!user) return;
      setDeletedIds((prev) => new Set([...prev, id]));
      deletedCommentsStorage.add(postId, id);
      const isLocal = id < 0;
      if (isLocal) {
        localCommentsStorage.remove(postId, id);
        setLocalComments((prev) => prev.filter((c) => c.id !== id));
        return;
      }
      try {
        await api.del(`/comments/${id}`, { auth: true });
      } catch {
        /* local state already updated */
      }
    },
    [user, postId]
  );

  return { comments, addComment, editComment, deleteComment, isAdding };
}
