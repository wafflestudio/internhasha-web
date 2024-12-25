import { useNavigate } from 'react-router-dom';

import { PATH } from '../entities/routes';

export const useRouteNavigation = () => {
  const navigate = useNavigate();
  const { SURVEY_LIST } = PATH;
  const CREATE = PATH.CREATE;

  return {
    toSurveyList: () => {
      void navigate(SURVEY_LIST, { replace: true });
    },
    toSurveyDetail: ({ surveyId }: { surveyId: string }) => {
      void navigate(CREATE.SURVEY_DETAIL({ surveyId }), { replace: true });
    },
  };
};
