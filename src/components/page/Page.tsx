import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

import BackButton from "../back-button/BackButton";
import FocusedReading from "../focused-reading/FocusedReading";

interface PageProps {
  /** Where the back rail points. */
  backTo: ComponentPropsWithoutRef<typeof BackButton>["href"];
  /** Whether to enable focus mode. */
  focusMode?: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function Page({
  backTo,
  focusMode = false,
  children,
  className,
}: PageProps) {
  const content = (
    <article className={clsx("prose", "layout-main", className)}>
      {children}
    </article>
  );

  return (
    <>
      <nav className="layout-rail">
        <BackButton href={backTo} />
      </nav>
      {focusMode ? <FocusedReading>{content}</FocusedReading> : content}
    </>
  );
}
