export const escapeToNormalText = (content: string) => {
  return content.replace(/\n/g, '\\n').replace(/ {4}/g, '\\t');
};

export const normalTextToEscape = (content: string) => {
  return content.replace(/\\n/g, '\n').replace(/\\t/g, '    ');
};
