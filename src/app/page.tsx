import Link from "next/link";

import Contact from "../components/contact/Contact";
import Heading from "../components/heading/Heading";
import Separator from "../components/separator/Separator";
import StatusDisplay from "../components/status-display/StatusDisplay";

export default function Home() {
  return (
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
  );
}
