import clsx from "clsx";
import { Metadata } from "next";

import BackButton from "../components/back-button/BackButton";
import Heading from "../components/heading/Heading";
import styles from "../styles/layout.module.css";

export const metadata: Metadata = {
  title: "404",
  description: "Page not found",
};

export default function NotFound() {
  return (
    <>
      <nav className={styles.navWrapper}>
        <BackButton href="/" />
      </nav>
      <article className={clsx("basic-prose", styles.pageLayout)}>
        <Heading>404</Heading>
        <p>
          Do you know what else is not found? That one perfect hex code you
          swear you saved. Maybe it&apos;s in a bookmark. Maybe it&apos;s lost
          to the void.
        </p>
      </article>
    </>
  );
}
