import { useQuery } from '@tanstack/react-query';

import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { getFormatDate } from '@/util/postFormatFunctions.ts';
import { Button } from '@/components/ui/button';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation.ts';

export const ResumeDetailView = ({ resumeId }: { resumeId: string }) => {
  const { resumeDetailData } = useGetResumeDetail({ resumeId });
  const { toMyPage } = useRouteNavigation()


  if (resumeDetailData === undefined) {
    return <div>로딩중...</div>;
  }

  if (resumeDetailData.type === 'error') {
    return (
      <div>정보를 불러오는 중 문제가 발생하였습니다. 새로고침해주세요.</div>
    );
  }

  const resumeDetail = resumeDetailData.data;

  return (
    <div className="flex w-full py-10 bg-gray-50">
      {/* Left Section */}
      <div className="w-3/5 mx-auto bg-white rounded-lg p-8 space-y-6">
        <span className="text-black text-4xl font-bold">커피챗 신청서</span>
        <div className="flex justify-between items-start gap-4 border-b border-gray-200 pb-5">
          {/* Profile Section */}
          <div className="flex items-center gap-4">
            <img
              src={resumeDetail.author.profileImageLink}
              alt="프로필 이미지"
              className="w-12 h-12 object-cover rounded-full border border-gray-200"
            />
            <div>
              <p className="text-gray-900 text-xl font-semibold">
                {resumeDetail.companyName}
              </p>
              <p className="text-gray-500 text-sm">
                {resumeDetail.author.name}
              </p>
            </div>
          </div>
          {/* TODO title 데이터 들어오면 '타이틀' 없애기*/}
          <span className="text-gray-400 text-xl my-auto">
            {getFormatDate(resumeDetail.createdAt)}
          </span>
        </div>

        {/* Content Section */}
        <div className="py-6 space-y-5">
          <p className="text-gray-700 text-lg">📞 {resumeDetail.phoneNumber}</p>
          <p className="text-gray-700 text-lg">{resumeDetail.content}</p>
        </div>
        <Button variant="outline" onClick={toMyPage} className="w-full mt-20">
          목록으로
        </Button>
      </div>
    </div>
  );
};

const useGetResumeDetail = ({ resumeId }: { resumeId: string }) => {
  const { token } = useGuardContext(TokenContext);
  const { resumeService } = useGuardContext(ServiceContext);

  const { data: resumeDetailData } = useQuery({
    queryKey: ['user', 'resume', token] as const,
    queryFn: ({ queryKey: [, , t] }) => {
      if (t === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      return resumeService.getResumeDetail({ token: t, resumeId: resumeId });
    },
    enabled: token !== null,
  });

  return { resumeDetailData: resumeDetailData };
};
