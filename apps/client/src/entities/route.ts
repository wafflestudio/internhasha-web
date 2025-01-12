export const PATH = {
  INDEX: '/',
  POST: '/post/:postId',
  ECHO: '/echo',
  SIGN_IN_SELECT: '/signin',
  SIGN_UP_SELECT: '/signup',
  SIGN_UP_LOCAL: '/signup/local',
  SIGN_UP_COMPLETE: '/signup/complete',
  VERIFY_EMAIL: '/verify-email',
  MY_PAGE: '/mypage',
};

export const HREF = {
  POST: (postId: string) => `/post/${postId}`,
};
