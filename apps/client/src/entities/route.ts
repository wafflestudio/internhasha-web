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
  APPLY_COFFEE_CHAT: '/post/:postId/applyCoffeeChat',
  COFFEE_CHAT_LIST: '/coffee-chat-list',
  COFFEE_CHAT_DETAIL: '/coffee-chat-list/:resumeId',
};

export const HREF = {
  POST: (postId: string) => `/post/${postId}`,
  APPLY_COFFEE_CHAT: (postId: string) => `/post/${postId}/applyCoffeeChat`,
  COFFEE_CHAT_DETAIL: (resumeId: string) => `/resume/${resumeId}`,
};
