import { NavigationHeader } from '../components/header/NavigationHeader';
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
  const { toSurveyDetail, toMain } = navigation;
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
        style={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '10px',
          margin: '10px 0',
          cursor: 'pointer',
        }}
      >
        <p>{survey.title}</p>
        <p>{survey.writer}</p>
        <p>{survey.reward}</p>
        <p>종료</p>
        {survey.winners.map((item, index) => (
          <p key={`${survey.id}-${index}`}>{item}</p>
        ))}
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
        style={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '10px',
          margin: '10px 0',
          cursor: 'pointer',
        }}
      >
        <p>{survey.title}</p>
        <p>{survey.writer}</p>
        <p>{survey.reward}</p>
        <p>진행 중</p>
        <p>예상 소요 시간: {survey.time}</p>
      </div>
    );
  };

  return (
    <div>
      <NavigationHeader title="설문조사 목록" to={toMain} />
      {mockSurveys.map((item) => {
        if (item.winners.length === 0) {
          return <UnfinishedSurvey key={item.id} survey={item} />;
        }

        return <FinishedSurvey key={item.id} survey={item} />;
      })}
    </div>
  );
};
