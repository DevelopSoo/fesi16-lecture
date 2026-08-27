import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "rounded font-medium focus:outline-none transition-colors focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
        secondary:
          "bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500",
        outline:
          "border border-gray-600 text-gray-600 hover:bg-gray-50 focus:ring-gray-500",
      },
      size: {
        sm: "px-3 py-1 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed",
        false: "cursor-pointer",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      disabled: false,
    },
  },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

const Button = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  className,
}: ButtonProps) => {
  const buttonClasses = twMerge(
    clsx(buttonVariants({ variant, size, disabled }), className),
  );

  return (
    <button className={buttonClasses} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
