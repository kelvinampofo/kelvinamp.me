"use client";

import clsx from "clsx";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";

import CentralLibraryImage from "../../../../../public/assets/images/carousel/central-library.webp";
import AliyevCenterImage from "../../../../../public/assets/images/carousel/heydar-aliyev-center.webp";
import KyotoStationImage from "../../../../../public/assets/images/carousel/kyoto-station.webp";
import ConcertHallImage from "../../../../../public/assets/images/carousel/walt-disney-concert-hall.webp";
import Chevron from "../../../../components/icons/Chevron";
import { clamp } from "../../../../utils/math";

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

const MAX_SLIDE_INDEX = slides.length - 1;

const SLIDE_WIDTH = 450;
const SLIDE_MARGIN = 20;

export default function Carousel() {
  const [slidePosition, setSlidePosition] = useState(0);
  const [isCursorLeft, setIsCursorLeft] = useState(false);
  const [isCursorRight, setIsCursorRight] = useState(false);

  const slideRef = useRef<HTMLUListElement | null>(null);

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
  const currentSlide = Math.floor(slidePosition / (SLIDE_WIDTH + SLIDE_MARGIN));

  function handleSlideChange(newSlideIndex: number) {
    const clampedSlideIndex = clamp(newSlideIndex, 0, MAX_SLIDE_INDEX);

    scrollToSlide(slideRef.current, clampedSlideIndex);
  }

  function handleMouseMove(event: React.MouseEvent<HTMLUListElement>) {
    const containerRect = event.currentTarget.getBoundingClientRect();
    const cursorDirection =
      event.clientX < containerRect.left + containerRect.width / 2
        ? "left"
        : "right";

    setIsCursorLeft(cursorDirection === "left");
    setIsCursorRight(cursorDirection === "right");
  }

  function handleMouseLeave() {
    setIsCursorLeft(false);
    setIsCursorRight(false);
  }

  function handleCarouselClick(event: React.MouseEvent<HTMLUListElement>) {
    if (!slideRef.current) return;

    const containerRect = slideRef.current.getBoundingClientRect();
    const mouseX = event.clientX;
    const slideThreshold = containerRect.left + containerRect.width / 2;

    // determine the new slide index based on mouse position
    const newSlideIndex =
      mouseX < slideThreshold ? currentSlide - 1 : currentSlide + 1;

    if (newSlideIndex >= 0 && newSlideIndex < slides.length) {
      handleSlideChange(newSlideIndex);
    }
  }

  const isAtStartOfSlide = currentSlide === 0;
  const isAtEndOfSlide = currentSlide >= MAX_SLIDE_INDEX;

  const cursorClasses = clsx(
    !isAtStartOfSlide && isCursorLeft && styles.cursorLeft,
    !isAtEndOfSlide && isCursorRight && styles.cursorRight
  );

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.buttonContainer}>
        <button
          onClick={() => handleSlideChange(currentSlide - 1)}
          disabled={isAtStartOfSlide}
          className={styles.arrowButton}
        >
          <Chevron direction="left" size={20} aria-label="Chevron left Icon" />
          <span className="sr-only">Previous slide</span>
        </button>
      </div>
      <ul
        ref={slideRef}
        data-list="unstyled"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleCarouselClick}
        onScroll={(event) => {
          setSlidePosition(event.currentTarget.scrollLeft);
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
      <div className={styles.buttonContainer}>
        <button
          onClick={() => handleSlideChange(currentSlide + 1)}
          disabled={isAtEndOfSlide}
          className={styles.arrowButton}
        >
          <Chevron
            direction="right"
            size={20}
            aria-label="Chevron right Icon"
          />
          <span className="sr-only">Next slide</span>
        </button>
      </div>
    </div>
  );
}
