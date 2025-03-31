import type { ReactNode } from 'react';

import { ICON_SRC } from '@/entities/asset';

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
      className="flex w-fit items-center gap-1 rounded-sm bg-grey-50 px-[10px] py-[6px]"
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
      className="flex h-[28px] w-[28px] w-fit items-center justify-center gap-1 rounded-sm bg-grey-50"
    >
      <img src={ICON_SRC.LINK} />
      <span className="font-semibold text-grey-600">{children}</span>
    </a>
  );
};
