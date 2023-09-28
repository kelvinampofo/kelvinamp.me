import Image, { StaticImageData } from 'next/image';

interface SlideProps {
  title: string;
  image: string | StaticImageData;
  alt: string;
  author: string;
  isPriority: boolean;
}

export default function Slide({ title, image, alt, author, isPriority }: SlideProps) {
  return (
    <li className="relative mr-5 w-[250px] shrink-0 overscroll-x-contain bg-white text-center transition-all last:mr-0 md:w-[450px] md:snap-start md:snap-always lg:w-[450px] lg:snap-start lg:snap-always">
      <figure>
        <Image
          src={image}
          alt={alt}
          fill
          placeholder="blur"
          priority={isPriority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-fill"
        />
        <figcaption className="absolute bottom-[-25px] left-0 w-full text-start text-xs text-secondary dark:text-secondary-dark">{`${title} by, ${author}`}</figcaption>
      </figure>
    </li>
  );
}
