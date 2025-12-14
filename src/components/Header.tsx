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
      <header
        style={{ marginBottom: "var(--site-header-margin-bottom)" }}
        className="fixed top-0 w-full z-50 bg-blue-500 text-white shadow"
      >
        <button
          type="button"
          onClick={() => {
            window.history.back();
          }}
          className="absolute left-20 top-1/2 -translate-y-1/2 inline-flex items-center gap-2 px-3 py-2 rounded-md bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white text-white shadow cursor-pointer"
        >
          <span className="text-2xl font-medium">Back</span>
        </button>
        <div className="grid gap-6 items-start max-w-[1100px] mx-auto grid-cols-2">
          <div className="text-center py-4">
            <h1 className="text-3xl font-bold">{text}</h1>
          </div>
          <div className="text-center py-4">
            <h1 className="text-3xl font-bold">{text2}</h1>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header
      style={{ marginBottom: "var(--site-header-margin-bottom)" }}
      className="fixed top-0 w-full z-50 bg-blue-500 text-white shadow"
    >
      <button
        ref={filterButtonRef}
        type="button"
        onClick={() => onFilterClick?.()}
        className="absolute left-20 top-1/2 -translate-y-1/2 inline-flex items-center gap-2 px-3 py-2 rounded-md bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white text-white shadow cursor-pointer"
      >
        <span className="text-2xl font-medium">Filter</span>
      </button>
      <div className="text-center py-4">
        <h1 className="text-3xl font-bold">{text}</h1>
      </div>
    </header>
  );
};

export default Header;
