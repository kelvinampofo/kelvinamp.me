import clsx from "clsx";
import { Metadata } from "next";

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
      <nav className="layout-rail">
        <BackButton href="/" />
      </nav>
      <article className={clsx("prose", "layout-main")}>
        <Heading>Now</Heading>
        <p>
          Cultivating a taste for quality through deliberate practice, pacing,
          and consistency.
        </p>
        <p>
          All I want to do is make software and <em>be useful</em>.
          Interactivity, typography, motion, touch, performance, accessibility,
          design—an endless canvas for creativity and <em>possibility</em>.
        </p>
        <p>
          Pursuits aside, I’m investing time in fitness, eating right, spending
          quality time with family and friends, and playing with the Porsche{" "}
          <a
            href="https://porsche-code.com/PTKANXS8"
            target="_blank"
            rel="noopener noreferrer"
          >
            configurator
          </a>
          .
        </p>
        <blockquote>
          <p>Don’t talk unless you can improve the silence</p>
        </blockquote>
      </article>
    </>
  );
}
