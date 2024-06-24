import React, { PropsWithChildren } from "react";

interface FormControlProps {
  label: string;
  error?: string;
}

const FormControl: React.FC<PropsWithChildren<FormControlProps>> = ({
  label,
  error,
  children,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="block min-h-6 text-black">
        {label}
      </label>
      <div className="relative">{children}</div>
      {error && (
        <div className="flex items-center text-xs font-medium tracking-wide text-red-500">
          {error}
        </div>
      )}
    </div>
  );
};

export default FormControl;
