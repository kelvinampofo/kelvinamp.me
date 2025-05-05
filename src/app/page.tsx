import Link from "next/link";

import Contact from "./components/contact/Contact";
import Heading from "./components/heading/Heading";
import Separator from "./components/separator/Separator";
import StatusDisplay from "./components/status-display/StatusDisplay";

export default function Home() {
  return (
    <article className="basic-prose">
      <Heading data-animate data-delay="0.1s">
        Kelvin Ampofo
      </Heading>
      <p data-animate data-delay="0.2s">
        Making software with a focus on human-computer interaction and aesthetic
        sensibility. Insatiable curiosity for <em>novel interfaces</em>.
      </p>
      <p data-animate data-delay="0.25s">
        Read more on{" "}
        <Link href="/now" className="basic-link">
          now
        </Link>{" "}
        page.
      </p>
      <ul className="pages-list" data-animate data-delay="0.3s">
        <li>
          <Link href="/craft" className="basic-link">
            Craft
          </Link>
        </li>
        <li>
          <Link href="/writing" className="basic-link">
            Writing
          </Link>
        </li>
      </ul>
      <Separator data-animate data-delay="0.35s" />
      <Contact />
      <StatusDisplay />
    </article>
  );
}
