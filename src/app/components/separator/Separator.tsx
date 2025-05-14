import clsx from "clsx";

import styles from "./Separator.module.css";

interface SeparatorProps extends React.ComponentProps<"hr"> {
  orientation?: "horizontal" | "vertical";
  rotated?: boolean;
  rotationAngle?: number;
}

export default function Separator({
  orientation = "horizontal",
  className,
  ...props
}: SeparatorProps) {
  return (
    <hr
      role="separator"
      aria-orientation={orientation}
      className={clsx(
        styles.separator,
        orientation === "vertical" ? styles.vertical : styles.horizontal,
        className
      )}
      {...props}
    />
  );
}
