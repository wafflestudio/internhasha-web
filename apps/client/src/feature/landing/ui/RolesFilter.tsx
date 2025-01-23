import type { JobMinorCategory } from '@/entities/post.ts';
import { useGuardContext } from '@/shared/context/hooks.ts';
import { RolesFilterContext } from '@/shared/context/RolesFilterContext.tsx';

type RolesFilterProps = {
  roles: JobMinorCategory[] | undefined;
  onChangeRoles: (roles: JobMinorCategory[]) => void;
};

const jobCategoryList = {
  개발: ['FRONT', 'APP', 'BACKEND', 'DATA', 'OTHERS'],
  기획: ['PLANNER'],
  디자인: ['DESIGN'],
  마케팅: ['MARKETING'],
} as const;

export const RolesFilter = ({
  roles = [],
  onChangeRoles,
}: RolesFilterProps) => {
  const { activeCategory, setActiveCategory } =
    useGuardContext(RolesFilterContext);

  const handleCheckboxChange = (role: JobMinorCategory) => {
    const updatedRoles = roles.includes(role)
      ? roles.filter((r) => r !== role)
      : [...roles, role];
    onChangeRoles(updatedRoles);
  };

  const handleCategoryClick = (category: keyof typeof jobCategoryList) => {
    setActiveCategory((prev: '개발' | '기획' | '디자인' | '마케팅' | null) =>
      prev === category ? null : category,
    );
  };

  return (
    <div>
      <div className="w-60 p-2 rounded-lg">
        <div className="space-y-4">
          {Object.keys(jobCategoryList).map((category: string) => {
            const typedCategory = category as keyof typeof jobCategoryList;

            return (
              <div key={typedCategory}>
                {/* 직무 제목 */}
                <div
                  className={`flex justify-between items-center cursor-pointer
                    px-6 py-3 rounded-lg ${activeCategory === typedCategory ? 'bg-white' : ''}`}
                  onClick={() => {
                    handleCategoryClick(typedCategory);
                  }}
                >
                  <span className="text-lg font-bold text-gray-800">
                    {typedCategory}
                  </span>
                  <span>{activeCategory === typedCategory ? '▼' : ''}</span>
                </div>

                {/* 세부 카테고리 (체크박스) */}
                <div
                  className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
                    activeCategory === typedCategory
                      ? 'max-h-[500px]'
                      : 'max-h-0'
                  }`}
                >
                  <div className="mt-2 space-y-2 pl-4">
                    {jobCategoryList[typedCategory].map((role) => (
                      <div key={role}>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={roles.includes(role)}
                            onChange={() => {
                              handleCheckboxChange(role);
                            }}
                            className="form-checkbox h-4 w-4 text-blue-600"
                          />
                          <span className="text-gray-700">{role}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const NarrowRolesFilter = ({
  roles = [],
  onChangeRoles,
}: RolesFilterProps) => {
  const { isFilterDropdownOpen, setIsFilterDropdownOpen } =
    useGuardContext(RolesFilterContext);

  const handleCheckboxChange = (role: JobMinorCategory) => {
    const updatedRoles = roles.includes(role)
      ? roles.filter((r) => r !== role)
      : [...roles, role];
    onChangeRoles(updatedRoles);
  };

  return (
    <div className="block lg:hidden w-full p-2 rounded-lg">
      {/* Dropdown Toggle */}
      <button
        onClick={() => {
          setIsFilterDropdownOpen((prev) => !prev);
        }}
        className="w-full flex justify-between items-center px-6 py-3 bg-white rounded-lg shadow-sm"
      >
        <span className="text-lg font-bold text-gray-800">직무 유형 선택</span>
        <span>{isFilterDropdownOpen ? '▼' : '▲'}</span>
      </button>

      {/* Dropdown Content */}
      {isFilterDropdownOpen && (
        <div className="mt-2 bg-white rounded-lg shadow-sm p-4">
          {Object.keys(jobCategoryList).map((category: string, index) => {
            const typedCategory = category as keyof typeof jobCategoryList;

            return (
              <div
                key={typedCategory}
                className={`pb-4 ${
                  index !== Object.keys(jobCategoryList).length - 1
                    ? 'border-b border-gray-300'
                    : ''
                }`}
              >
                {/* 직무 제목 */}
                <div
                  className="flex justify-between items-center cursor-pointer
                      px-6 py-3 rounded-lg"
                >
                  <span className="text-md font-bold text-gray-800">
                    {typedCategory}
                  </span>
                </div>

                {/* 세부 카테고리 (체크박스) */}
                {
                  <div>
                    <ul className="mt-2 space-y-2 pl-4">
                      {jobCategoryList[typedCategory].map((role) => (
                        <li key={role}>
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={roles.includes(role)}
                              onChange={() => {
                                handleCheckboxChange(role);
                              }}
                              className="form-checkbox h-4 w-4 text-blue-600"
                            />
                            <span className="text-gray-700">{role}</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                }
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
