import { useParams } from 'react-router-dom';

import { NavigationHeader } from '../components/header';
import { Layout, MainLayout } from '../components/layout';
import { useRouteNavigation } from '../hooks/useRouteNavigation';
import { mockSurveys } from '../mocks/surveys';

export const SurveyDetailPage = () => {
  const navigation = useRouteNavigation();
  const { surveyId } = useParams();
  const { toSurveyList } = navigation;
  const mockSurvey = mockSurveys.find((survey) => survey.id === surveyId);

  if (mockSurvey === undefined) {
    return (
      <Layout>
        <NavigationHeader title="🔍 설문조사 상세 페이지" to={toSurveyList} />
        <MainLayout>
          <p>존재하지 않는 설문조사입니다.</p>
        </MainLayout>
      </Layout>
    );
  }

  return (
    <Layout>
      <NavigationHeader title="🔍 설문조사 상세 페이지" to={toSurveyList} />
      <MainLayout>
        <div className="flex flex-col py-2 gap-3 border-b">
          <div className="flex flex-col gap-2">
            {mockSurvey.winners.length === 0 ? (
              <span className="text-xs w-fit p-1 rounded bg-green text-white font-bold">
                진행 중
              </span>
            ) : (
              <span className="text-xs w-fit p-1 rounded bg-red text-white ">
                종료
              </span>
            )}
            <span className="text-lg font-bold">{mockSurvey.title}</span>
          </div>
          <div className="flex gap-2 items-center text-gray-500">
            <span>담당자 {mockSurvey.writer}</span>
            <span className="text-gray-300">|</span>
            <span>{mockSurvey.time} 설문</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold">✨ 어떤 보상을 받나요?</span>
            <span>{mockSurvey.reward}</span>
          </div>
          <a
            href="https://forms.gle/64UkrJpRHHLdJQwi9"
            target="_blank"
            rel="noreferrer"
            className="flex justify-center p-2 rounded bg-blue text-white font-bold"
          >
            설문조사 이동하기
          </a>
        </div>

        <p className="flex flex-col py-4">
          {mockSurvey.contents.split('\n').map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </p>
      </MainLayout>
    </Layout>
  );
};
