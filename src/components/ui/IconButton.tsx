import type { ButtonHTMLAttributes, ReactNode } from "react";
import LoadingIndicator from "./LoadingIndicator";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: ReactNode;
  isLoading?: boolean;
};

const IconButton = ({ icon, isLoading, ...props }: Props) => {
  return (
    <button
      className={`
        inline-flex items-center justify-center p-4 rounded-full 
        bg-white text-gray-900 cursor-pointer
        active:bg-gray-50
        transition-colors duration-200 
        focus:outline-3 outline-gray-100
        disabled:opacity-50 disabled:cursor-not-allowed
      `
        .trim()
        .replace(/\s+/g, " ")}
      {...props}
    >
      {isLoading ? <LoadingIndicator size={20} /> : icon}
    </button>
  );
};

export default IconButton;
