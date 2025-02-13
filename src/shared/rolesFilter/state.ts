import type { RolesFilterCategory } from '@/entities/filter';

export type RolesFilterStateRepository = {
  setActiveJobCategory: ({
    activeCategory,
  }: {
    activeCategory: RolesFilterCategory;
  }) => void;
  setIsFilterDropdownOpen: ({
    isFilterDropdownOpen,
  }: {
    isFilterDropdownOpen: boolean;
  }) => void;
};

export const implRolesFilterStateRepository = ({
  setActiveCategory,
  setIsFilterDropdownOpen,
}: {
  setActiveCategory(input: RolesFilterCategory): void;
  setIsFilterDropdownOpen(input: boolean): void;
}): RolesFilterStateRepository => ({
  setActiveJobCategory: ({ activeCategory }) => {
    setActiveCategory(activeCategory);
  },
  setIsFilterDropdownOpen: ({ isFilterDropdownOpen }) => {
    setIsFilterDropdownOpen(isFilterDropdownOpen);
  },
});
