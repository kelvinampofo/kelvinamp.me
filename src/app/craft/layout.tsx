"use client";

import { useParams } from "next/navigation";

import BackButton from "../../components/back-button/BackButton";

interface CraftLayoutProps {
  children: React.ReactNode;
}

export default function CraftLayout({ children }: Readonly<CraftLayoutProps>) {
  const params = useParams<{ slug?: string }>();
  const slug = params?.slug;
  const isDemo = !!slug;

  return (
    <>
      <nav className="layout-rail">
        <BackButton href={isDemo ? "/craft" : "/"} />
      </nav>
      <article className="prose layout-main">{children}</article>
    </>
  );
}
