import { useRouteNavigation } from '../hooks/useRouteNavigation';
export const LandingPage = () => {
  const navigation = useRouteNavigation();
  const { toSurveyList } = navigation;
  return (
    <div>
      <p>랜딩 페이지입니다.</p>
      <button onClick={toSurveyList}>설문조사 보러 가기</button>
    </div>
  );
};
