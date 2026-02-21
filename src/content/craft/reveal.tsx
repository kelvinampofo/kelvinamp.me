import Reveal from "../../app/craft/components/reveal/Reveal";
import Heading from "../../components/heading/Heading";

export const metadata = {
  title: "Reveal",
  description: "Pointer-tracked image reveal.",
  publishedDate: "2026-02-01",
};

export default function RevealEntry() {
  return (
    <>
      <Heading>Reveal</Heading>
      <p>
        Pointer-tracked image reveal. Image filter from{" "}
        <a
          href="https://paper.design/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Paper
        </a>
        .
      </p>
      <p>
        A small detail: the edge eases toward the pointer using{" "}
        <a
          href="https://en.wikipedia.org/wiki/Linear_interpolation"
          target="_blank"
          rel="noopener noreferrer"
        >
          linear interpolation
        </a>
        , so it lags slightly behind—like pulling a curtain with some conceptual
        weight. Also, check the use of <code>mix-blend-mode: multiply</code>{" "}
        along the frame’s edge.
      </p>

      <Reveal />
    </>
  );
}
