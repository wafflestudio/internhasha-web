import { useQuery } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';

import { ICON_SRC } from '@/entities/asset.ts';
import { getFormatDate } from '@/feature/post/ui/postFormatFunctions.ts';
import { EnvContext } from '@/shared/context/EnvContext.ts';
import { SkeletonResumeDetailView } from '@/feature/resume/ui/SkeletonResumeDetailView.tsx';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';
import { useRouteNavigation } from '@/shared/route/useRouteNavigation.ts';

export const ResumeDetailView = ({ resumeId }: { resumeId: string }) => {
  const { resumeDetailData } = useGetResumeDetail({ resumeId });
  const { API_BASE_URL } = useGuardContext(EnvContext);
  const { toMyPage } = useRouteNavigation();

  if (resumeDetailData === undefined) {
    return <SkeletonResumeDetailView />;
  }

  if (resumeDetailData.type === 'error') {
    return (
      <div>정보를 불러오는 중 문제가 발생하였습니다. 새로고침해주세요.</div>
    );
  }

  const resumeDetail = resumeDetailData.data;

  console.log(resumeDetail);

  return (
    <div className="flex w-full py-10 bg-gray-50">
      {/* Left Section */}
      <div className="xs:w-3/5 w-11/12 mx-auto bg-white rounded-lg p-8 space-y-6">
        <div>
          <span className="text-black text-3xl font-bold content-center text-center">
            커피챗 신청서
          </span>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-gray-200 pb-5">
          {/* Profile Section */}
          <div className="flex gap-4 items-center">
            <div className="w-[40px] h-[40px] overflow-hidden">
              {resumeDetail.author.profileImageLink != null ? (
                <img
                  src={`${API_BASE_URL}/${resumeDetail.author.profileImageLink}`}
                  alt="프로필 이미지"
                  className="w-[40px] h-[40px] object-cover border border-gray-200"
                />
              ) : (
                <div className="w-[40px] h-[40px] object-cover border border-gray-200"></div>
              )}
            </div>
            <div>
              <p className="text-gray-900 text-lg font-semibold align-center">
                {resumeDetail.companyName}
              </p>
            </div>
          </div>
          <span className="text-gray-400 text-lg font-semibold my-auto">
            {getFormatDate(resumeDetail.createdAt)}
          </span>
        </div>

        {/* Content Section */}
        <div className="py-6 space-y-5">
          <p className="flex gap-2 text-gray-700 text-sm">
            <img src={ICON_SRC.CALL} className="w-[20px] h-[20px]" />
            <span>{resumeDetail.phoneNumber}</span>
          </p>
          <p className="text-gray-700 text-sm">{resumeDetail.content}</p>
        </div>
        <Button variant="secondary" onClick={toMyPage} className="w-full mt-20">
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
