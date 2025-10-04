"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";

import BackButton from "../../components/back-button/BackButton";

interface CraftLayoutProps {
  children: React.ReactNode;
}

export default function CraftLayout({ children }: Readonly<CraftLayoutProps>) {
  const pathname = usePathname();
  const isDemo = /^\/craft\/[a-zA-Z0-9\-]+$/.test(pathname);
  const backHref = isDemo ? "/craft" : "/";

  return (
    <>
      <nav className="layout-rail">
        <BackButton href={backHref} />
      </nav>
      <article className={clsx("prose", "layout-main")}>
        {children}
      </article>
    </>
  );
}
