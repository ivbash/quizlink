export function getChangedValues<T extends Record<string, unknown>>(
  inputValues: T,
  changedKeys: string[],
) {
  return changedKeys.reduce((changedValues, key: keyof T) => {
    changedValues[key] = inputValues[key];
    return changedValues;
  }, {} as Partial<T>);
}
