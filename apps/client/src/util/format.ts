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

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

export const calculateDDay = (dateString: string): number => {
  // 현재 날짜
  // 밀리초 단위 차이 계산
  return Math.ceil(
    (new Date(dateString).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24),
  ); // 일 단위로 변환
};

export const getEmploymentStatus = (employmentEndDate: string): string => {
  if (employmentEndDate === '') return '상시';

  const daysLeft = Math.ceil(
    (new Date(employmentEndDate).getTime() - new Date().getTime()) /
    (1000 * 60 * 60 * 24),
  );

  return daysLeft >= 0 ? `D-${daysLeft}` : '마감';
};
