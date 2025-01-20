// filter

export type RoleCategory =
  | 'PLANNER'
  | 'FRONT'
  | 'APP'
  | 'BACKEND'
  | 'DESIGN'
  | 'DATA'
  | 'MARKETER'
  | 'OTHERS';

export const ROLE_CATEGORY_LIST: RoleCategory[] = [
  'PLANNER',
  'FRONT',
  'APP',
  'BACKEND',
  'DESIGN',
  'DATA',
  'MARKETER',
  'OTHERS',
];

export type FilterElements = {
  roles?: RoleCategory[];
  investmentMax?: number;
  investmentMin?: number;
  pathStatus?: 0 | 1 | 2;
};
