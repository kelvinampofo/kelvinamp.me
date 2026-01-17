import { Metadata } from "next";

import BackButton from "../../components/back-button/BackButton";
import Heading from "../../components/heading/Heading";
import Separator from "../../components/separator/Separator";

export const metadata: Metadata = {
  title: "README",
  description:
    "A guide to how I work and how we can do our best work together.",
  metadataBase: new URL("https://kelvinamp.me/readme"),
};

export default function Readme() {
  return (
    <>
      <nav className="layout-rail">
        <BackButton href="/" />
      </nav>
      <article className="prose layout-main">
        <Heading>README</Heading>
        <p className="description">
          This is a guide to how I work and how we can do our best work{" "}
          <em>together</em>.
        </p>

        <Separator />

        <Heading as="h2" className="text-secondary">
          How I work
        </Heading>
        <ul>
          <li>
            Communication
            <ul>
              <li>
                I prefer public channels for shared context. I work async-first,
                keep subject lines clear, and share quick summaries.
              </li>
            </ul>
          </li>
          <li>
            Working hours
            <ul>
              <li>
                I keep core hours open for sync and protect deep-work blocks
                most mornings. My calendar is the source of truth.
              </li>
            </ul>
          </li>
          <li>
            Feedback
            <ul>
              <li>I value feedback that is kind, candid, and actionable.</li>
              <li>Public praise, private critique.</li>
            </ul>
          </li>
          <li>
            Assume good intent
            <ul>
              <li>
                I assume good intent and work to understand the reasons behind
                decisions. I ask the same courtesy in return.
              </li>
            </ul>
          </li>
          <li>
            Working with ADHD
            <ul>
              <li>
                I have ADHD. Clear, prioritised asks with scope and deadlines
                help me deliver. Written follow-ups make a difference.
              </li>
              <li>
                If I’m quiet, I’m in deep focus, and I’ll share an update once I
                surface.
              </li>
              <li>
                Rapid, actionable feedback helps me with momentum and avoids
                spirals of uncertainty.
              </li>
              <li>Gentle nudges are welcome—I’ll return the favour.</li>
            </ul>
          </li>
        </ul>

        <Heading as="h2" className="text-secondary">
          Design
        </Heading>
        <ul>
          <li>
            Collaborate closely
            <ul>
              <li>
                I prefer close designer/engineer collaboration. Without it,
                quality risks staying in Figma.
              </li>
              <li>
                Pair early on flows, states (loading, empty, error), motion, and
                edge cases.
              </li>
              <li>
                Document intent and constraints <i>(what must be true)</i>, not
                just pixels, while leaving room for pragmatic implementation.
              </li>
            </ul>
          </li>
          <li>
            Design intent
            <ul>
              <li>
                Optimistic updates: design for perceived latency, smooth
                transitions, and recovery. Define what’s optimistic vs.
                confirmed.
              </li>
              <li>
                Shape component APIs: converge on clear props, controlled vs.
                uncontrolled patterns, tokens/variants, etc.
              </li>
            </ul>
          </li>
        </ul>

        <Heading as="h2" className="text-secondary">
          Engineering
        </Heading>
        <ul>
          <li>
            Code reviews
            <ul>
              <li>
                I review code for: <i>correctness</i>, <i>design</i>, and{" "}
                <i>style</i>
              </li>
              <li>
                I ask clarifying questions before requesting rework and offer
                diff-ready suggestions where possible.
              </li>
              <li>
                I only block a PR if the code is not secure and correct—anything
                else is a nit-pick (but usually a valid one).
              </li>
            </ul>
          </li>
          <li>
            Pull requests
            <ul>
              <li>
                I prefer small, focused PRs with a crisp summary, context, and
                screenshots or recordings for UI changes.
              </li>
              <li>
                I keep commits atomic and squash fixups before merge unless
                history matters.
              </li>
            </ul>
          </li>
        </ul>
      </article>
    </>
  );
}
