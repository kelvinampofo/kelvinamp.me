"use client";

import clsx from "clsx";
import { useParams } from "next/navigation";

import BackButton from "../../components/back-button/BackButton";
import FocusedReading from "../../components/focused-reading/FocusedReading";

interface WritingLayoutProps {
  children: React.ReactNode;
}

export default function WritingLayout({
  children,
}: Readonly<WritingLayoutProps>) {
  const params = useParams<{ slug?: string }>();

  const slug = params?.slug;
  const isPost = !!slug;

  const content = (
    <article className={clsx("prose", "layout-main")}>{children}</article>
  );

  return (
    <>
      <nav className="layout-rail">
        <BackButton href={isPost ? "/writing" : "/"} />
      </nav>
      {isPost ? <FocusedReading>{content}</FocusedReading> : content}
    </>
  );
}
