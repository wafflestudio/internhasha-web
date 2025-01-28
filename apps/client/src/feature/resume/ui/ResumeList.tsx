import { useQuery } from '@tanstack/react-query';

import { Button } from '@/components/button';
import { Card } from '@/components/card/card.tsx';
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
    <div>
      <div className="max-w-screen-lg">
        <div className="space-y-4 w-3/5">
          {resumeList.map((resume) => (
            <Card key={resume.id} className="">
              <Button
                onClick={() => {
                  toResumeDetail({ resumeId: resume.id });
                }}
                className="flex justify-between w-full h-full p-5"
              >
                <span>{resume.companyName}</span>
                <span className="text-gray-400">
                  {getFormatDate(resume.createdAt)}
                </span>
              </Button>
            </Card>
          ))}
        </div>
      </div>
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
