import { useEffect, useRef, useState } from 'react';
import { AuthContext } from '../model/auth-context';
import { createAuthStore } from '../model/auth-store';

export function AuthProvider(props: { children?: React.ReactNode }) {
  const [store] = useState(() => createAuthStore());
  const isInitial = useRef(true);

  useEffect(() => {
    if (!isInitial.current || !store.getState().isInitial) return;
    isInitial.current = false;
    void store
      .getState()
      .fetchCurrentUser()
      .finally(() => store.getState().setInitial(false));
  }, [store]);

  return <AuthContext value={store} {...props} />;
}
