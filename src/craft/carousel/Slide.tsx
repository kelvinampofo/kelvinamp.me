import Image, { type StaticImageData } from "next/image";

import styles from "./Slide.module.css";

interface SlideProps {
  title: string;
  image: string | StaticImageData;
  blurDataURL: string;
  alt: string;
  author: string;
  isPriority: boolean;
}

export default function Slide({
  title,
  image,
  blurDataURL,
  alt,
  author,
  isPriority,
}: SlideProps) {
  return (
    <li className={styles.slideItem}>
      <figure className={styles.figure}>
        <Image
          src={image}
          alt={alt}
          fill
          placeholder="blur"
          blurDataURL={blurDataURL}
          priority={isPriority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.image}
        />
        <figcaption
          className={styles.figcaption}
        >{`${title} by, ${author}`}</figcaption>
      </figure>
    </li>
  );
}
