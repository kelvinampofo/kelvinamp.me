import { Metadata } from "next";

import Heading from "../../components/heading/Heading";


export const metadata = {
  title: "The Art of Saying No",
  description: "Mastering the art of saying “no”.",
  publishedDate: "2023-07-26T00:00:00Z",
};

export default function ArtOfSayingNo() {
  return (
    <>
      <Heading>The Art of Saying No</Heading>
      <p>
        Over the years, I have encountered a common piece of advice—learning to
        say <q>no</q>. Now I’m asking myself why a request should change my
        focus.
      </p>
      <p>
        I don’t want to simply become adept at saying no; I want to understand
        the motivations behind my decisions.
      </p>
      <p>
        My aim is to produce mindful, technical work that reflects my values and
        resonates with purpose. This requires a conscious effort to filter out
        any unnecessary commitments and distractions, enabling me to focus on
        projects that truly matter.
      </p>
      <p>
        Saying “no” isn’t about restriction but <em>liberation</em>. It allows
        me to set boundaries, protect my time and ideas, ensuring that I have
        the mental capacity to invest in the important things.
      </p>
      <p>
        Having numerous opportunities is wonderful, and I will always be
        grateful for them. However, without clear reasoning it does not
        necessarily equal abundance.
      </p>
      <p>
        Not a restricting rule but rather a guiding principle, beginning a
        better 26th year ahead.
      </p>
    </>
  );
}
