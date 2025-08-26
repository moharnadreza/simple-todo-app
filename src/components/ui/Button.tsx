import type { ButtonHTMLAttributes, ReactNode } from "react";
import LoadingIndicator from "./LoadingIndicator";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  isLoading?: boolean;
  variant?: "primary" | "secondary";
};

const Button = ({
  children,
  variant = "secondary",
  isLoading,
  ...props
}: Props) => {
  return (
    <button
      className={`
        inline-flex items-center justify-center px-4 lg:px-8 flex-1 py-4 rounded-full 
        cursor-pointer
        transition-colors duration-200 text-md focus:outline-2 outline-gray-100
        disabled:opacity-50 disabled:cursor-not-allowed
        ${
          variant === "primary"
            ? "bg-gray-950 text-white"
            : "bg-white text-gray-900"
        }
      `
        .trim()
        .replace(/\s+/g, " ")}
      {...props}
    >
      {isLoading ? <LoadingIndicator size={20} /> : children}
    </button>
  );
};

export default Button;
