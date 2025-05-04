import Link from "next/link";

import Contact from "./components/contact/Contact";
import FadeTransition from "./components/fade-transition/FadeTransition";
import Heading from "./components/heading/Heading";
import Separator from "./components/separator/Separator";
import StatusDisplay from "./components/status-display/StatusDisplay";

export default function Home() {
  return (
    <article className="basic-prose">
      <FadeTransition delay={0.1}>
        <Heading>Kelvin Ampofo</Heading>
      </FadeTransition>

      <FadeTransition delay={0.2}>
        <p>
          Making software with a focus on human-computer interaction and
          aesthetic sensibility. Insatiable curiosity for{" "}
          <em>novel interfaces</em>.
        </p>
      </FadeTransition>

      <FadeTransition delay={0.25}>
        <p>
          Read more on{" "}
          <Link href="/now" className="basic-link">
            now
          </Link>{" "}
          page.
        </p>
      </FadeTransition>

      <FadeTransition delay={0.3}>
        <ul className="pages-list">
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
      </FadeTransition>

      <FadeTransition delay={0.35}>
        <Separator />
      </FadeTransition>

      <FadeTransition delay={0.4}>
        <Contact />
      </FadeTransition>

      <FadeTransition delay={0.45}>
        <StatusDisplay />
      </FadeTransition>
    </article>
  );
}
