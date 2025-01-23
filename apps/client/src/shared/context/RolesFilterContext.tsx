const LOCAL_STORAGE_ACTIVE_CAEGORY_KEY = 'active-category';
const LOCAL_STORAGE_IS_FILTER_DROPDOWN_KEY = 'is-filler-dropdown';

import { createContext, useEffect, useState } from 'react';

type RolesFilterStorageRepository = {
  setActiveJobCategory: ({
    activeCategory,
  }: {
    activeCategory: string;
  }) => void;
  getActiveJobCategory: () => string | null;
  removeActiveJobCategory: () => void;
  setIsFilterDropdownOpen: ({
    isFilterDropdownOpen,
  }: {
    isFilterDropdownOpen: boolean;
  }) => void;
  getIsFilterDropdownOpen: () => boolean;
  removeIsFilterDropdownOpen: () => void;
};

type RolesFilterContext = {
  activeCategory: '개발' | '기획' | '디자인' | '마케팅' | null;
  setActiveCategory: React.Dispatch<
    React.SetStateAction<'개발' | '기획' | '디자인' | '마케팅' | null>
  >;
  isFilterDropdownOpen: boolean;
  setIsFilterDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const implRolesFilterStorageRepository = (): RolesFilterStorageRepository => ({
  setActiveJobCategory: ({ activeCategory }) => {
    localStorage.setItem(LOCAL_STORAGE_ACTIVE_CAEGORY_KEY, activeCategory);
  },
  getActiveJobCategory: () => {
    return localStorage.getItem(LOCAL_STORAGE_ACTIVE_CAEGORY_KEY);
  },
  removeActiveJobCategory: () => {
    localStorage.removeItem(LOCAL_STORAGE_ACTIVE_CAEGORY_KEY);
  },
  setIsFilterDropdownOpen: ({ isFilterDropdownOpen }) => {
    localStorage.setItem(
      LOCAL_STORAGE_IS_FILTER_DROPDOWN_KEY,
      JSON.stringify(isFilterDropdownOpen),
    );
  },
  getIsFilterDropdownOpen: () => {
    return (
      localStorage.getItem(LOCAL_STORAGE_IS_FILTER_DROPDOWN_KEY) === 'true'
    );
  },
  removeIsFilterDropdownOpen: () => {
    localStorage.removeItem(LOCAL_STORAGE_IS_FILTER_DROPDOWN_KEY);
  },
});

export const RolesFilterContext = createContext<RolesFilterContext | null>(
  null,
);

export const RolesFilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const rolesFilterLocalStorage = implRolesFilterStorageRepository();

  const [activeCategory, setActiveCategory] = useState<
    '개발' | '기획' | '디자인' | '마케팅' | null
  >(null);

  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(
    rolesFilterLocalStorage.getIsFilterDropdownOpen,
  );

  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_IS_FILTER_DROPDOWN_KEY,
      JSON.stringify(isFilterDropdownOpen),
    );
  }, [isFilterDropdownOpen]);

  useEffect(() => {
    if (activeCategory != null) {
      localStorage.setItem(LOCAL_STORAGE_ACTIVE_CAEGORY_KEY, activeCategory);
    } else {
      localStorage.removeItem(LOCAL_STORAGE_ACTIVE_CAEGORY_KEY);
    }
  }, [activeCategory]);

  return (
    <RolesFilterContext.Provider
      value={{
        activeCategory,
        setActiveCategory,
        isFilterDropdownOpen,
        setIsFilterDropdownOpen,
      }}
    >
      {children}
    </RolesFilterContext.Provider>
  );
};
