import { Metadata } from "next";

import Heading from "../../components/heading/Heading";
import Page from "../../components/page/Page";

export const metadata: Metadata = {
  alternates: {
    canonical: "/now",
  },
  title: "Now",
  description: "Current focus and stage in life",
};

export default function Now() {
  return (
    <Page backTo="/">
      <Heading>Now</Heading>
      <p>
        Cultivating a taste for quality through deliberate practice, pacing, and
        consistency.
      </p>
      <p>
        All I want to do is make software and <em>be useful</em>. Interactivity,
        typography, motion, touch, performance, accessibility, design—an endless
        canvas for creativity and <em>possibility</em>.
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
        <p>
          To do the useful thing, to say the courageous thing, to contemplate
          the beautiful thing― that is enough for one man’s life.
        </p>
      </blockquote>
    </Page>
  );
}
