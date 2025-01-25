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
    <div className="w-[220px] p-2 rounded-lg">
      <div className="flex flex-col gap-2.5">
        {Object.keys(jobCategoryList).map((category: string) => {
          const typedCategory = category as keyof typeof jobCategoryList;
          const allSelected = isAllSelected(typedCategory);

          return (
            <div key={typedCategory}>
              {/* 직무 제목 */}
              <div
                className={`flex justify-between items-center cursor-pointer transition-colors duration-300
                    px-5 py-2.5 rounded-lg ${activeCategory === typedCategory ? 'bg-white' : ''} hover:bg-grey-light-active`}
                onClick={() => {
                  handleCategoryClick(typedCategory);
                }}
              >
                <span className="text-lg font-bold text-gray-800">
                  {typedCategory}
                </span>
              </div>

              {/* 세부 카테고리 (체크박스) */}
              <div
                className={`flex flex-col gap-3 mt-2 pl-4 overflow-hidden transition-all duration-300 ease-in-out ${
                  activeCategory === typedCategory
                    ? 'h-full opcity-100'
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
                    className="text-grey-darker cursor-pointer hover:text-grey-dark-hover font-semibold"
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
                      className="text-grey-darker cursor-pointer hover:text-grey-dark-hover"
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
    <div className="block lg:hidden w-full p-2 rounded-lg">
      {/* 토글 드롭다운 */}
      <button
        onClick={handleClickDropdown}
        className="w-full flex justify-between items-center px-6 py-3 bg-white rounded-lg shadow-sm"
      >
        <span className="text-lg font-bold text-gray-800">직무 유형 선택</span>
        <img
          src={ICON_SRC.ARROW}
          className={`transition-all duration-300 ${isFilterDropdownOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* 드롭다운 내부 컨텐츠 */}
      <div
        className={`mt-2 bg-white rounded-lg shadow-sm p-4 transition-all duration-300 ease-in-out overflow-hidden ${
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
              <div className="">
                <div className="flex flex-col gap-3 mt-2 pl-4">
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
                      className="text-grey-darker cursor-pointer hover:text-grey-dark-hover font-semibold"
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
                        className="text-grey-darker cursor-pointer hover:text-grey-dark-hover"
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
