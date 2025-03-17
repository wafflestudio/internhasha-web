import { Checkbox } from '@/components/ui/checkbox';
import { ICON_SRC } from '@/entities/asset';
import type { RolesFilterCategory } from '@/entities/filter';
import type { JobMinorCategory } from '@/entities/post';
import { useGuardContext } from '@/shared/context/hooks';
import { RolesFilterContext } from '@/shared/context/RolesFilterContext';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { formatMinorJobToLabel } from '@/util/format';

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
  const { landingService } = useGuardContext(ServiceContext);
  const { activeCategory } = useGuardContext(RolesFilterContext);

  const isAllSelected = (category: keyof typeof jobCategoryList) => {
    return jobCategoryList[category].every((role) => roles.includes(role));
  };

  const handleSelectAll = (
    category: keyof typeof jobCategoryList,
    checked: boolean,
  ) => {
    const checkedCategory = [
      ...jobCategoryList[category],
    ] as JobMinorCategory[];

    const updatedRoles = checked
      ? [...new Set([...roles, ...checkedCategory])]
      : roles.filter((role) => !checkedCategory.includes(role));

    onChangeRoles(updatedRoles);
  };

  const handleCheckboxChange = (role: JobMinorCategory, checked: boolean) => {
    const updatedRoles = checked
      ? [...roles, role]
      : roles.filter((r) => r !== role);
    onChangeRoles(updatedRoles);
  };

  const handleCategoryClick = (category: RolesFilterCategory) => {
    landingService.saveRolesFilter({ rolesFilter: category });
  };

  return (
    <div className="w-[220px] rounded-lg p-2">
      <div className="flex flex-col gap-2.5">
        {Object.keys(jobCategoryList).map((category: string) => {
          const typedCategory = category as keyof typeof jobCategoryList;
          const allSelected = isAllSelected(typedCategory);

          return (
            <div key={typedCategory}>
              {/* 직무 제목 */}
              <div
                className={`flex cursor-pointer items-center justify-between rounded-lg px-5 py-2.5 transition-colors duration-300 ${activeCategory === typedCategory ? 'bg-white' : ''} hover:bg-grey-200`}
                onClick={() => {
                  handleCategoryClick(typedCategory);
                }}
              >
                <span className="text-lg font-bold text-grey-900">
                  {typedCategory}
                </span>
              </div>

              {/* 세부 카테고리 (체크박스) */}
              <div
                className={`mt-2 flex flex-col gap-3 overflow-hidden pl-4 transition-all duration-300 ease-in-out ${
                  activeCategory === typedCategory
                    ? 'opcity-100 h-full'
                    : 'max-h-0 opacity-0'
                }`}
              >
                {/* 전체 선택 체크박스 */}
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={`select-all-${typedCategory}`}
                    checked={allSelected}
                    onCheckedChange={(checked) => {
                      if (checked === false || checked === true) {
                        handleSelectAll(typedCategory, checked);
                      }
                    }}
                  />
                  <label
                    htmlFor={`select-all-${typedCategory}`}
                    className="transition-color cursor-pointer font-semibold text-grey-900 duration-200 hover:text-blue-300"
                  >
                    전체 선택
                  </label>
                </div>
                {jobCategoryList[typedCategory].map((role) => (
                  <div key={role} className="flex items-center gap-2">
                    <Checkbox
                      id={role}
                      checked={roles.includes(role)}
                      onCheckedChange={(checked) => {
                        if (checked === false || checked === true) {
                          handleCheckboxChange(role, checked);
                        }
                      }}
                    />
                    <label
                      htmlFor={role}
                      className="transition-color cursor-pointer text-grey-900 duration-200 hover:text-blue-300"
                    >
                      {formatMinorJobToLabel(role)}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const NarrowRolesFilter = ({
  roles = [],
  onChangeRoles,
}: RolesFilterProps) => {
  const { isFilterDropdownOpen } = useGuardContext(RolesFilterContext);
  const { landingService } = useGuardContext(ServiceContext);

  const isAllSelected = (category: keyof typeof jobCategoryList) => {
    return jobCategoryList[category].every((role) => roles.includes(role));
  };

  const handleSelectAll = (
    category: keyof typeof jobCategoryList,
    checked: boolean,
  ) => {
    const checkedCategory = [
      ...jobCategoryList[category],
    ] as JobMinorCategory[];

    const updatedRoles = checked
      ? [...new Set([...roles, ...checkedCategory])]
      : roles.filter((role) => !checkedCategory.includes(role));

    onChangeRoles(updatedRoles);
  };

  const handleCheckboxChange = (role: JobMinorCategory, checked: boolean) => {
    const updatedRoles = checked
      ? [...roles, role]
      : roles.filter((r) => r !== role);
    onChangeRoles(updatedRoles);
  };

  const handleClickDropdown = () => {
    landingService.saveIsFilterDropdownOpen({
      isFilterDropdownOpen: !isFilterDropdownOpen,
    });
  };

  return (
    <div className="block w-full rounded-lg p-2 lg:hidden">
      {/* 토글 드롭다운 */}
      <button
        onClick={handleClickDropdown}
        className="flex w-full items-center justify-between rounded-lg bg-white px-6 py-3 shadow-sm"
      >
        <span className="text-lg font-bold text-gray-800">직무 유형 선택</span>
        <img
          src={ICON_SRC.ARROW}
          className={`transition-all duration-300 ${isFilterDropdownOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* 드롭다운 내부 컨텐츠 */}
      <div
        className={`mt-2 overflow-hidden rounded-lg bg-white p-4 shadow-sm transition-all duration-300 ease-in-out ${
          isFilterDropdownOpen ? 'h-full opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {Object.keys(jobCategoryList).map((category: string, index) => {
          const typedCategory = category as keyof typeof jobCategoryList;
          const allSelected = isAllSelected(typedCategory);

          return (
            <div
              key={typedCategory}
              className={`pb-4 ${
                index !== Object.keys(jobCategoryList).length - 1
                  ? 'border-b border-grey-200'
                  : ''
              }`}
            >
              {/* 직무 제목 */}
              <div className="flex cursor-pointer items-center justify-between rounded-lg px-6 py-3">
                <span className="text-md font-bold text-grey-900">
                  {typedCategory}
                </span>
              </div>

              {/* 세부 카테고리 (체크박스) */}
              <div>
                <div className="mt-2 flex flex-col gap-3 pl-4">
                  {/* 전체 선택 체크박스 */}
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={`select-all-${typedCategory}`}
                      checked={allSelected}
                      onCheckedChange={(checked) => {
                        if (checked === false || checked === true) {
                          handleSelectAll(typedCategory, checked);
                        }
                      }}
                    />
                    <label
                      htmlFor={`select-all-${typedCategory}`}
                      className="transition-color cursor-pointer font-semibold text-grey-900 duration-200 hover:text-blue-300"
                    >
                      전체 선택
                    </label>
                  </div>
                  {jobCategoryList[typedCategory].map((role) => (
                    <div key={role} className="flex items-center gap-2">
                      <Checkbox
                        id={role}
                        checked={roles.includes(role)}
                        onCheckedChange={(checked) => {
                          if (checked === false || checked === true) {
                            handleCheckboxChange(role, checked);
                          }
                        }}
                      />
                      <label
                        htmlFor={role}
                        className="transition-color cursor-pointer text-grey-900 duration-200 hover:text-blue-300"
                      >
                        {formatMinorJobToLabel(role)}
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
  );
};
