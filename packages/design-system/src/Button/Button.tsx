import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

import { cn } from "../utils/merge";

const buttonVariants = cva(
  "w-full py-2 transition-colors duration-200 rounded-md",
  {
    variants: {
      variant: {
        default: "text-white bg-orange hover:bg-orange-hover cursor-pointer",
        mint: "text-white bg-mint hover:bg-mint-hover cursor-pointer",
        white: "text-black bg-white hover:text-orange cursor-pointer",
        disable: "bg-gray-100 text-gray-500 cursor-not-allowed",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = ({
  children,
  disabled,
  onClick,
  variant,
  className,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(buttonVariants({ variant, className }))}
    >
      {children}
    </button>
  );
};
