import clsx from "clsx";
import { Metadata } from "next";

import BackButton from "../../components/back-button/BackButton";
import Heading from "../../components/heading/Heading";
import styles from "../../styles/layout.module.css";

export const metadata: Metadata = {
  title: "Now",
  description: "Current focus and stage in life",
  metadataBase: new URL("https://kelvinamp.me/now"),
};

export default function Now() {
  return (
    <>
      <nav className={styles.navWrapper}>
        <BackButton href="/" />
      </nav>
      <article className={clsx("prose", styles.pageLayout)}>
        <Heading>Now</Heading>
        <p>
          Cultivating a taste for quality through deliberate practice, pacing,
          and consistency.
        </p>
        <p>
          All I want to do is make software. Interactivity, typography, motion,
          touch, performance, accessibility, design—an endless canvas for
          creativity and <em>possibility</em>.
        </p>
        <p>
          Pursuits aside, probably{" "}
          <a
            href="https://literal.club/kelvinamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            reading
          </a>
          ,{" "}
          <a
            href="https://music.apple.com/gb/album/wishful-thinking/1812297817"
            target="_blank"
            rel="noopener noreferrer"
          >
            listening
          </a>
          , or playing with the Porsche{" "}
          <a
            href="https://configurator.porsche.com/porsche-code/PSR3WDD9"
            target="_blank"
            rel="noopener noreferrer"
          >
            configurator
          </a>
          .
        </p>
        <blockquote className="prose-blockquote">
          <p>Don&apos;t talk unless you can improve the silence</p>
        </blockquote>
      </article>
    </>
  );
}
