import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (name: string, email: string, password: string) => Promise<boolean>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = "solina_auth";

const loadUser = (): AuthUser | null => {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(loadUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  const signIn = useCallback(async (email: string, _password: string): Promise<boolean> => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    const newUser: AuthUser = {
      id: crypto.randomUUID(),
      name: email.split("@")[0],
      email,
      role: email.includes("admin") ? "admin" : "user",
    };
    setUser(newUser);
    setLoading(false);
    return true;
  }, []);

  const signUp = useCallback(async (name: string, email: string, _password: string): Promise<boolean> => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    const newUser: AuthUser = {
      id: crypto.randomUUID(),
      name,
      email,
      role: "user",
    };
    setUser(newUser);
    setLoading(false);
    return true;
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
