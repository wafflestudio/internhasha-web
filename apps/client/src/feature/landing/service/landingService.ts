import type { RolesFilterCategory } from '@/entities/filter';
import type { RolesFilterLocalStorageRepository } from '@/shared/rolesFilter/localstorage';
import type { RolesFilterStateRepository } from '@/shared/rolesFilter/state';

export type LandingService = {
  saveRolesFilter({ rolesFilter }: { rolesFilter: RolesFilterCategory }): void;
  saveIsFilterDropdownOpen({
    isFilterDropdownOpen,
  }: {
    isFilterDropdownOpen: boolean;
  }): void;
};

export const implLandingService = ({
  rolesFilterStateRepository,
  rolesFilterLocalStorageRepository,
}: {
  rolesFilterStateRepository: RolesFilterStateRepository;
  rolesFilterLocalStorageRepository: RolesFilterLocalStorageRepository;
}): LandingService => ({
  saveRolesFilter: ({ rolesFilter }) => {
    rolesFilterStateRepository.setActiveJobCategory({
      activeCategory: rolesFilter,
    });

    rolesFilterLocalStorageRepository.setActiveJobCategory({
      activeCategory: rolesFilter,
    });
  },
  saveIsFilterDropdownOpen: ({ isFilterDropdownOpen }) => {
    rolesFilterStateRepository.setIsFilterDropdownOpen({
      isFilterDropdownOpen,
    });
    rolesFilterLocalStorageRepository.setIsFilterDropdownOpen({
      isFilterDropdownOpen,
    });
  },
});
