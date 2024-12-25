import { TitleHeader } from '../components/header';
import { Layout, MainLayout } from '../components/layout';
import { useRouteNavigation } from '../hooks/useRouteNavigation';
import { mockSurveys } from '../mocks/surveys';

type Survey = {
  id: string;
  title: string;
  writer: string;
  reward: string;
  time: string;
  contents: string;
  winners: string[];
};

export const SurveyListPage = () => {
  const navigation = useRouteNavigation();
  const { toSurveyDetail } = navigation;
  const onClickSurvey = ({ surveyId }: { surveyId: string }) => {
    toSurveyDetail({ surveyId });
  };

  const FinishedSurvey = ({ survey }: { survey: Survey }) => {
    return (
      <div
        key={`survey-${survey.id}`}
        onClick={() => {
          onClickSurvey({ surveyId: survey.id });
        }}
        className="flex flex-col gap-2 p-4 rounded border-b hover:bg-gray-200"
      >
        <div className="flex gap-2">
          <span className="text-xs p-1 rounded bg-red text-white">종료</span>
          <span className="flex-1 overflow-hidden whitespace-nowrap text-ellipsis">
            {survey.title}
          </span>
        </div>
        <div className="flex flex-col gap-1 text-sm text-gray-400">
          <span>{survey.reward}</span>
          <div className="flex flex-wrap gap-x-2 text-sm">
            <span className="text-sm">당첨자: </span>
            {survey.winners.map((item, index) => {
              const displayEmail = item.substring(0, 4);
              return (
                <span key={`${survey.id}-${index}`}>{displayEmail}****</span>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const UnfinishedSurvey = ({ survey }: { survey: Survey }) => {
    return (
      <div
        key={`survey-${survey.id}`}
        onClick={() => {
          onClickSurvey({ surveyId: survey.id });
        }}
        className="flex flex-col gap-2 p-4 rounded border-b hover:bg-gray-200"
      >
        <div className="flex gap-2">
          <span className="text-xs p-1 rounded bg-green text-white font-bold">
            진행 중
          </span>
          <span>{survey.title}</span>
        </div>
        <div className="flex flex-col gap-1 text-sm text-gray-400">
          <span>{survey.reward}</span>
          <span>예상 소요 시간: {survey.time}</span>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <TitleHeader title="📝 설문조사 목록" />
      <MainLayout>
        {mockSurveys.map((item) => {
          if (item.winners.length === 0) {
            return <UnfinishedSurvey key={item.id} survey={item} />;
          }

          return <FinishedSurvey key={item.id} survey={item} />;
        })}
      </MainLayout>
    </Layout>
  );
};
