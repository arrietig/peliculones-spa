import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { PostsResponse } from "@/types";

export function usePosts(page: number, limit: number) {
  const skip = (page - 1) * limit;
  return useQuery({
    queryKey: ["posts", page, limit],
    queryFn: () =>
      api.get<PostsResponse>(`/posts?limit=${limit}&skip=${skip}`),
    placeholderData: (prev) => prev,
  });
}

export function usePostsSearch(query: string, page: number, limit: number) {
  const skip = (page - 1) * limit;
  return useQuery({
    queryKey: ["posts-search", query, page, limit],
    queryFn: () =>
      api.get<PostsResponse>(
        `/posts/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`
      ),
    enabled: query.length > 0,
    placeholderData: (prev) => prev,
  });
}
