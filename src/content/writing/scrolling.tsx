import Heading from "../../components/heading/Heading";
import Separator from "../../components/separator/Separator";

export const metadata = {
  title: "Scrolling",
  description: "Field notes on scroll behaviour and scroll-driven code.",
  publishedDate: "2026-01-06",
};

export default function Scrolling() {
  return (
    <>
      <Heading>Scrolling</Heading>
      <p>
        Field notes on scroll behaviour and scroll-driven code. Recommended
        read: Cheng Lou’s{" "}
        <a
          href="https://github.com/chenglou/martian-ui/blob/main/docs/Scrolling.md"
          target="_blank"
          rel="noopener noreferrer"
        >
          scrolling
        </a>{" "}
        document.
      </p>

      <ul>
        <li>
          on macOS and iOS, rubber-banding creates an elastic overscroll effect
          that gently communicates the end of content without interrupting input
          <ul>
            <li>
              it’s primarily an Apple-platform UI affordance, supported by
              Safari and Firefox for both page-level and container scrolling
              <sup>
                <a href="#fn-overscroll">1</a>
              </sup>
            </li>
            <li>
              Chrome applies elastic bounce to the page, not to scrollable
              containers
            </li>
            <li>
              disabling it with <code>overscroll-behavior: none</code> removes
              boundary feedback (generally not recommended)
            </li>
            <li>
              suppressing elastic overscroll removes an important boundary
              signal, which can make interactions that rely on continuous input
              (such as scrubbing or drag-based controls) feel abruptly clipped
            </li>
          </ul>
        </li>

        <li>
          scroll affordances often double as input feedback
          <ul>
            <li>
              elastic resistance, momentum decay, and boundary feedback are
              frequently reused by users as cues for fine-grained control, even
              when the interaction is not strictly scrolling
            </li>
          </ul>
        </li>

        <li>
          scrolling is often handled <em>off the main thread</em>, on the
          compositor, so it remains smooth even under JavaScript work
        </li>

        <li>
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event"
            target="_blank"
            rel="noopener noreferrer"
          >
            scroll events
          </a>{" "}
          provide no provenance regarding their source
          <ul>
            <li>
              a <code>scroll</code> event does not indicate <em>why</em>{" "}
              scrolling occurred
            </li>
            <li>
              user gestures, keyboard input, drag-based auto-scrolling, and
              programmatic scrolling are effectively indistinguishable at the
              event level
            </li>
          </ul>
        </li>

        <li>
          Apple scrolling physics feel like momentum with gentle decay
          <ul>
            <li>
              most attempts to reproduce this behaviour feel noticeably off
            </li>
          </ul>
        </li>

        <li>
          off-main-thread scrolling preserves perceived smoothness but limits
          the reliability of scroll-driven JavaScript effects
          <ul>
            <li>this trade-off is a constraint of current browser engines</li>
            <li>
              <s>should</s> prefer native scrolling over scroll-jacked effects
            </li>
          </ul>
        </li>
      </ul>
      <Separator />
      <ol data-footnotes>
        <li id="fn-overscroll">
          Browser support varies by engine and platform. On iOS, all browsers
          are WebKit and inherit elastic overscroll behaviour. On macOS, Chrome
          and Firefox can integrate with OS-level scrolling physics, but their
          behaviour differs for overflow containers and isn’t consistent across
          engines.
        </li>
      </ol>
    </>
  );
}
