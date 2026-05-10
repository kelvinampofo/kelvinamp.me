import styles from "./Slide.module.css";

interface SlideImage {
  avif: string;
  webp: string;
  fallback: string;
}

interface SlideProps {
  title: string;
  image: SlideImage;
  alt: string;
  author: string;
  isPriority: boolean;
}

export default function Slide({
  title,
  image,
  alt,
  author,
  isPriority,
}: SlideProps) {
  return (
    <li className={styles.slideItem}>
      <figure className={styles.figure}>
        <picture className={styles.picture}>
          <source srcSet={image.avif} type="image/avif" />
          <source srcSet={image.webp} type="image/webp" />
          <img
            src={image.fallback}
            alt={alt}
            loading={isPriority ? "eager" : "lazy"}
            fetchPriority={isPriority ? "high" : "auto"}
            decoding="async"
            className={styles.image}
          />
        </picture>
        <figcaption
          className={styles.figcaption}
        >{`${title} by, ${author}`}</figcaption>
      </figure>
    </li>
  );
}
