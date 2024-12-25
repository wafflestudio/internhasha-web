import { NavigationHeader } from '../components/header/NavigationHeader';
import { useRouteNavigation } from '../hooks/useRouteNavigation';
import { mockSurveys } from '../mocks/surveys';

export const SurveyListPage = () => {
  const navigation = useRouteNavigation();
  const { toSurveyDetail, toMain } = navigation;
  const onClickSurvey = ({ surveyId }: { surveyId: string }) => {
    toSurveyDetail({ surveyId });
  };

  return (
    <div>
      <NavigationHeader title="설문조사 목록" to={toMain} />
      {mockSurveys.map((item) => (
        <div
          key={item.id}
          onClick={() => {
            onClickSurvey({ surveyId: item.id });
          }}
          style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '10px',
            margin: '10px 0',
            cursor: 'pointer',
          }}
        >
          <p>{item.title}</p>
          <p>{item.contents}</p>
        </div>
      ))}
    </div>
  );
};
