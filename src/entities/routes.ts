export const PATH = {
  SURVEY_LIST: '/',
  SURVEY_DETAIL: '/survey/:surveyId',
  CREATE: {
    SURVEY_DETAIL: ({ surveyId }: { surveyId: string }) =>
      `/survey/${surveyId}`,
  },
};
