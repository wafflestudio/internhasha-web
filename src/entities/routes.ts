export const PATH = {
  SURVEY_LIST: '/survey',
  SURVEY_DETAIL: '/survey/:surveyId',
  CREATE: {
    SURVEY_DETAIL: ({ surveyId }: { surveyId: string }) =>
      `/survey/${surveyId}`,
  },
};
