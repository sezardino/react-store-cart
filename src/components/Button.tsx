import clsx from "clsx";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  accent?: "primary" | "danger";
  variant?: "default" | "outline" | "rounded";
  size?: "small" | "medium" | "large";
}

export const Button: React.FC<Props> = (props) => {
  const {
    children,
    className,
    accent = "primary",
    variant = "default",
    style = "default",
    size = "medium",
    ...rest
  } = props;

  const colors = {
    primary: "bg-blue-500 hover:bg-blue-700 text-white",
    danger: "bg-red-500 hover:bg-red-700 text-white",
  };

  const variants = {
    default: "rounded",
    outline: "border-2 border-current text-current rounded-full",
    rounded: "rounded-full p-4",
  };

  const sizes = {
    small: "py-1 px-2",
    medium: "py-2 px-4",
    large: "py-3 px-6",
  };

  return (
    <button
      {...rest}
      className={clsx(
        colors[accent],
        variants[variant],
        { [sizes[size]]: variant !== "rounded" },
        className
      )}
    >
      {children}
    </button>
  );
};
