import type { ReactNode } from 'react';

import { ICON_SRC } from '@/entities/asset';
import { cn } from '@/lib/utils';

export const LinkButton = ({
  link,
  children,
}: {
  link: string;
  children?: ReactNode;
}) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'flex w-fit items-center rounded-sm bg-grey-50 px-[10px] py-[6px]',
        children !== undefined ? 'gap-1' : '',
      )}
    >
      <img src={ICON_SRC.LINK} />
      <span className="font-semibold text-grey-600">{children}</span>
    </a>
  );
};

export const SmallLinkButton = ({
  link,
  children,
}: {
  link: string;
  children?: ReactNode;
}) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'flex h-[28px] w-fit items-center justify-center rounded-sm bg-grey-50 p-1',
        children !== undefined ? 'gap-1' : '',
      )}
    >
      <img src={ICON_SRC.LINK} />
      <span className="font-semibold text-grey-600">{children}</span>
    </a>
  );
};
