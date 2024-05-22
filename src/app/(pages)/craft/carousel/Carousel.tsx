'use client';

import Card from '@/app/components/generic/Card';
import { Icon } from '@/app/components/ui/Icon';
import usePointerDevice from '@/app/hooks/usePointerDevice';
import c from 'clsx';
import CentralLibraryImage from 'public/assets/images/carousel/central-library.webp';
import AliyevCenterImage from 'public/assets/images/carousel/heydar-aliyev-center.webp';
import KyotoStationImage from 'public/assets/images/carousel/kyoto-station.webp';
import ConcertHallImage from 'public/assets/images/carousel/walt-disney-concert-hall.webp';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
    title: 'Calgary Central Library',
    src: CentralLibraryImage,
    alt: 'The interior of Calgary Central Library, Canada',
    author: 'Angela Bailey',
    isPriority: false
  },
  {
    title: 'Heydar Aliyev Center',
    src: AliyevCenterImage,
    alt: 'The Heydar Aliyev Center, Baku Azerbaijan',
    author: 'İltun Huseynli',
    isPriority: false
  },
  {
    title: 'Kyoto Station',
    src: KyotoStationImage,
    alt: 'Kyoto Station (1997)',
    author: 'Hiroshi Hara',
    isPriority: true
  }
];

const SLIDE_WIDTH = 450;
const SLIDE_MARGIN = 20;

export default function Carousel() {
  const [slidePosition, setSlidePosition] = useState(0);
  const [isCursorLeft, setIsCursorLeft] = useState(false);
  const [isCursorRight, setIsCursorRight] = useState(false);

  const slideRef = useRef<HTMLUListElement | null>(null);

  const { isPointerDevice } = usePointerDevice();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!slideRef.current) return;

      // get container dimensions and mouse position
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

  // calculate the current slide index based on slide position
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

    // determine the new slide index based on mouse position
    const newSlideIndex = mouseX < slideThreshold ? currentSlide - 1 : currentSlide + 1;

    if (newSlideIndex >= 0 && newSlideIndex < slides.length) {
      handleSlideChange(newSlideIndex);
    }
  };

  const cursorClasses = c(
    currentSlide !== 0 && isCursorLeft && 'cursor-w-resize',
    !hasReachedEndOfSlide() && isCursorRight && 'cursor-e-resize'
  );

  return (
    <Card className="flex sm:pt-6 md:px-2 md:pt-8 lg:px-2 lg:pt-8">
      {isPointerDevice && (
        <div className="flex items-center">
          <button
            onClick={() => handleSlideChange(currentSlide - 1)}
            disabled={currentSlide === 0}
            className={c(
              'mr-2 rounded-sm text-secondary duration-150 hover:text-primary disabled:cursor-not-allowed disabled:text-neutral-300 dark:border-neutral-800 dark:text-secondary-dark dark:hover:text-primary-dark dark:disabled:text-neutral-600'
            )}
          >
            <Icon
              name="chevron-left"
              width={25}
              height={25}
              aria-hidden="true"
              className="active:scale-95"
            />
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
          'flex h-[350px] overflow-x-auto bg-scroll pb-10 will-change-scroll md:h-[600px] md:snap-x md:snap-mandatory md:pb-12 lg:h-[600px] lg:pb-12',
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
              'ml-2 rounded-sm text-secondary duration-150 hover:text-primary disabled:cursor-not-allowed disabled:text-neutral-300 dark:border-neutral-800 dark:text-secondary-dark dark:hover:text-primary-dark dark:disabled:text-neutral-600'
            )}
          >
            <Icon
              name="chevron-right"
              width={25}
              height={25}
              aria-hidden="true"
              className="active:scale-95"
            />
            <span className="sr-only">Next slide</span>
          </button>
        </div>
      )}
    </Card>
  );
}
