import { useEffect, useState } from 'react';

import type { JobMinorCategory } from '@/entities/post.ts';

type RolesFilterProps = {
  roles: JobMinorCategory[] | undefined;
  onChangeRoles: (roles: JobMinorCategory[]) => void;
}

const jobCategoryList = {
  개발: ['FRONT', 'APP', 'BACKEND', 'DATA', 'OTHERS'],
  기획: ['PLANNER'],
  디자인: ['DESIGN'],
  마케팅: ['MARKETING'],
} as const;

export const RolesFilter = ({ roles = [], onChangeRoles }: RolesFilterProps) => {

  // TODO 로컬 스토리지 로직 리팩토링하기
  const [activeCategory, setActiveCategory] = useState<keyof typeof jobCategoryList | null>(
    () => localStorage.getItem('activeCategory') as keyof typeof jobCategoryList | null
  );

  useEffect(() => {
    // activeCategory가 변경될 때 로컬 스토리지에 저장
    if (activeCategory != null) {
      localStorage.setItem('activeCategory', activeCategory);
    } else {
      localStorage.removeItem('activeCategory');
    }
  }, [activeCategory]);

  const handleCheckboxChange = (role: JobMinorCategory) => {
    const updatedRoles = roles.includes(role)
      ? roles.filter((r) => r !== role)
      : [...roles, role];
    onChangeRoles(updatedRoles);
  };

  const handleCategoryClick = (category: keyof typeof jobCategoryList) => {
    setActiveCategory((prev) => (prev === category ? null : category));
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
                  <span>{activeCategory === typedCategory ? '▲' : '▼'}</span>
                </div>

                {/* 세부 카테고리 (체크박스) */}
                {activeCategory === typedCategory && (
                  <div className="mt-2 space-y-2 pl-4">
                    {jobCategoryList[typedCategory].map(
                      (role) => (
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
                      ),
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
