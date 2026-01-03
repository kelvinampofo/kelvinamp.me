import Heading from "../../components/heading/Heading";
import Separator from "../../components/separator/Separator";

export const metadata = {
  title: "Motion",
  description: "Some thoughts on motion and macOS interaction design.",
  publishedDate: "2023-10-02",
};

export default function Motion() {
  return (
    <>
      <Heading>Motion</Heading>
      <p>
        I’m really enjoying macOS Sonoma so far. The updated interface of the
        lock screen and the smooth login transition enhances the overall
        usability and adds a touch of elegance to the operating system. For me,
        interaction design like this makes the human-computer interaction feel
        delightful.
      </p>
      <p>
        Those seemingly small yet impactful micro-interactions, often go
        unnoticed but contribute significantly to the user experience.{" "}
        <a href="https://family.co/">Family</a> and Apple is an example of
        companies that implements this well.
      </p>
      <p>
        However, routine actions that are low in novelty should refrain from
        unnecessary animations. For instance, the right-click panel on macOS
        employs a subtle animation when closing, but opens instantly. On the
        other hand, actions that are less frequent, such as the login process,
        benefit from the addition of smooth motion&mdash;creating an organic
        experience.
      </p>
      <Heading as="h2">References</Heading>
      <Separator />
      <ol>
        <li>
          <a href="https://www.apple.com/uk/macos/sonoma/">macOS Sonoma</a>
        </li>
        <li>
          <a href="https://youtu.be/fZpTvZuysIo?si=9DXOsMmIlEGyt7R-">
            Motion &amp; Playfulness
          </a>
        </li>
        <li>
          <a href="https://family.co/blog/unveiling-previews">
            Family - Unveiling Previews
          </a>
        </li>
      </ol>
    </>
  );
}
