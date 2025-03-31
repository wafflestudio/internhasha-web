import type { ReactNode } from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import type { FileType } from '@/entities/file';
import { useGetDownloadPresignedUrl } from '@/shared/file/hooks';

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
      className="flex w-fit items-center gap-1 rounded-sm bg-grey-50 px-[10px] py-[6px]"
      rel="noreferrer"
    >
      {children}
    </a>
  );
};

const SkeletonDownloadButtonWithPresignedUrl = () => {
  return <Skeleton className="h-[36px] w-[133px]" />;
};
