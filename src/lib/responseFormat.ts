// TODO: Formatting 공용 유틸 함수로 빼두기 (빈 문자열 undefined 변환 함수)
export const convertEmptyStringToUndefined = (input: string) => {
  return input.trim().length !== 0 ? input : undefined;
};
