import React from "react";

type HeaderProps = {
  title: React.ReactNode;
  title2?: React.ReactNode;
  center?: boolean;
  className?: string;
};

export const Header: React.FC<HeaderProps> = ({
  title,
  title2,
  center = true,
  className = "",
}) => {
  const hasTwo = typeof title2 !== "undefined" && title2 !== null;
  const alignment = center ? "text-center" : "text-left";

  if (hasTwo) {
    return (
      <div className={`mb-8 ${className}`}>
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-center md:text-center">
            <h1 className="text-3xl font-bold">{title}</h1>
          </div>
          <div className="text-center md:text-center md:flex md:items-center md:justify-center">
            <h1 className="text-3xl font-bold">{title2}</h1>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={`mb-8 ${alignment} ${className}`}>
      <h1 className="text-3xl font-bold">{title}</h1>
    </div>
  );
};

export default Header;
