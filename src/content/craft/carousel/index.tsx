import Heading from "../../../components/heading/Heading";

import Carousel from "./components/Carousel";

import type { ContentEntryMetadata } from "../../collection";

export const metadata: ContentEntryMetadata = {
  title: "Carousel",
  description: "A minimal CSS based carousel.",
  publishedDate: "2023-08-19",
};

export default function CarouselEntry() {
  return (
    <>
      <Heading>Carousel</Heading>
      <p>A minimal CSS based carousel.</p>
      <Carousel />
    </>
  );
}
