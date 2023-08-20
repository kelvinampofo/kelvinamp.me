'use client';

import usePointerDeviceDetector from '@/app/hooks/usePointerDeviceDetector';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { useCallback, useMemo, useRef, useState } from 'react';

const slides = [
  {
    title: 'Walt Disney Concert Hall',
    imageUrl: '/assets/carousel/walt-disney-concert-hall.webp',
    imageAlt: 'Walt Disney Concert Hall',
    author: 'Ranjith Alingal',
    isPriority: true
  },
  {
    title: 'Kyoto Station',
    imageUrl: '/assets/carousel/kyoto-station.webp',
    imageAlt: 'Kyoto Station by Hiroshi Hara (1997)',
    author: 'Hiroshi Hara',
    isPriority: true
  },
  {
    title: 'Heydar Aliyev Center',
    imageUrl: '/assets/carousel/heydar-aliyev-center.webp',
    imageAlt: 'Heydar Aliyev Center, Baku Azerbaijan',
    author: 'İltun Huseynli'
  },
  {
    title: 'Calgary Central Library',
    imageUrl: '/assets/carousel/central-library.webp',
    imageAlt: 'Interior of Calgary Central Library, Canada',
    author: 'Angela Bailey'
  }
];
const SLIDE_WIDTH = 450;
const SLIDE_MARGIN = 20;

export default function Carousel() {
  const slideRef = useRef<HTMLUListElement | null>(null);
  const [slidePosition, setSlidePosition] = useState(0);
  const { isPointerDevice } = usePointerDeviceDetector();

  // check if the user has scrolled to the end of the slide container
  const scrolledToEndOfSlide = () => {
    if (!slideRef.current) return false;
    return (
      slideRef.current.scrollLeft + slideRef.current.clientWidth === slideRef.current.scrollWidth
    );
  };

  const scrollToSlide = (slider: HTMLUListElement | null, currentSlideIndex: number) => {
    if (!slider) return;
    slider.scrollTo({
      left: currentSlideIndex * (SLIDE_WIDTH + SLIDE_MARGIN),
      behavior: 'smooth'
    });
  };

  // calculate the current slide index based on the slide position
  const currentSlide = useMemo(() => {
    return Math.floor(slidePosition / (SLIDE_WIDTH + SLIDE_MARGIN));
  }, [slidePosition]);

  const handleNextSlide = useCallback(() => {
    scrollToSlide(slideRef.current, currentSlide + 1);
  }, [currentSlide]);

  const handlePreviousSlide = useCallback(() => {
    scrollToSlide(slideRef.current, currentSlide - 1);
  }, [currentSlide]);

  return (
    <>
      <ul
        className="flex h-[350px] max-w-4xl overflow-x-auto pb-10 md:h-[600px] md:snap-x md:snap-mandatory lg:h-[600px]"
        onScroll={(e) => {
          setSlidePosition(e.currentTarget.scrollLeft);
        }}
        ref={slideRef}
      >
        {slides.map(({ title, imageUrl, imageAlt, author, isPriority }) => (
          <li
            key={title}
            className="relative mr-5 w-[250px] shrink-0 overscroll-x-contain rounded-lg bg-white text-center transition-all duration-300 last:mr-0 md:w-[450px] md:snap-start md:snap-always lg:w-[450px] lg:snap-start lg:snap-always"
          >
            <figure>
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                priority={isPriority}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="rounded-md object-fill"
              />
              <figcaption className="absolute bottom-[-25px] left-0 w-full text-start text-xs text-[#6F6F6F] dark:text-neutral-400">{`${title} by, ${author}`}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
      {isPointerDevice && (
        <div className="mt-2 flex justify-between">
          <button
            onClick={handlePreviousSlide}
            disabled={currentSlide === 0}
            className="rounded-full disabled:cursor-not-allowed disabled:text-neutral-300 dark:disabled:text-neutral-600"
          >
            <ChevronLeftIcon width={25} height={25} aria-label="Left chevron icon" />
            <span className="sr-only">Previous</span>
          </button>

          <button
            onClick={handleNextSlide}
            disabled={scrolledToEndOfSlide()}
            className="rounded-full disabled:cursor-not-allowed disabled:text-neutral-300 dark:disabled:text-neutral-600"
          >
            <ChevronRightIcon width={25} height={25} aria-label="Right chevron icon" />
            <span className="sr-only">Next</span>
          </button>
        </div>
      )}
    </>
  );
}
