import { useQuery } from '@tanstack/react-query';

import { Skeleton } from '@/components/ui/skeleton';
import { getFormatDate } from '@/feature/post/ui/postFormatFunctions.ts';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation';

export const ResumeListView = () => {
  const { resumeListData } = useGetResumeList();
  const { toResumeDetail } = useRouteNavigation();

  if (resumeListData?.type === 'error') {
    return (
      <div>정보를 불러오는 중 문제가 발생하였습니다. 새로고침해주세요.</div>
    );
  }

  return (
    <div className="flex flex-col w-full gap-3">
      {resumeListData !== undefined ? (
        resumeListData.data.resumeList.map((resume) => (
          <div
            key={resume.id}
            className="flex px-[24px] h-[50px] justify-between items-center cursor-pointer bg-white rounded-md duration-300 hover:shadow-md"
            onClick={() => {
              toResumeDetail({ resumeId: resume.id });
            }}
          >
            <span className="w-[350px] text-grey-darker font-semibold truncate">
              {resume.companyName}
            </span>
            <span className="text-sm text-grey-normal">
              {getFormatDate(resume.createdAt)}
            </span>
          </div>
        ))
      ) : (
        <>
          {Array.from({ length: 12 }).map((_, idx) => (
            <div
              key={`loading-${idx}`}
              className="flex px-[24px] h-[50px] justify-between items-center cursor-pointer bg-white rounded-md"
            >
              <Skeleton className="w-[350px] h-[18px]" />
              <Skeleton className="w-[80px] h-6" />
            </div>
          ))}
        </>
      )}
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
