import { useState } from "react";
import type { SessionUser } from "../model/types";

export function useAuth() {
  const [user,setUser] = useState<SessionUser|null>(null);

  const signUp = async () => {
  };

  const signIn = () => {};

  const signOut = () => {};

  return { signUp, signIn, signOut };
}
