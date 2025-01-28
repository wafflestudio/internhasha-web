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

export const formatDate = (dateString: string | undefined): string => {
  if (dateString === undefined) return '';
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

export const calculateDDay = (dateString: string | undefined): number => {
  if (dateString === undefined) return 0;
  const today = new Date(); // 현재 날짜
  const targetDate = new Date(dateString);
  const diffTime = targetDate.getTime() - today.getTime(); // 밀리초 단위 차이 계산
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // 일 단위로 변환
};
