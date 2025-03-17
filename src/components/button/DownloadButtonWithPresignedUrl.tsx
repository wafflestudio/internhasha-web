import { useQuery } from '@tanstack/react-query';
import type { ReactNode } from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import type { FileType } from '@/entities/file';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';

export const DownloadButtonWithPresignedUrl = ({
  s3Key,
  type,
  children,
}: {
  s3Key: string;
  type: FileType;
  children: ReactNode;
}) => {
  const { downloadPresignedUrl } = useGetDownloadPresignedUrl({ s3Key, type });

  if (downloadPresignedUrl === undefined) {
    return <SkeletonDownloadButtonWithPresignedUrl />;
  }

  if (downloadPresignedUrl.type === 'error') {
    return (
      <span>에러로 인해 다운로드에 실패하였습니다. 새로고침해주세요.</span>
    );
  }

  return (
    <a
      href={downloadPresignedUrl.data.url}
      target="_blank"
      download={true}
      className="flex items-center w-fit px-[10px] py-[6px] gap-1 rounded-sm bg-grey-50"
      rel="noreferrer"
    >
      {children}
    </a>
  );
};

const SkeletonDownloadButtonWithPresignedUrl = () => {
  return <Skeleton className="w-[133px] h-[36px]" />;
};

const useGetDownloadPresignedUrl = ({
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
  });

  return { downloadPresignedUrl };
};
