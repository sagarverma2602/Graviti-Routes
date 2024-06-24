import React, { InputHTMLAttributes, ReactNode, RefObject } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  ref?: RefObject<HTMLInputElement>;
  startEnhancer?: ReactNode;
  handleInputRef?: (ref: HTMLInputElement) => void;
}

const Input: React.FC<InputProps> = ({
  error,
  ref,
  startEnhancer,
  handleInputRef,
  ...props
}) => {
  return (
    <div className="border-2 border-gray-primary rounded-md py-4 px-4 flex flex-row gap-2 items-center bg-white focus-within:border-gray-500">
      {startEnhancer && (
        <span className="flex items-center self-center">{startEnhancer}</span>
      )}
      <input
        {...props}
        ref={handleInputRef ? (ref) => handleInputRef(ref) : null}
        className="outline-none bg-white font-bold"
      />
      {error && <div className="text-red-600">{error}</div>}
    </div>
  );
};

export default Input;
