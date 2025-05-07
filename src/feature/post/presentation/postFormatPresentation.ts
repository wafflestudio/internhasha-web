const formatDday = (date: string): string => {
  const targetDate = new Date(date);

  if (isNaN(targetDate.getTime())) {
    throw new Error('유효하지 않은 날짜 형식입니다.');
  }

  const now = new Date();
  const targetDateOnly = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate(),
  );
  const nowDateOnly = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );

  if (targetDate < now) {
    return '마감';
  }
  if (targetDateOnly.getTime() === nowDateOnly.getTime()) {
    return 'D-DAY';
  }

  const timeDiff = targetDateOnly.getTime() - nowDateOnly.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  return `D-${daysDiff}`;
};

export const formatEmploymentState = ({ date }: { date: string | null }) => {
  if (date === null || date.trim().length === 0) {
    return '상시 채용';
  }

  return formatDday(date);
};

export const checkPostActive = ({ date }: { date: string | null }) => {
  if (date === null) {
    return true;
  }
  const targetDate = new Date(date);

  if (isNaN(targetDate.getTime())) {
    throw new Error('유효하지 않은 날짜 형식입니다.');
  }

  const now = new Date();

  return targetDate >= now;
};
