import clsx from "clsx";

import BackButton from "../components/back-button/BackButton";
import Heading from "../components/heading/Heading";
import styles from "../styles/layout.module.css";

export default function Now() {
  return (
    <>
      <nav className={styles.navWrapper}>
        <BackButton href="/" />
      </nav>
      <article className={clsx("basic-prose", styles.pageLayout)}>
        <Heading>Now</Heading>
        <p>
          Committed to developing skill, through guiltless exploration in
          software <em className="font-serif">&</em> design.
        </p>
        <p>
          All I want to do is make software. Interactivity, typography, motion,
          touch optimisations, accessibility, design&mdash;an infinite canvas
          for creativity and opportunity.
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
            href="https://music.apple.com/gb/album/the-miseducation-of-lauryn-hill/1276760743"
            target="_blank"
            rel="noopener noreferrer"
          >
            listening
          </a>
          ,{" "}
          <a
            href="https://youtube.com/playlist?list=PL_xPJT_mBnFm9mYbzx3Ed61o1ZD3w17n9&si=jVu1IodbNsjB8LOx"
            target="_blank"
            rel="noopener noreferrer"
          >
            watching
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
        <p>Speaking less, unless I can improve the silence.</p>
      </article>
    </>
  );
}
