export function invariant<T>(obj: T, error?: string): asserts obj {
  if (!obj) {
    throw new Error(error);
  }
}
