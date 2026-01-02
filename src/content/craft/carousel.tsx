import Carousel from "../../app/craft/components/carousel/Carousel";
import Heading from "../../components/heading/Heading";


export const metadata = {
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
