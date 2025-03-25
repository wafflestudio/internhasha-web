import { useMutation } from '@tanstack/react-query';

import { createErrorMessage } from '@/entities/errors';
import type { FileType } from '@/entities/file';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';

export const useGetPresignedUrl = ({
  setResponseMessage,
}: {
  setResponseMessage(input: string): void;
}) => {
  const { fileService } = useGuardContext(ServiceContext);
  const { token } = useGuardContext(TokenContext);

  const { mutateAsync: getPresignedUrl } = useMutation({
    mutationFn: ({
      fileName,
      fileType,
    }: {
      fileName: string;
      fileType: FileType;
    }) => {
      if (token === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      return fileService.getUploadPresignedUrl({ token, fileName, fileType });
    },
    onSuccess: (response) => {
      if (response.type === 'success') {
        return;
      } else {
        setResponseMessage(createErrorMessage(response.code));
      }
    },
    onError: () => {
      setResponseMessage(
        '파일 업로드에 실패했습니다. 잠시 후에 다시 실행해주세요.',
      );
    },
  });

  return { getPresignedUrl };
};

export const useUploadFile = ({
  setResponseMessage,
}: {
  setResponseMessage(input: string): void;
}) => {
  const { fileService } = useGuardContext(ServiceContext);

  const { mutateAsync: uploadFile } = useMutation({
    mutationFn: async ({
      presignedUrl,
      file,
    }: {
      presignedUrl: string;
      file: File | undefined;
    }) => {
      if (file === undefined) {
        throw new Error('파일이 존재하지 않습니다.');
      }
      return fileService.uploadImage({ presignedUrl, file });
    },
    onSuccess: (response) => {
      if (response.type === 'success') {
        setResponseMessage('');
      } else {
        setResponseMessage('업로드 과정에서 오류가 발생했습니다.');
      }
    },
    onError: () => {
      setResponseMessage('업로드에 실패했습니다. 잠시 후에 다시 실행해주세요.');
    },
  });

  return { uploadFile };
};
