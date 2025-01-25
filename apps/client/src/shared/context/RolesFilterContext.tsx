import { createContext } from 'react';

type RoleCategory = '개발' | '기획' | '디자인' | '마케팅' | null;

type RolesFilterContext = {
  activeCategory: RoleCategory;
  isFilterDropdownOpen: boolean;
};

export const RolesFilterContext = createContext<RolesFilterContext | null>(
  null,
);
