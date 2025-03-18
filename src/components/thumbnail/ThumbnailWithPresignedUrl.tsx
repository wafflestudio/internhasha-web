import { useQuery } from '@tanstack/react-query';

import { Skeleton } from '@/components/ui/skeleton';
import type { FileType } from '@/entities/file';
import { useGuardContext } from '@/shared/context/hooks';
import { ServiceContext } from '@/shared/context/ServiceContext';
import { TokenContext } from '@/shared/context/TokenContext';

export const ThumbnailWithPresignedUrl = ({
  s3Key,
  type,
}: {
  s3Key: string;
  type: FileType;
}) => {
  const { downloadPresignedUrl } = useGetDownloadPresignedUrl({ s3Key, type });

  if (downloadPresignedUrl === undefined) {
    return <SkeletonDownloadButtonWithPresignedUrl />;
  }

  if (downloadPresignedUrl.type === 'error') {
    return <div className="h-[80px] w-[80x] bg-grey-200"></div>;
  }

  return (
    <div className="rounded-xs h-[80px] w-[80px] overflow-hidden">
      <img
        src={downloadPresignedUrl.data.url}
        alt={s3Key}
        className="h-full w-full object-cover"
      />
    </div>
  );
};

const SkeletonDownloadButtonWithPresignedUrl = () => {
  return <Skeleton className="h-[80px] w-[80x]" />;
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
