import type { FilterParams } from '../model/use-catalog-filter-params';

export function filterParamToString(param: FilterParams[keyof FilterParams]) {
  return Array.isArray(param) ? param.join(',') : String(param);
}
