import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "../SupabaseClient";
import type { ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";

interface AuthContextType {
  session: Session | null;
  role: string | null;
  fullName: string | null;
  loading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Effect 1: just listen for auth changes
  useEffect(() => {
    // Get session immediately on mount so we don't flash null
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
      },
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  // Effect 2: when session changes, fetch user data from DB
  useEffect(() => {
    // session hasn't been initialised yet, wait
    if (session === undefined) return;

    const loadUserData = async () => {
      if (!session?.user) {
        setRole(null);
        setFullName(null);
        setLoading(false);
        return;
      }

      // Keep loading TRUE until role is fetched
      setLoading(true);

      const { data, error } = await supabase
        .from("users")
        .select("full_name, role")
        .eq("id", session.user.id)
        .maybeSingle();

      if (error) {
        setRole(null);
        setFullName(null);
      } else {
        setFullName(data?.full_name ?? null);
        setRole(data?.role ?? null);
      }

      // Only set false AFTER role is set
      setLoading(false);
    };

    loadUserData();
  }, [session]);

  return (
    <AuthContext.Provider value={{ session, role, fullName, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("UserAuth must be used inside AuthContextProvider");
  }
  return context;
};
