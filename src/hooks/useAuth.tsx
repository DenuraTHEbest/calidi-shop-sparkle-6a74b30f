import { useState, useEffect, createContext, useContext, ReactNode, useCallback } from "react";
import { apiFetch } from "@/lib/api";

interface AuthUser {
  id: string;
  email: string;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = "calidi_token";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [loading, setLoading] = useState(true);

  // On mount / token change, fetch current user
  useEffect(() => {
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    apiFetch<{ user: AuthUser }>("/auth/me", { token })
      .then(({ user }) => setUser(user))
      .catch(() => {
        // Token invalid – clear it
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, [token]);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const data = await apiFetch<{ token: string; user: AuthUser }>("/auth/login", {
        method: "POST",
        body: { email, password },
      });
      localStorage.setItem(TOKEN_KEY, data.token);
      setToken(data.token);
      setUser(data.user);
      return { error: null };
    } catch (err) {
      return { error: err as Error };
    }
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    try {
      await apiFetch("/auth/signup", {
        method: "POST",
        body: { email, password },
      });
      return { error: null };
    } catch (err) {
      return { error: err as Error };
    }
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
