export type ExactPartial<T> = {
  [P in keyof T]?: Exclude<T[P], undefined>;
};
