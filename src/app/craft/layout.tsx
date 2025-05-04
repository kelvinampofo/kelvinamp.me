"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";

import BackButton from "../components/back-button/BackButton";

import styles from "./CraftLayout.module.css";

interface CraftLayoutProps {
  children: React.ReactNode;
}

export default function CraftLayout({ children }: Readonly<CraftLayoutProps>) {
  const pathname = usePathname();
  const isDemo = /^\/craft\/[a-zA-Z0-9\-]+$/.test(pathname);
  const backHref = isDemo ? "/craft" : "/";

  return (
    <>
      <nav className={styles.navWrapper}>
        <BackButton href={backHref} />
      </nav>
      <article className={clsx("basic-prose", styles.craftLayout)}>
        {children}
      </article>
    </>
  );
}
