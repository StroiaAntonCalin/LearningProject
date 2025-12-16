import React, { useEffect, useRef, useState } from "react";

type SideDrawerProps = {
  open: boolean;
  onClose: (persistDraft?: boolean) => void;
  onSend: () => void;
  text: string;
  rating: number;
  onTextChange: (text: string) => void;
  onRatingChange: (rating: number) => void;
};

export const SideDrawer: React.FC<SideDrawerProps> = ({
  open,
  onClose,
  onSend,
  text,
  rating,
  onTextChange,
  onRatingChange,
}) => {
  const drawerRef = useRef<HTMLElement | null>(null);
  const [validationError, setValidationError] = useState<string>("");

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (!drawerRef.current?.contains(target)) {
        setValidationError("");
        onClose(true);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40 transition-opacity" />

      <aside
        ref={drawerRef}
        className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl p-6 overflow-auto z-60"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Add Review</h3>
          </div>

          <div className="flex-1 overflow-auto">
            <div className="mb-4 relative">
              <label>
                <textarea
                  value={text}
                  onChange={(e) => {
                    onTextChange(e.target.value);
                    if (validationError) {
                      setValidationError("");
                    }
                  }}
                  onKeyDown={(e) => {
                    if (text.length > 500) {
                      e.preventDefault();
                      setValidationError(
                        "You reached the maximum of 500 characters.",
                      );
                    }
                  }}
                  onBlur={() => {
                    setValidationError("");
                  }}
                  rows={10}
                  maxLength={500}
                  className="w-full resize-none rounded-lg border border-gray-300 p-2"
                />
              </label>
              <span className="absolute -bottom-5 right-0 text-sm text-gray-500">
                {text.length} / 500
              </span>
              {validationError && (
                <p className="text-sm text-red-600 mt-1">{validationError}</p>
              )}
            </div>

            <div className="mb-4 flex items-center gap-4">
              <label className="font-medium">Rating (1-5):</label>
              <select
                value={rating}
                onChange={(e) => onRatingChange(Number(e.target.value))}
                className="rounded-lg border border-gray-300 p-2"
              >
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <button
              className="rounded-lg bg-gray-200 px-4 py-2 text-sm"
              onClick={() => {
                setValidationError("");
                onClose(false);
              }}
            >
              Cancel
            </button>
            <button
              className="rounded-lg bg-blue-500 px-4 py-2 text-white text-sm"
              onClick={() => {
                if (text === "") {
                  setValidationError("Text is mandatory!");
                  return;
                }
                onSend();
              }}
            >
              Send
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default SideDrawer;
