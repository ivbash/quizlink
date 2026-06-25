/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
export function pipe(...fns: Function[]) {
  return (initialValue: unknown) =>
    fns.reduce(
      (currentValue, currentFn) => currentFn(currentValue),
      initialValue,
    );
}
