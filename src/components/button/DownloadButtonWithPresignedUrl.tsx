import type { ReactNode } from 'react';
import { useState } from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import type { FileType } from '@/entities/file';
import { useDownloadFile } from '@/shared/file/hooks';

export const DownloadButtonWithPresignedUrl = ({
  s3Key,
  type,
  fileName,
  children,
}: {
  s3Key: string;
  type: FileType;
  fileName: string;
  children: ReactNode;
}) => {
  const [_, setData] = useState<{
    file: File;
    url: string;
  } | null>(null);
  const { dataPreview } = useDownloadFile({
    s3Key,
    fileType: type,
    fileName,
    setData,
  });

  if (dataPreview === undefined) {
    return <SkeletonDownloadButtonWithPresignedUrl />;
  }

  if (dataPreview.type === 'error') {
    return (
      <span>에러로 인해 다운로드에 실패하였습니다. 새로고침해주세요.</span>
    );
  }

  return (
    <a
      href={dataPreview.data.url}
      download={fileName}
      // target="_blank"
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
