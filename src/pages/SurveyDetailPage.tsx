import { useParams } from 'react-router-dom';

import { NavigationHeader } from '../components/header/NavigationHeader';
import { useRouteNavigation } from '../hooks/useRouteNavigation';
import { mockSurveys } from '../mocks/surveys';

export const SurveyDetailPage = () => {
  const navigation = useRouteNavigation();
  const { surveyId } = useParams();
  const { toSurveyList } = navigation;
  const mockSurvey = mockSurveys.find((survey) => survey.id === surveyId);

  if (mockSurvey === undefined) {
    return (
      <div>
        <NavigationHeader title="설문조사 상세 페이지" to={toSurveyList} />
        <p>존재하지 않는 설문조사입니다.</p>
      </div>
    );
  }

  return (
    <div>
      <NavigationHeader title="설문조사 상세 페이지" to={toSurveyList} />
      <p>{mockSurvey.title}</p>
      <p>{mockSurvey.writer}</p>
      <p>{mockSurvey.contents}</p>
      <a href={mockSurvey.link} target="_blank" rel="noreferrer">
        설문조사 이동하기
      </a>
    </div>
  );
};
