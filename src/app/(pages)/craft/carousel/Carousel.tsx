'use client';

import usePointerDevice from '@/app/hooks/usePointerDevice';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import c from 'clsx';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import CentralLibraryImage from '../../../../../public/assets/carousel/central-library.webp';
import AliyevCenterImage from '../../../../../public/assets/carousel/heydar-aliyev-center.webp';
import KyotoStationImage from '../../../../../public/assets/carousel/kyoto-station.webp';
import SydneyHarbourImage from '../../../../../public/assets/carousel/sydney-harbour.jpg';
import ConcertHallImage from '../../../../../public/assets/carousel/walt-disney-concert-hall.webp';
import Slide from './Slide';

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
    author: 'İltun Huseynli',
    isPriority: false
  },
  {
    title: 'Calgary Central Library',
    src: CentralLibraryImage,
    alt: 'The interior of Calgary Central Library, Canada',
    author: 'Angela Bailey',
    isPriority: false
  },
  {
    title: 'Sydney Harbour Bridge',
    src: SydneyHarbourImage,
    alt: 'Sydney Harbour Bridge, Milsons Point, Australia',
    author: 'Connor Meakins',
    isPriority: false
  }
];

const SLIDE_WIDTH = 450;
const SLIDE_MARGIN = 20;

export default function Carousel() {
  const slideRef = useRef<HTMLUListElement | null>(null);

  const [slidePosition, setSlidePosition] = useState(0);
  const [isCursorLeft, setIsCursorLeft] = useState(false);
  const [isCursorRight, setIsCursorRight] = useState(false);

  const { isPointerDevice } = usePointerDevice();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!slideRef.current) return false;

      const containerRect = slideRef.current.getBoundingClientRect();

      const mouseX = e.clientX;

      const cursorDirection =
        mouseX < containerRect.left + containerRect.width / 2 ? 'left' : 'right';

      setIsCursorLeft(cursorDirection === 'left');
      setIsCursorRight(cursorDirection === 'right');
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const hasReachedEndOfSlide = () => {
    if (!slideRef.current) return;
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

  const currentSlide = useMemo(() => {
    return Math.floor(slidePosition / (SLIDE_WIDTH + SLIDE_MARGIN));
  }, [slidePosition]);

  const handleSlideChange = useCallback((newSlideIndex: number) => {
    scrollToSlide(slideRef.current, newSlideIndex);
  }, []);

  const handleCarouselClick = (e: React.MouseEvent<HTMLUListElement>) => {
    if (!slideRef.current) return;
    const containerRect = slideRef.current.getBoundingClientRect();
    const mouseX = e.clientX;

    const slideThreshold = containerRect.left + containerRect.width / 2;

    if (mouseX < slideThreshold && currentSlide > 0) {
      handleSlideChange(currentSlide - 1);
    } else if (mouseX >= slideThreshold && currentSlide < slides.length - 1) {
      handleSlideChange(currentSlide + 1);
    }
  };

  const cursorClasses = c(
    currentSlide !== 0 && isCursorLeft && 'cursor-w-resize',
    !hasReachedEndOfSlide() && isCursorRight && 'cursor-e-resize'
  );

  return (
    <>
      {isPointerDevice && (
        <div className="flex items-center">
          <button
            onClick={() => handleSlideChange(currentSlide - 1)}
            disabled={currentSlide === 0}
            className={c(
              'mr-2 rounded-sm text-neutral-600 hover:text-neutral-400 duration-150 dark:border-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-400 disabled:cursor-not-allowed disabled:text-neutral-300 dark:disabled:text-neutral-600'
            )}
          >
            <ChevronLeftIcon width={25} height={25} aria-label="Left chevron icon" />
            <span className="sr-only">Previous slide</span>
          </button>
        </div>
      )}
      <ul
        ref={slideRef}
        onClick={handleCarouselClick}
        onScroll={(e) => {
          setSlidePosition(e.currentTarget.scrollLeft);
        }}
        className={c(
          'flex h-[350px] overflow-x-auto bg-scroll pb-10 md:h-[600px] md:snap-x md:snap-mandatory md:pb-12 lg:h-[600px] lg:pb-12',
          cursorClasses
        )}
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
        <div className="flex items-center">
          <button
            onClick={() => handleSlideChange(currentSlide + 1)}
            disabled={hasReachedEndOfSlide()}
            className={c(
              'ml-2 rounded-sm text-neutral-600 hover:text-neutral-400 duration-150 dark:border-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-400 disabled:cursor-not-allowed disabled:text-neutral-300 dark:disabled:text-neutral-600'
            )}
          >
            <ChevronRightIcon width={25} height={25} aria-label="Right chevron icon" />
            <span className="sr-only">Next slide</span>
          </button>
        </div>
      )}
    </>
  );
}
