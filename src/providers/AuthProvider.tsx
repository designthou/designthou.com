"use client";

import { useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { useAuthStore } from "@/stores";

type Props = {
  initialUser: User | null;
  children: React.ReactNode;
};

export default function AuthProvider({ initialUser, children }: Props) {
  const setUser = useAuthStore(({ setUser }) => setUser);

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser, setUser]);

  return <>{children}</>;
}
