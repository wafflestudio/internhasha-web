import { useState } from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import { ICON_SRC } from '@/entities/asset';
import type { JobMinorCategory, PostFilter } from '@/entities/post';
import { formatMinorJobToLabel } from '@/util/format';

type RolesFilterProps = {
  postFilter: PostFilter;
  onChangeRoles: (roles: JobMinorCategory[]) => void;
};

type DropdownOption =
  | 'DEVELOPMENT'
  | 'PLANNER'
  | 'DESIGN'
  | 'MARKETING'
  | 'HUMANRESOURCE'
  | 'NONE';

const jobCategoryList: {
  label: string;
  type: DropdownOption;
  jobs: JobMinorCategory[];
}[] = [
  {
    label: '개발',
    type: 'DEVELOPMENT',
    jobs: ['FRONT', 'APP', 'BACKEND', 'DATA', 'AI', 'GAME', 'OTHERS'],
  },
  {
    label: '기획',
    type: 'PLANNER',
    jobs: ['PLANNER'],
  },
  {
    label: '디자인',
    type: 'DESIGN',
    jobs: ['DESIGN'],
  },
  {
    label: '마케팅',
    type: 'MARKETING',
    jobs: ['MARKETING'],
  },
  {
    label: '인사/HR',
    type: 'HUMANRESOURCE',
    jobs: ['HUMANRESOURCE'],
  },
];

export const RolesFilter = ({
  postFilter,
  onChangeRoles,
}: RolesFilterProps) => {
  const roles = postFilter.roles !== undefined ? postFilter.roles : [];
  const [activeCategory, setActiveCategory] = useState<DropdownOption>('NONE');
  const isAllSelected = (category: DropdownOption) => {
    const selectedCategory = jobCategoryList.find(
      (item) => item.type === category,
    );

    if (selectedCategory === undefined) {
      return false;
    }

    return selectedCategory.jobs.every((role) => roles.includes(role));
  };

  const handleSelectAll = (category: DropdownOption, checked: boolean) => {
    const selectedCategory = jobCategoryList.find(
      (item) => item.type === category,
    );
    if (selectedCategory === undefined) {
      return;
    }

    const checkedCategory = [...selectedCategory.jobs] as JobMinorCategory[];

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

  const handleClickDropdown = ({ category }: { category: DropdownOption }) => {
    setActiveCategory(category);
  };

  return (
    <div className="w-[220px] rounded-lg p-2">
      <div className="flex flex-col gap-2.5">
        {jobCategoryList.map((jobCategory) => {
          const allSelected = isAllSelected(jobCategory.type);

          return (
            <div key={jobCategory.type}>
              {/* 직무 제목 */}
              <div
                className={`flex cursor-pointer items-center justify-between rounded-lg px-5 py-2.5 transition-colors duration-300 ${activeCategory === jobCategory.type ? 'bg-white' : ''} hover:bg-grey-200`}
                onClick={() => {
                  handleClickDropdown({ category: jobCategory.type });
                }}
              >
                <span className="text-lg font-bold text-grey-900">
                  {jobCategory.label}
                </span>
              </div>

              {/* 세부 카테고리 (체크박스) */}
              <div
                className={`mt-2 flex flex-col gap-3 overflow-hidden pl-4 transition-all duration-300 ease-in-out ${
                  activeCategory === jobCategory.type
                    ? 'opcity-100 h-full'
                    : 'max-h-0 opacity-0'
                }`}
              >
                {/* 전체 선택 체크박스 */}
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={`select-all-${jobCategory.type}`}
                    checked={allSelected}
                    onCheckedChange={(checked) => {
                      if (checked === false || checked === true) {
                        handleSelectAll(jobCategory.type, checked);
                      }
                    }}
                  />
                  <label
                    htmlFor={`select-all-${jobCategory.type}`}
                    className="transition-color cursor-pointer font-semibold text-grey-900 duration-200 hover:text-blue-300"
                  >
                    전체 선택
                  </label>
                </div>
                {jobCategory.jobs.map((role) => (
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
  postFilter,
  onChangeRoles,
}: RolesFilterProps) => {
  const roles = postFilter.roles !== undefined ? postFilter.roles : [];
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const isAllSelected = (category: DropdownOption) => {
    const selectedCategory = jobCategoryList.find(
      (item) => item.type === category,
    );

    if (selectedCategory === undefined) {
      return false;
    }

    return selectedCategory.jobs.every((role) => roles.includes(role));
  };

  const handleSelectAll = (category: DropdownOption, checked: boolean) => {
    const selectedCategory = jobCategoryList.find(
      (item) => item.type === category,
    );
    if (selectedCategory === undefined) {
      return;
    }

    const updatedRoles = checked
      ? [...new Set([...roles, ...selectedCategory.jobs])]
      : roles.filter((role) => !selectedCategory.jobs.includes(role));

    onChangeRoles(updatedRoles);
  };

  const handleCheckboxChange = (role: JobMinorCategory, checked: boolean) => {
    const updatedRoles = checked
      ? [...roles, role]
      : roles.filter((r) => r !== role);
    onChangeRoles(updatedRoles);
  };

  const handleClickDropdown = () => {
    setIsFilterDropdownOpen((prevState) => !prevState);
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
        {jobCategoryList.map((jobCategory, index) => {
          const allSelected = isAllSelected(jobCategory.type);

          return (
            <div
              key={jobCategory.type}
              className={`pb-4 ${
                index !== Object.keys(jobCategoryList).length - 1
                  ? 'border-b border-grey-200'
                  : ''
              }`}
            >
              {/* 직무 제목 */}
              <div className="flex cursor-pointer items-center justify-between rounded-lg px-6 py-3">
                <span className="text-md font-bold text-grey-900">
                  {jobCategory.type}
                </span>
              </div>

              {/* 세부 카테고리 (체크박스) */}
              <div>
                <div className="mt-2 flex flex-col gap-3 pl-4">
                  {/* 전체 선택 체크박스 */}
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={`select-all-${jobCategory.type}`}
                      checked={allSelected}
                      onCheckedChange={(checked) => {
                        if (checked === false || checked === true) {
                          handleSelectAll(jobCategory.type, checked);
                        }
                      }}
                    />
                    <label
                      htmlFor={`select-all-${jobCategory.type}`}
                      className="transition-color cursor-pointer font-semibold text-grey-900 duration-200 hover:text-blue-300"
                    >
                      전체 선택
                    </label>
                  </div>
                  {jobCategory.jobs.map((job) => (
                    <div key={job} className="flex items-center gap-2">
                      <Checkbox
                        id={job}
                        checked={roles.includes(job)}
                        onCheckedChange={(checked) => {
                          if (checked === false || checked === true) {
                            handleCheckboxChange(job, checked);
                          }
                        }}
                      />
                      <label
                        htmlFor={job}
                        className="transition-color cursor-pointer text-grey-900 duration-200 hover:text-blue-300"
                      >
                        {formatMinorJobToLabel(job)}
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
