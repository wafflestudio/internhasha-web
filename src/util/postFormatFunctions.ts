export const getFormatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

export const getShortenedDate = (dateString: string): string => {
  return getFormatDate(dateString).slice(2);
};

const getEmploymentStatus = (employmentEndDate: string): string => {
  if (employmentEndDate === '') return '상시';

  const daysLeft = Math.ceil(
    (new Date(employmentEndDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24),
  );

  return daysLeft >= 0 ? (daysLeft === 0 ? 'D-day' : `D-${daysLeft}`) : '마감';
};

export const formatEmploymentState = ({
  isActive,
  employmentEndDate,
}: {
  isActive: boolean;
  employmentEndDate: string | null;
}) => {
  if (!isActive) {
    return '모집 완료';
  }
  if (employmentEndDate === null) {
    return '상시 채용';
  }
  return getEmploymentStatus(employmentEndDate);
};
