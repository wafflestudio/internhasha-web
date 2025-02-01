import { useQuery } from '@tanstack/react-query';

import { ICON_SRC } from '@/entities/asset';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation.ts';
import { getFormatDate } from '@/util/postFormatFunctions.ts';

export const ResumeListView = () => {
  const { resumeListData } = useGetResumeList();
  const { toResumeDetail } = useRouteNavigation();

  if (resumeListData === undefined) {
    return <div>로딩중...</div>;
  }

  if (resumeListData.type === 'error') {
    return (
      <div>정보를 불러오는 중 문제가 발생하였습니다. 새로고침해주세요.</div>
    );
  }

  const { resumeList } = resumeListData.data;

  return (
    <div className="flex flex-col w-full gap-3">
      {resumeList.map((resume) => (
        <div
          key={resume.id}
          className="flex w-full px-[24px] py-[10px] justify-between cursor-pointer hover:shadow-md"
          onClick={() => {
            toResumeDetail({ resumeId: resume.id });
          }}
        >
          <div className="flex gap-[18px]">
            <img src={ICON_SRC.BOOKMARK.SELECTED} />
            <span className="text-grey-darker">{resume.positionTitle}</span>
          </div>
          <div className="flex gap-[18px]">
            <span className="text-grey-darker">{resume.companyName}</span>
            <span className="px-2 py-1 bg-grey-darker text-white text-sm">
              {getFormatDate(resume.createdAt)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

const useGetResumeList = () => {
  const { token } = useGuardContext(TokenContext);
  const { resumeService } = useGuardContext(ServiceContext);

  const { data: resumeListData } = useQuery({
    queryKey: ['resumeService', 'getResumeList', token] as const,
    queryFn: ({ queryKey: [, , t] }) => {
      if (t === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      return resumeService.getResumeList({ token: t });
    },
    enabled: token !== null,
  });

  return { resumeListData };
};
