export const convertEmptyStringToUndefined = (input: string) => {
  return input.trim().length !== 0 ? input : undefined;
};
