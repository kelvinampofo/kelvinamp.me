"use client";

import clsx from "clsx";
import dynamic from "next/dynamic";
import { useCallback, useMemo, useRef, useState } from "react";

import CentralLibraryImage from "../../../../../public/assets/images/carousel/central-library.webp";
import AliyevCenterImage from "../../../../../public/assets/images/carousel/heydar-aliyev-center.webp";
import KyotoStationImage from "../../../../../public/assets/images/carousel/kyoto-station.webp";
import ConcertHallImage from "../../../../../public/assets/images/carousel/walt-disney-concert-hall.webp";
import usePointerDevice from "../../../../hooks/usePointerDevice";

import styles from "./Carousel.module.css";

const Slide = dynamic(() => import("./Slide"), { ssr: true });

const slides = [
  {
    title: "Walt Disney Concert Hall",
    src: ConcertHallImage,
    alt: "Walt Disney Concert Hall",
    author: "Ranjith Alingal",
    isPriority: true,
  },
  {
    title: "Calgary Central Library",
    src: CentralLibraryImage,
    alt: "The interior of Calgary Central Library, Canada",
    author: "Angela Bailey",
    isPriority: false,
  },
  {
    title: "Heydar Aliyev Center",
    src: AliyevCenterImage,
    alt: "The Heydar Aliyev Center, Baku Azerbaijan",
    author: "İltun Huseynli",
    isPriority: false,
  },
  {
    title: "Kyoto Station",
    src: KyotoStationImage,
    alt: "Kyoto Station (1997)",
    author: "Hiroshi Hara",
    isPriority: true,
  },
];

const SLIDE_WIDTH = 450;
const SLIDE_MARGIN = 20;

export default function Carousel() {
  const [slidePosition, setSlidePosition] = useState(0);
  const [isCursorLeft, setIsCursorLeft] = useState(false);
  const [isCursorRight, setIsCursorRight] = useState(false);

  const slideRef = useRef<HTMLUListElement | null>(null);

  const { isPointerDevice } = usePointerDevice();

  function hasReachedEndOfSlide() {
    if (!slideRef.current) return;

    return (
      slideRef.current.scrollLeft + slideRef.current.clientWidth ===
      slideRef.current.scrollWidth
    );
  }

  function scrollToSlide(
    slider: HTMLUListElement | null,
    currentSlideIndex: number
  ) {
    if (!slider) return;

    slider.scrollTo({
      left: currentSlideIndex * (SLIDE_WIDTH + SLIDE_MARGIN),
      behavior: "smooth",
    });
  }

  // calculate the current slide index based on slide position
  const currentSlide = useMemo(() => {
    return Math.floor(slidePosition / (SLIDE_WIDTH + SLIDE_MARGIN));
  }, [slidePosition]);

  const handleSlideChange = useCallback((newSlideIndex: number) => {
    scrollToSlide(slideRef.current, newSlideIndex);
  }, []);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLUListElement>) => {
      const containerRect = event.currentTarget.getBoundingClientRect();
      const cursorDirection =
        event.clientX < containerRect.left + containerRect.width / 2
          ? "left"
          : "right";

      setIsCursorLeft(cursorDirection === "left");
      setIsCursorRight(cursorDirection === "right");
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setIsCursorLeft(false);
    setIsCursorRight(false);
  }, []);

  const handleCarouselClick = (e: React.MouseEvent<HTMLUListElement>) => {
    if (!slideRef.current) return;

    const containerRect = slideRef.current.getBoundingClientRect();
    const mouseX = e.clientX;
    const slideThreshold = containerRect.left + containerRect.width / 2;

    // determine the new slide index based on mouse position
    const newSlideIndex =
      mouseX < slideThreshold ? currentSlide - 1 : currentSlide + 1;

    if (newSlideIndex >= 0 && newSlideIndex < slides.length) {
      handleSlideChange(newSlideIndex);
    }
  };

  const cursorClasses = clsx(
    currentSlide !== 0 && isCursorLeft && styles.cursorLeft,
    !hasReachedEndOfSlide() && isCursorRight && styles.cursorRight
  );

  return (
    <div className={styles.carouselContainer}>
      {isPointerDevice && (
        <div className={styles.buttonContainer}>
          <button
            onClick={() => handleSlideChange(currentSlide - 1)}
            disabled={currentSlide === 0}
            className={styles.arrowButton}
          >
            <svg
              height={20}
              width={20}
              aria-label="Chevron left Icon"
              fill="none"
              viewBox="0 0 15 15"
            >
              <path
                fill="currentColor"
                d="M8.842 3.135a.5.5 0 0 1 .023.707L5.435 7.5l3.43 3.658a.5.5 0 0 1-.73.684l-3.75-4a.5.5 0 0 1 0-.684l3.75-4a.5.5 0 0 1 .707-.023Z"
              />
            </svg>
            <span className="sr-only">Previous slide</span>
          </button>
        </div>
      )}
      <ul
        ref={slideRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleCarouselClick}
        onScroll={(e) => {
          setSlidePosition(e.currentTarget.scrollLeft);
        }}
        className={clsx(styles.slideList, cursorClasses)}
      >
        {slides.map(({ title, src, alt, author, isPriority }) => (
          <Slide
            key={title}
            title={title}
            image={src}
            alt={alt}
            author={author}
            isPriority={isPriority}
          />
        ))}
      </ul>
      {isPointerDevice && (
        <div className={styles.buttonContainer}>
          <button
            onClick={() => handleSlideChange(currentSlide + 1)}
            disabled={hasReachedEndOfSlide()}
            className={styles.arrowButton}
          >
            <svg
              data-name="chevron-right"
              height={20}
              width={20}
              aria-label="Chevron right Icon"
              fill="none"
              viewBox="0 0 15 15"
            >
              <path
                fill="currentColor"
                d="M6.158 3.135a.5.5 0 0 1 .707.023l3.75 4a.5.5 0 0 1 0 .684l-3.75 4a.5.5 0 1 1-.73-.684L9.566 7.5l-3.43-3.658a.5.5 0 0 1 .023-.707Z"
              />
            </svg>
            <span className="sr-only">Next slide</span>
          </button>
        </div>
      )}
    </div>
  );
}
