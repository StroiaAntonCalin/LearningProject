import React from "react";

type HeaderProps = {
  text: React.ReactNode;
  text2?: React.ReactNode;
  onFilterClick?: () => void;
  filterButtonRef?: React.Ref<HTMLButtonElement>;
};

export const Header: React.FC<HeaderProps> = ({
  text,
  text2,
  onFilterClick,
  filterButtonRef,
}) => {
  if (text2) {
    return (
      <header className="fixed top-0 w-full z-50 bg-blue-500 text-white h-15 flex items-center">
        <button
          type="button"
          onClick={() => {
            window.history.back();
          }}
          className="absolute left-20 top-1/2 -translate-y-1/2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
        >
          <span className="text-2xl font-medium">Back</span>
        </button>
        <div className="grid gap-6 max-w-[1100px] mx-auto grid-cols-2 w-full h-full items-center">
          <div className="flex justify-center">
            <h1 className="hidden sm:block text-3xl font-bold">{text}</h1>
          </div>
          <div className="flex justify-center">
            <h1 className="hidden sm:block text-3xl font-bold">{text2}</h1>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 w-full z-50 bg-blue-500 text-white shadow h-15 flex items-center">
      <button
        ref={filterButtonRef}
        type="button"
        onClick={() => onFilterClick?.()}
        className="absolute left-20 top-1/2 -translate-y-1/2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
      >
        <span className="text-2xl font-medium">Filter</span>
      </button>
      <div className="text-center w-full">
        <h1 className="text-3xl font-bold">{text}</h1>
      </div>
    </header>
  );
};

export default Header;
