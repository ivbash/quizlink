export function invariant<T>(obj: T, error?: string): asserts obj {
  if (!obj) {
    throw new Error(error);
  }
}

export function requireAuth<T>(auth?: T): asserts auth {
  invariant(auth, 'Authentication required');
}
