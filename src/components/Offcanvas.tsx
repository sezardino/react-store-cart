import clsx from "clsx";
import { useDeferredValue, useEffect, useRef, useState } from "react";

interface Props extends React.HTMLProps<HTMLDivElement> {
  isOpen: boolean;
  name: string;
  label: string;
  closeHandler: () => void;
}

export const Offcanvas: React.FC<Props> = (props) => {
  const { isOpen, name, label, closeHandler, className, children, ...rest } =
    props;
  const prevOpen = useDeferredValue(isOpen);

  useEffect(() => {
    const handleEscape = (evt: KeyboardEvent) => {
      if (evt.key === "Escape") {
        closeHandler();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div
      className={clsx(
        "fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-40",
        className,
        {
          invisible: !isOpen,
          "animate-offcanvas": isOpen && !prevOpen,
        }
      )}
      onClick={closeHandler}
    >
      <div
        {...rest}
        className={clsx(
          className,
          "fixed bottom-0 flex flex-col max-w-full bg-white bg-clip-padding shadow-sm outline-none transition duration-300 ease-in-out text-gray-700 top-0 right-0 border-none w-96 transform",
          { "translate-x-full": !isOpen }
        )}
        tabIndex={-1}
        id={name}
        aria-labelledby={`${name}Label`}
        onClick={(evt) => evt.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4">
          <h5 className="mb-0 leading-normal font-semibold" id={`${name}Label`}>
            {label}
          </h5>
          <button
            type="button"
            className="box-content w-4 h-4 p-2 -my-5 -mr-2 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
            aria-label="Close"
            onClick={closeHandler}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <hr />
        <div className="flex-grow p-4 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};
