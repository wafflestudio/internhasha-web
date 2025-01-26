import { useQuery } from '@tanstack/react-query';

import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';

export const ResumeListView = () => {
  const { resumeListData } = useGetResumeList();

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
      <div className="max-w-screen-lg mx-auto px-4 py-10">
        <ul className="mt-6 space-y-4">
          {resumeList.map((resume) => (
            <li
              key={resume.id}
              className="flex justify-between items-center p-4 bg-white shadow rounded-lg"
            >
              <p>{resume.content}</p>
              <p>{resume.author.name}</p>
              <p>{resume.phoneNumber}</p>
              <p>{resume.createdAt}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const useGetResumeList = () => {
  const { token } = useGuardContext(TokenContext);
  const { resumeService } = useGuardContext(ServiceContext);

  const { data: resumeListData } = useQuery({
    queryKey: ['user', 'resume', 'post', token] as const,
    queryFn: ({ queryKey: [, , , t] }) => {
      if (t === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      return resumeService.getResumeList({ token: t });
    },
    enabled: token !== null,
  });

  return { resumeListData };
};
