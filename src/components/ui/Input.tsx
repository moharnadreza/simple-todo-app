import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  isSubmitting?: boolean;
};

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, isSubmitting = false, id, ...props }, ref) => {
    return (
      <div className="w-full relative">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}

        <input
          ref={ref}
          id={id}
          className={`
            w-full px-6 py-4 border-none rounded-full bg-gray-50
            focus:outline-none 
            placeholder:text-gray-400 select-none
            disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
          `
            .trim()
            .replace(/\s+/g, " ")}
          {...props}
        />

        {error && (
          <p className="absolute left-6 top-16.5 text-xs font-medium text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
