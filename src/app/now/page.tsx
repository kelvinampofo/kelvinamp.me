import clsx from "clsx";
import { Metadata } from "next";
import Link from "next/link";

import BackButton from "../../components/back-button/BackButton";
import Heading from "../../components/heading/Heading";

export const metadata: Metadata = {
  title: "Now",
  description: "Current focus and stage in life",
  metadataBase: new URL("https://kelvinamp.me/now"),
};

export default function Now() {
  return (
    <>
      <nav className="nav-wrapper">
        <BackButton href="/" />
      </nav>
      <article className={clsx("prose", "page-layout")}>
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
          , updating my <Link href="/mood">mood board</Link>, or playing with
          the Porsche{" "}
          <a
            href="https://porsche-code.com/PTKANXS8"
            target="_blank"
            rel="noopener noreferrer"
          >
            configurator
          </a>
          .
        </p>
        <blockquote className="prose-blockquote">
          <p>Don’t talk unless you can improve the silence</p>
        </blockquote>
      </article>
    </>
  );
}
