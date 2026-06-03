import type { Comment } from "@/types";

const TOKEN_KEY = "movies-spa:token";
const COMMENTS_KEY = "movies-spa:comments";
const DELETED_KEY = "movies-spa:deleted-comments";
const RATINGS_KEY = "movies-spa:ratings";

export const tokenStorage = {
  get: (): string | null => localStorage.getItem(TOKEN_KEY),
  set: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

type LocalCommentsMap = Record<string, Comment[]>;
type DeletedMap = Record<string, number[]>;
type RatingsMap = Record<string, number>;

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export const localCommentsStorage = {
  getAll: (postId: number): Comment[] => {
    const map = read<LocalCommentsMap>(COMMENTS_KEY, {});
    return map[String(postId)] ?? [];
  },
  add: (postId: number, comment: Comment) => {
    const map = read<LocalCommentsMap>(COMMENTS_KEY, {});
    const list = map[String(postId)] ?? [];
    map[String(postId)] = [comment, ...list];
    write(COMMENTS_KEY, map);
  },
  update: (postId: number, id: number, body: string) => {
    const map = read<LocalCommentsMap>(COMMENTS_KEY, {});
    const list = map[String(postId)] ?? [];
    map[String(postId)] = list.map((c) => (c.id === id ? { ...c, body } : c));
    write(COMMENTS_KEY, map);
  },
  remove: (postId: number, id: number) => {
    const map = read<LocalCommentsMap>(COMMENTS_KEY, {});
    const list = map[String(postId)] ?? [];
    map[String(postId)] = list.filter((c) => c.id !== id);
    write(COMMENTS_KEY, map);
  },
};

export const deletedCommentsStorage = {
  getAll: (postId: number): number[] => {
    const map = read<DeletedMap>(DELETED_KEY, {});
    return map[String(postId)] ?? [];
  },
  add: (postId: number, id: number) => {
    const map = read<DeletedMap>(DELETED_KEY, {});
    const list = map[String(postId)] ?? [];
    if (!list.includes(id)) {
      map[String(postId)] = [...list, id];
      write(DELETED_KEY, map);
    }
  },
};

export const editedCommentsStorage = {
  getAll: (postId: number): Record<number, string> => {
    const map = read<Record<string, Record<number, string>>>(
      "movies-spa:edited-comments",
      {}
    );
    return map[String(postId)] ?? {};
  },
  set: (postId: number, id: number, body: string) => {
    const map = read<Record<string, Record<number, string>>>(
      "movies-spa:edited-comments",
      {}
    );
    const entry = map[String(postId)] ?? {};
    entry[id] = body;
    map[String(postId)] = entry;
    write("movies-spa:edited-comments", map);
  },
};

export const ratingsStorage = {
  getAll: (): RatingsMap => read<RatingsMap>(RATINGS_KEY, {}),
  get: (postId: number): number => {
    const map = read<RatingsMap>(RATINGS_KEY, {});
    return map[String(postId)] ?? 0;
  },
  set: (postId: number, value: number) => {
    const map = read<RatingsMap>(RATINGS_KEY, {});
    map[String(postId)] = value;
    write(RATINGS_KEY, map);
  },
};
