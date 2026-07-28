export function truthy<T>(value: T) {
  return value ? value : undefined;
}

export function falsy<T>(value: T) {
  return !value ? value : undefined;
}

export function isNaN(value: unknown) {
  return Number.isNaN(value);
}

export function isUndefined(value: unknown) {
  return value === undefined;
}

export function isNull(value: unknown) {
  return value === null;
}

export function isNil(value: unknown) {
  return isUndefined(value) || isNull(value);
}

export function isEmpty(obj: unknown) {
  if (isNil(obj)) return true;
  if (Array.isArray(obj)) {
    return obj.length === 0;
  }
  if (typeof obj === 'object') {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }
  return false;
}
