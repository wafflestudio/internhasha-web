import { useMutation, useQuery } from '@tanstack/react-query';

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

export const useGetDownloadPresignedUrl = ({
  s3Key,
  type,
}: {
  s3Key: string;
  type: FileType;
}) => {
  const { fileService } = useGuardContext(ServiceContext);
  const { token } = useGuardContext(TokenContext);

  const { data: downloadPresignedUrl } = useQuery({
    queryKey: [
      'fileService',
      'getDownloadPresignedUrl',
      s3Key,
      token,
      type,
    ] as const,
    queryFn: ({ queryKey: [, , key, t, fileType] }) => {
      if (t === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      return fileService.getDownloadPresignedUrl({
        token: t,
        s3Key: key,
        fileType,
      });
    },
    enabled: token !== null,
  });

  return { downloadPresignedUrl };
};

export const useDownloadFile = ({
  s3Key,
  fileType,
  fileName,
  setData,
}: {
  s3Key?: string;
  fileType: FileType;
  fileName: string;
  setData(input: { file: File; url: string } | null): void;
}) => {
  const { fileService } = useGuardContext(ServiceContext);
  const { token } = useGuardContext(TokenContext);
  const { getDownloadByPresignedUrl } = useDownloadFileByPresignedUrl({
    setData,
  });

  const { data: dataPreview, isPending } = useQuery({
    queryKey: [
      'fileService',
      'getDownloadPresignedUrl',
      s3Key,
      token,
      fileType,
    ] as const,
    queryFn: async ({ queryKey: [, , key, t, type] }) => {
      if (t === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      if (key === undefined) {
        throw new Error('S3 키 값이 존재하지 않습니다.');
      }
      const response = await fileService.getDownloadPresignedUrl({
        token: t,
        s3Key: key,
        fileType: type,
      });

      if (response.type === 'success') {
        return getDownloadByPresignedUrl({
          presignedUrl: response.data.url,
          fileName,
        });
      }
    },
    enabled: token !== null && s3Key !== undefined,
  });

  return {
    dataPreview,
    isPending,
  };
};

const useDownloadFileByPresignedUrl = ({
  setData,
}: {
  setData(input: { file: File; url: string } | null): void;
}) => {
  const { fileService } = useGuardContext(ServiceContext);
  const { token } = useGuardContext(TokenContext);

  const { mutateAsync: getDownloadByPresignedUrl, isPending } = useMutation({
    mutationFn: async ({
      presignedUrl,
      fileName,
    }: {
      presignedUrl: string;
      fileName: string;
    }) => {
      if (token === null) {
        throw new Error('토큰이 존재하지 않습니다.');
      }
      return fileService.downloadFileByPresignedUrl({ presignedUrl, fileName });
    },
    onSuccess: (response) => {
      if (response.type === 'success') {
        setData(response.data);
      }
    },
  });

  return { getDownloadByPresignedUrl, isPending };
};
