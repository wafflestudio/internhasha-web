import { useNavigate } from 'react-router-dom';

import { PATH } from '../entities/routes';

export const useRouteNavigation = () => {
  const navigate = useNavigate();
  const { INDEX, SURVEY_LIST, ADMIN } = PATH;
  const CREATE = PATH.CREATE;

  return {
    toMain: () => {
      void navigate(INDEX, { replace: true });
    },
    toSurveyList: () => {
      void navigate(SURVEY_LIST, { replace: true });
    },
    toSurveyDetail: ({ surveyId }: { surveyId: string }) => {
      void navigate(CREATE.SURVEY_DETAIL({ surveyId }), { replace: true });
    },
    toAdmin: () => {
      void navigate(ADMIN, { replace: true });
    },
  };
};
