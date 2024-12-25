export const PATH = {
  INDEX: '/',
  SURVEY_LIST: '/survey',
  SURVEY_DETAIL: '/survey/:surveyId',
  ADMIN: '/admin',
  CREATE: {
    SURVEY_DETAIL: ({ surveyId }: { surveyId: string }) =>
      `/survey/${surveyId}`,
  },
};
