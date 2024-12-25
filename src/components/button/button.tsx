import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

import { cn } from '../../utils/designSystem';

const buttonVariants = cva(
  'w-full py-2 transition-colors duration-200 rounded-md',
  {
    variants: {
      variant: {
        default: 'text-white bg-orange hover:bg-orange-hover cursor-pointer',
        mint: 'text-white bg-mint hover:bg-mint-hover cursor-pointer',
        white: 'text-black bg-white hover:text-orange cursor-pointer',
        disable: 'bg-gray-100 text-gray-500 cursor-not-allowed',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  onClick?: () => void;
}

export const Button = ({
  form,
  children,
  onClick,
  className,
  variant,
}: ButtonProps) => {
  const disabled = variant === 'disable' ? true : false;
  return (
    <button
      type="submit"
      form={form}
      className={cn(buttonVariants({ variant, className }))}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
