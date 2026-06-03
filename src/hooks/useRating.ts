import { useState, useCallback } from "react";
import { ratingsStorage } from "@/lib/storage";

export function useRating(postId: number) {
  const [rating, setRatingState] = useState<number>(() =>
    ratingsStorage.get(postId)
  );

  const setRating = useCallback(
    (value: number) => {
      ratingsStorage.set(postId, value);
      setRatingState(value);
    },
    [postId]
  );

  return { rating, setRating };
}
