import Link from "next/link";

import Contact from "../components/contact/Contact";
import Heading from "../components/heading/Heading";
import Separator from "../components/separator/Separator";
import StatusDisplay from "../components/status-display/StatusDisplay";

export default function Home() {
  return (
    <article className="basic-prose">
      <Heading data-animate data-delay="100ms">
        Kelvin Ampofo
      </Heading>
      <p data-animate data-delay="200ms">
        Making software with an emphasis on human-computer interaction and
        aesthetic sensibility. Insatiable curiosity for{" "}
        <em>novel interfaces</em>.
      </p>
      <p data-animate data-delay="250ms">
        Read more on{" "}
        <Link href="/now" className="basic-link">
          now
        </Link>{" "}
        page.
      </p>
      <ul className="pages-list" data-animate data-delay="300ms">
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
      <Separator data-animate data-delay="350ms" />
      <Contact />
      <StatusDisplay />
    </article>
  );
}
