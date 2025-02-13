export const formatNumberToTime = ({ time }: { time: number }) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
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
      return null;
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
      return null;
  }
};
