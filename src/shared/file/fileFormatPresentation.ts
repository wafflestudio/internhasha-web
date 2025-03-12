export const fileFormatPresentation = () => {
  return {
    formatFileNameToS3Key: ({
      fileName,
      fileType,
    }: {
      fileName: string;
      fileType:
        | 'CV'
        | 'PORTFOLIO'
        | 'APPLICANT_THUMBNAIL'
        | 'COMPANY_THUMBNAIL'
        | 'IR_DECK';
    }) => {
      if (fileType === 'COMPANY_THUMBNAIL') {
        return `static/public/${fileType.toLocaleLowerCase()}/${fileName}`;
      }
      return `static/private/${fileType.toLocaleLowerCase()}/${fileName}`;
    },
  };
};
