import type { Metadata } from "next";
import Link from "next/link";

import Heading from "../components/heading/Heading";
import Separator from "../components/separator/Separator";

import AnimationController from "./_home/animation-controller/AnimationController";
import Contact from "./_home/contact/Contact";
import StatusDisplay from "./_home/status-display/StatusDisplay";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  title: "Kelvin Ampofo",
  description:
    "Software engineer making software with emphasis on human-computer interaction and aesthetic sensibility.",
};

export default function Home() {
  return (
    <AnimationController>
      <article className="prose">
        <Heading data-animate style={{ "--stagger": "1" }}>
          Kelvin Ampofo
        </Heading>
        <p data-animate style={{ "--stagger": "2" }}>
          Making software with emphasis on human-computer interaction and
          aesthetic sensibility. Insatiable curiosity for{" "}
          <em>novel interfaces</em>.
        </p>
        <p data-animate style={{ "--stagger": "3" }}>
          Read more on <Link href="/now">now</Link> page.
        </p>
        <ul className="pages-list" data-animate style={{ "--stagger": "4" }}>
          <li>
            <Link href="/craft">Craft</Link>
          </li>
          <li>
            <Link href="/writing">Writing</Link>
          </li>
        </ul>
        <Separator data-animate style={{ "--stagger": "5" }} />
        <Contact />
        <StatusDisplay />
      </article>
    </AnimationController>
  );
}
