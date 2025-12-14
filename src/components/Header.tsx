import React from "react";

type HeaderProps = {
  text: React.ReactNode;
  text2?: React.ReactNode;
};

export const Header: React.FC<HeaderProps> = ({ text, text2 }) => {
  const hasTwo = typeof text2 !== "undefined" && text2 !== null;

  if (hasTwo) {
    return (
      <div className="mb-8 bg-blue-500 text-white">
        <div className="max-w-[1100px] mx-auto grid grid-cols-2">
          <div className="text-center py-4">
            <h1 className="text-3xl font-bold">{text}</h1>
          </div>
          <div className="text-center py-4">
            <h1 className="text-3xl font-bold">{text2}</h1>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="mb-8 text-center bg-blue-500 text-white py-4">
      <h1 className="text-3xl font-bold">{text}</h1>
    </div>
  );
};

export default Header;
