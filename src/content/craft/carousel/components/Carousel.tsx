"use client";

import clsx from "clsx";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

import Chevron from "../../../../components/icons/Chevron";

import styles from "./Carousel.module.css";

const Slide = dynamic(() => import("./Slide"), { ssr: true });

const slides = [
  {
    title: "Walt Disney Concert Hall",
    image: {
      avif: "/assets/images/carousel/walt-disney-concert-hall.avif",
      webp: "/assets/images/carousel/walt-disney-concert-hall.webp",
      fallback: "/assets/images/carousel/walt-disney-concert-hall.webp",
    },
    alt: "Walt Disney Concert Hall",
    author: "Ranjith Alingal",
    isPriority: true,
  },
  {
    title: "Calgary Central Library",
    image: {
      avif: "/assets/images/carousel/central-library.avif",
      webp: "/assets/images/carousel/central-library.webp",
      fallback: "/assets/images/carousel/central-library.webp",
    },
    alt: "The interior of Calgary Central Library, Canada",
    author: "Angela Bailey",
    isPriority: false,
  },
  {
    title: "Heydar Aliyev Center",
    image: {
      avif: "/assets/images/carousel/heydar-aliyev-center.avif",
      webp: "/assets/images/carousel/heydar-aliyev-center.webp",
      fallback: "/assets/images/carousel/heydar-aliyev-center.webp",
    },
    alt: "The Heydar Aliyev Center, Baku Azerbaijan",
    author: "İltun Huseynli",
    isPriority: false,
  },
  {
    title: "Kyoto Station",
    image: {
      avif: "/assets/images/carousel/kyoto-station.avif",
      webp: "/assets/images/carousel/kyoto-station.webp",
      fallback: "/assets/images/carousel/kyoto-station.webp",
    },
    alt: "Kyoto Station (1997)",
    author: "Hiroshi Hara",
    isPriority: true,
  },
];

const SCROLL_TOLERANCE = 1;

export default function Carousel() {
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [isCursorLeft, setIsCursorLeft] = useState(false);
  const [isCursorRight, setIsCursorRight] = useState(false);

  const slideRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const slider = slideRef.current;
    if (!slider) return;

    const syncScrollEdges = () => {
      const { scrollLeft, scrollWidth, clientWidth } = slider;
      setIsAtStart(scrollLeft <= SCROLL_TOLERANCE);
      setIsAtEnd(scrollLeft >= scrollWidth - clientWidth - SCROLL_TOLERANCE);
    };

    const observer = new ResizeObserver(syncScrollEdges);
    observer.observe(slider);
    slider.addEventListener("scroll", syncScrollEdges);

    return () => {
      observer.disconnect();
      slider.removeEventListener("scroll", syncScrollEdges);
    };
  }, []);

  function handleSlideChange(direction: "previous" | "next") {
    const slider = slideRef.current;
    const firstSlide = slider?.firstElementChild;
    if (!slider || !firstSlide) return;

    const { scrollLeft, scrollWidth, clientWidth } = slider;
    const end = scrollWidth - clientWidth;
    const start = firstSlide.getBoundingClientRect().left;
    const offsets = Array.from(slider.children, (slide) =>
      Math.min(end, slide.getBoundingClientRect().left - start),
    );
    const offset =
      direction === "next"
        ? offsets.find((position) => position > scrollLeft + SCROLL_TOLERANCE)
        : offsets.findLast((position) => position < scrollLeft - SCROLL_TOLERANCE);

    if (offset !== undefined) {
      slider.scrollTo({ left: offset, behavior: "smooth" });
    }
  }

  function handleMouseMove(event: React.MouseEvent<HTMLUListElement>) {
    const containerRect = event.currentTarget.getBoundingClientRect();
    const cursorDirection =
      event.clientX < containerRect.left + containerRect.width / 2 ? "left" : "right";

    setIsCursorLeft(cursorDirection === "left");
    setIsCursorRight(cursorDirection === "right");
  }

  function handleMouseLeave() {
    setIsCursorLeft(false);
    setIsCursorRight(false);
  }

  function handleCarouselClick(event: React.MouseEvent<HTMLUListElement>) {
    const { left, width } = event.currentTarget.getBoundingClientRect();
    handleSlideChange(event.clientX < left + width / 2 ? "previous" : "next");
  }

  const cursorClasses = clsx(
    !isAtStart && isCursorLeft && styles.previousCursor,
    !isAtEnd && isCursorRight && styles.nextCursor,
  );

  return (
    <div className={styles.carousel}>
      <div className={styles.navigationSlot}>
        <button
          type="button"
          onClick={() => handleSlideChange("previous")}
          disabled={isAtStart}
          className={styles.navigationButton}
          aria-label="Previous slide"
        >
          <Chevron direction="left" size={24} aria-hidden />
        </button>
      </div>
      <ul
        ref={slideRef}
        data-list="unstyled"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleCarouselClick}
        tabIndex={-1}
        className={clsx(styles.list, cursorClasses)}
      >
        {slides.map(({ title, image, alt, author, isPriority }) => (
          <Slide
            key={title}
            title={title}
            image={image}
            alt={alt}
            author={author}
            isPriority={isPriority}
          />
        ))}
      </ul>
      <div className={styles.navigationSlot}>
        <button
          type="button"
          onClick={() => handleSlideChange("next")}
          disabled={isAtEnd}
          className={styles.navigationButton}
          aria-label="Next slide"
        >
          <Chevron direction="right" size={24} aria-hidden />
        </button>
      </div>
    </div>
  );
}
