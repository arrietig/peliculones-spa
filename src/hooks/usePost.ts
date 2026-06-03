import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Post, CommentsResponse } from "@/types";

export function usePost(id: number) {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => api.get<Post>(`/posts/${id}`),
    enabled: !isNaN(id),
  });
}

export function usePostComments(postId: number) {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => api.get<CommentsResponse>(`/posts/${postId}/comments`),
    enabled: !isNaN(postId),
  });
}
