import clsx from "clsx";
import { Button } from "./Button";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  count: number;
}

export const CartButton: React.FC<Props> = (props) => {
  const { count, className, ...rest } = props;

  return (
    <Button
      {...rest}
      variant="rounded"
      className={clsx(className, "relative group")}
      aria-label="To Shopping Cart"
    >
      {count > 0 && (
        <small className="absolute bottom-0 right-0 bg-red-700 group-hover:bg-red-800 w-6 h-6 rounded-full flex justify-center items-center translate-y-1/4 transform">
          {count}
        </small>
      )}
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
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
    </Button>
  );
};
