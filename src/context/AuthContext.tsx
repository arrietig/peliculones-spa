import { createContext, useEffect, useState, useCallback, type ReactNode } from "react";
import { api } from "@/lib/api";
import { tokenStorage } from "@/lib/storage";
import type { AuthUser, MeUser, LoginPayload } from "@/types";

interface AuthContextValue {
  user: MeUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MeUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const restoreSession = useCallback(async () => {
    const token = tokenStorage.get();
    if (!token) {
      setIsLoading(false);
      return;
    }
    try {
      const me = await api.get<MeUser>("/auth/me", { auth: true });
      setUser(me);
    } catch {
      tokenStorage.clear();
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  const login = useCallback(async (payload: LoginPayload) => {
    const auth = await api.post<AuthUser>("/auth/login", {
      ...payload,
      expiresInMins: 60,
    });
    tokenStorage.set(auth.accessToken);
    const { accessToken: _, refreshToken: __, ...me } = auth;
    setUser(me);
  }, []);

  const logout = useCallback(() => {
    tokenStorage.clear();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: user !== null, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
