'use client';

import usePointerDevice from '@/app/hooks/usePointerDevice';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { useCallback, useMemo, useRef, useState } from 'react';
import CentralLibraryImage from '../../../../../public/assets/carousel/central-library.webp';
import AliyevCenterImage from '../../../../../public/assets/carousel/heydar-aliyev-center.webp';
import KyotoStationImage from '../../../../../public/assets/carousel/kyoto-station.webp';
import SydneyHarbourImage from '../../../../../public/assets/carousel/sydney-harbour.jpg';
import ConcertHallImage from '../../../../../public/assets/carousel/walt-disney-concert-hall.webp';

const slides = [
  {
    title: 'Walt Disney Concert Hall',
    src: ConcertHallImage,
    alt: 'Walt Disney Concert Hall',
    author: 'Ranjith Alingal',
    isPriority: true
  },
  {
    title: 'Kyoto Station',
    src: KyotoStationImage,
    alt: 'Kyoto Station by Hiroshi Hara (1997)',
    author: 'Hiroshi Hara',
    isPriority: true
  },
  {
    title: 'Heydar Aliyev Center',
    src: AliyevCenterImage,
    alt: 'The Heydar Aliyev Center, Baku Azerbaijan',
    author: 'İltun Huseynli'
  },
  {
    title: 'Calgary Central Library',
    src: CentralLibraryImage,
    alt: 'The interior of Calgary Central Library, Canada',
    author: 'Angela Bailey'
  },
  {
    title: 'Sydney Harbour Bridge',
    src: SydneyHarbourImage,
    alt: 'Sydney Harbour Bridge, Milsons Point, Australia',
    author: 'Connor Meakins'
  }
];

const SLIDE_WIDTH = 450;
const SLIDE_MARGIN = 20;

export default function Carousel() {
  const slideRef = useRef<HTMLUListElement | null>(null);
  const [slidePosition, setSlidePosition] = useState(0);
  const { isPointerDevice } = usePointerDevice();

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

  const handleSlideChange = useCallback((newSlideIndex: number) => {
    scrollToSlide(slideRef.current, newSlideIndex);
  }, []);

  return (
    <>
      {isPointerDevice && (
        <div className="flex items-center">
          <button
            onClick={() => handleSlideChange(currentSlide - 1)}
            disabled={currentSlide === 0}
            className="mr-2 rounded-sm text-neutral-600 duration-100 hover:bg-neutral-200 disabled:cursor-not-allowed disabled:bg-inherit disabled:text-neutral-300 hover:disabled:bg-gray-50 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:disabled:text-neutral-600 dark:hover:disabled:bg-[#161616]"
          >
            <ChevronLeftIcon width={25} height={25} aria-label="Left chevron icon" />
            <span className="sr-only">Previous slide</span>
          </button>
        </div>
      )}
      <ul
        className="flex h-[350px] overflow-x-auto bg-scroll pb-10 md:h-[600px] md:snap-x md:snap-mandatory md:pb-12 lg:h-[600px] lg:pb-12"
        onScroll={(e) => {
          setSlidePosition(e.currentTarget.scrollLeft);
        }}
        ref={slideRef}
      >
        {slides.map(({ title, src, alt, author, isPriority }) => (
          <li
            key={title}
            className="relative mr-5 w-[250px] shrink-0 overscroll-x-contain rounded-sm bg-white text-center transition-all last:mr-0 md:w-[450px] md:snap-start md:snap-always lg:w-[450px] lg:snap-start lg:snap-always"
          >
            <figure>
              <Image
                src={src}
                alt={alt}
                fill
                placeholder="blur"
                priority={isPriority}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="rounded-sm object-fill"
              />
              <figcaption className="absolute bottom-[-25px] left-0 w-full text-start text-xs text-[#6F6F6F] dark:text-neutral-400">{`${title} by, ${author}`}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
      {isPointerDevice && (
        <div className="flex items-center">
          <button
            onClick={() => handleSlideChange(currentSlide + 1)}
            disabled={scrolledToEndOfSlide()}
            className="ml-2 rounded-sm text-neutral-600 duration-100 hover:bg-neutral-200 disabled:cursor-not-allowed disabled:bg-inherit disabled:text-neutral-300 hover:disabled:bg-gray-50 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:disabled:text-neutral-600 dark:hover:disabled:bg-[#161616]"
          >
            <ChevronRightIcon width={25} height={25} aria-label="Right chevron icon" />
            <span className="sr-only">Next slide</span>
          </button>
        </div>
      )}
    </>
  );
}
