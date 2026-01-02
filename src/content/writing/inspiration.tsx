import Heading from "../../components/heading/Heading";

export const metadata = {
  title: "Inspiration",
  description: "The act of drawing inspiration.",
  publishedDate: "2025-10-15",
};

export default function Inspiration() {
  return (
    <>
      <Heading>Inspiration</Heading>
      <p>
        I’ve been thinking a lot about where ideas come from, especially in
        technical work.
      </p>
      <p>
        My relationship with creative output is quite peculiar. It’s never felt
        natural to me to create something from “zero to one”. I’ve always found
        more truth in shaping and refining what already exists. After all,
        there’s{" "}
        <a href="https://www.biblegateway.com/passage/?search=Ecclesiastes%201%3A9&version=NIV">
          nothing new under the sun
        </a>
        .
      </p>
      <p>
        I came across Eliot’s line, in which the quote “bad artists copy, good
        artists steal” was paraphrased from:
      </p>
      <blockquote>
        <p>
          Immature poets imitate; mature poets steal; bad poets deface what they
          take, and good poets make it into something better, or at least
          something different. The good poet welds his theft into a whole of
          feeling which is unique, utterly different from that from which it was
          torn.
        </p>
      </blockquote>
      <p>
        To me, that quote captures the essence of the <em>creative process</em>.
        Drawing into what sparks our curiosity, combining them with our personal
        experiences and references, and slowly reinterpreting them into
        something that feels like our <em>own</em>.
      </p>
    </>
  );
}
