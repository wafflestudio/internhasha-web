const ERROR_MESSAGE_MAP = {
  USER_001: '동일한 스누 메일으로 가입한 유저가 이미 존재합니다.',
  USER_002: '동일한 ID로 가입한 유저가 이미 존재합니다.',
  USER_003: '동일한 구글 계정으로 가입한 유저가 이미 존재합니다.',
  USER_004: '고객님의 정보를 찾을 수 없습니다.',
  USER_005: '접근할 수 없는 페이지입니다.',
  USER_006: '회원가입 추가에 실패했습니다. 잠시 후 다시 시도해주세요.',

  AUTH_003: '인증 정보가 만료되었습니다. 다시 로그인한 뒤 시행해주세요.',
  AUTH_004: '인증 정보가 만료되었습니다. 다시 로그인한 뒤 시행해주세요.',
  AUTH_007: '해당 요청에 대한 권한이 없습니다. 다시 로그인한 뒤 시행해주세요.',

  EMAIL_001: '유효하지 않은 이메일입니다.',
  EMAIL_002: '잘못된 이메일 인증 코드를 입력하였습니다.',
  EMAIL_003: '유효한 스누메일이 아닙니다.',

  GEN_001: '예상하지 못한 에러가 발생했습니다. 잠시 후 다시 시도해주세요.',
  GEN_002: '아직 구현되지 않은 요청입니다.',
  GEN_003: '유효하지 않은 요청이 포함되어 있습니다.',
  GEN_004: '유효하지 않은 값이 포함되어 있습니다.',
  GEN_005: '작성한 폼이 유효하지 않습니다.',
};

const ERRORS = Object.keys(ERROR_MESSAGE_MAP);

type Errors = keyof typeof ERROR_MESSAGE_MAP;

export const createErrorMessage = (error: string) => {
  if (ERRORS.includes(error)) {
    return ERROR_MESSAGE_MAP[error as Errors];
  }
  return '에러가 발생하였습니다. 잠시 후 다시 시도해주세요.';
};
