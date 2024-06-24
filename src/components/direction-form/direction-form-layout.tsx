import React, { PropsWithChildren } from "react";

const DirectionFormLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex-1 flex flex-col gap-4 justify-center px-32">
      {children}
    </div>
  );
};

export default DirectionFormLayout;
