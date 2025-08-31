import clsx from "clsx";
import { Metadata } from "next";

import BackButton from "../components/back-button/BackButton";
import Heading from "../components/heading/Heading";

export const metadata: Metadata = {
  title: "404",
  description: "Page not found",
};

export default function NotFound() {
  return (
    <>
      <nav className="nav-wrapper">
        <BackButton href="/" />
      </nav>
      <article className={clsx("prose", "page-layout")}>
        <Heading>404 — Not Found</Heading>
        <p>
          You know what else isn’t found? Those old Intel stickers on Windows
          machines—the ones with the hidden holographic chips on the back that
          nobody ever saw.
        </p>
      </article>
    </>
  );
}
