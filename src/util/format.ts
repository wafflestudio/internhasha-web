export const formatNumberToTime = ({ time }: { time: number }) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
};

export const formatIsoToDate = (isoString: string) => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

export const formatMajorJobToLabel = (input: string) => {
  switch (input) {
    case 'DEVELOPMENT':
      return '개발';
    case 'PLANNER':
      return '기획';
    case 'DESIGN':
      return '디자인';
    case 'MARKETING':
      return '마케팅';
    default:
      return '';
  }
};

export const formatMinorJobToLabel = (input: string) => {
  switch (input) {
    case 'FRONT':
      return '프론트엔드 개발';
    case 'BACKEND':
      return '백엔드 개발';
    case 'APP':
      return '앱 개발';
    case 'DATA':
      return '데이터 분석';
    case 'OTHERS':
      return '기타';
    case 'PLANNER':
      return '기획';
    case 'DESIGN':
      return '디자인';
    case 'MARKETING':
      return '마케팅';
    default:
      return '';
  }
};

export const formatDomainToLabel = (input: string) => {
  switch (input) {
    case 'FINTECH':
      return '핀테크';
    case 'HEALTHTECH':
      return '헬스테크';
    case 'EDUCATION':
      return '교육';
    case 'ECOMMERCE':
      return '이커머스';
    case 'FOODTECH':
      return '식품';
    case 'MOBILITY':
      return '모빌리티';
    case 'CONTENTS':
      return '컨텐츠';
    case 'B2B':
      return 'B2B';
    case 'OTHERS':
      return '기타';
    default:
      return '';
  }
};
