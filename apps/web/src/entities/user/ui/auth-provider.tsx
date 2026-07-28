import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../lib/use-auth';
import { AuthContext } from '../model/auth-context';
import { createAuthStore } from '../model/auth-store';

export function AuthProvider({ children }: { children?: React.ReactNode }) {
  const [store] = useState(() => createAuthStore());
  // useFetchCurrentUser(store);

  return (
    <AuthContext value={store}>
      <CurrentUserFetcher />
      {children}
    </AuthContext>
  );
}

// function useFetchCurrentUser(store: ReturnType<typeof createAuthStore>) {
//   const isInitial = useRef(true);

//   useEffect(() => {
//     if (!isInitial.current || !store.getState().isInitial) return;
//     isInitial.current = false;
//     void store
//       .getState()
//       .fetchCurrentUser()
//       .finally(() => store.getState().setInitial(false));
//   }, [store]);
// }

function CurrentUserFetcher() {
  const setInitial = useAuth(({ setInitial }) => setInitial);
  const fetchCurrentUser = useAuth(({ fetchCurrentUser }) => fetchCurrentUser);
  const user = useAuth(({ user }) => user);

  useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      try {
        await fetchCurrentUser();
        return null;
      } finally {
        setInitial(false);
      }
    },
    retry: false,
    refetchInterval: () => (user ? 60000 : false),
    refetchOnWindowFocus: false,
  });

  return null;
}
