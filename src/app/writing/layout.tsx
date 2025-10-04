"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";

import BackButton from "../../components/back-button/BackButton";
import FocusedReading from "../../components/focused-reading/FocusedReading";

interface WritingLayoutProps {
  children: React.ReactNode;
}

export default function WritingLayout({
  children,
}: Readonly<WritingLayoutProps>) {
  const pathname = usePathname();
  const isPost = /^\/writing\/[a-zA-Z0-9\-]+$/.test(pathname);
  const backHref = isPost ? "/writing" : "/";

  return (
    <>
      <nav className="layout-rail">
        <BackButton href={backHref} />
      </nav>
      {isPost ? (
        <FocusedReading>
          <article className={clsx("prose", "layout-main")}>
            {children}
          </article>
        </FocusedReading>
      ) : (
        <article className={clsx("prose", "layout-main")}>
          {children}
        </article>
      )}
    </>
  );
}
