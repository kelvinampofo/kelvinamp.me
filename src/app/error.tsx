"use client";

import clsx from "clsx";

import Heading from "../components/heading/Heading";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <article className={clsx("prose", "page-layout")}>
      <Heading>{error.name}</Heading>
      <p>{error.message}</p>
      <pre className="error-stack">{error.stack}</pre>
    </article>
  );
}
