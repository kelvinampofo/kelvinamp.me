'use client';

import Card from '@/app/components/generic/Card';
import Container from '@/app/components/generic/Container';
import Callout from '@/app/components/ui/Callout';
import CopyLinkButton from '@/app/components/ui/CopyLinkButton';
import CustomLink from '@/app/components/ui/CustomLink';
import { allPrototypes } from '@/app/data/prototypes';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import { format, parseISO } from 'date-fns';
import Image from 'next/image';
import { notFound, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Tilt } from 'react-tilt';
import { Balancer } from 'react-wrap-balancer';
import ChipLogo from '../../../../../../public/assets/parallax-card/chip.svg';
import MasterCardLogo from '../../../../../../public/assets/parallax-card/mastercard.svg';

export default function ParallaxCard() {
  const path = usePathname().replace('/craft/', '/');
  const [isPointerDevice, setIsPointerDevice] = useState(true);

  // check if user's device has pointer
  useEffect(() => {
    const handlePointerChange = (e: MediaQueryListEvent) => {
      setIsPointerDevice(e.matches);
    };

    const pointerMediaQuery = window.matchMedia('(pointer: fine)');
    setIsPointerDevice(pointerMediaQuery.matches);

    pointerMediaQuery.addEventListener('change', handlePointerChange);

    return () => {
      pointerMediaQuery.removeEventListener('change', handlePointerChange);
    };
  }, []);

  const currentIndex = allPrototypes.findIndex((project) => project.href === path);
  const previousProject = allPrototypes[currentIndex - 1];
  const nextProject = allPrototypes[currentIndex + 1];

  const prototype = allPrototypes.find((prototype) => prototype.href === path);

  if (!prototype) {
    notFound();
  }

  return (
    <Container>
      <header className="flex flex-col justify-between gap-8">
        <span>
          <CustomLink href="/craft" ariaLabel="go back to craft page" arrowIcon>
            Craft
          </CustomLink>
        </span>
        <h1 className="text-lg font-medium">
          <Balancer>{prototype.title}</Balancer>
        </h1>
      </header>
      <div className="mb-6 flex justify-between gap-2 text-sm text-[#6F6F6F] dark:text-neutral-400">
        <time dateTime={prototype.publishedAt}>
          {format(parseISO(prototype.publishedAt), 'dd MMMM, yyyy')}
        </time>
        <CopyLinkButton />
      </div>
      <p className={clsx(!isPointerDevice ? 'mb-12' : 'mb-2')}>{prototype.summary}</p>
      {!isPointerDevice ? (
        <>
          <Callout color="amber" className="mb-6" ariaLabel="Warning callout" isAlert>
            This interface requires a pointer device.
          </Callout>
          <Card>
            <video
              autoPlay
              loop
              muted
              playsInline
              width="100%"
              height="100%"
              className="rounded-md"
              preload="none"
              aria-label="Credit card interface demo"
            >
              <source src="/assets/parallax-card/credit-card-demo.mp4" type="video/mp4" />
            </video>
          </Card>
        </>
      ) : (
        <Card className="mt-6">
          <Tilt
            options={{
              perspective: 2500,
              speed: 2000,
              scale: 1.05
            }}
            className={clsx(
              'flex h-64 w-96 content-center items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-800 font-mono'
            )}
          >
            <div className="h-full w-full p-8">
              <div className="relative h-full w-full">
                <Image
                  className="absolute top-16"
                  alt="Chip card logo"
                  src={ChipLogo}
                  width={50}
                  height={20}
                />
                <Image
                  className="absolute bottom-0 right-0 my-auto"
                  alt="Mastercard logo"
                  src={MasterCardLogo}
                  width={60}
                  height={30}
                />
              </div>
            </div>
          </Tilt>
        </Card>
      )}
      <section className="mt-6 flex justify-between text-sm">
        {previousProject && (
          <CustomLink href={`/craft/${previousProject.href}`} ariaLabel="Previous post">
            <div className="flex flex-col gap-1">
              <ArrowLeftIcon className="text-[#6F6F6F] dark:text-neutral-400" />
              {previousProject.title}
            </div>
          </CustomLink>
        )}
        <div className="flex grow" />
        {nextProject && (
          <CustomLink href={`/craft/${nextProject.href}`} ariaLabel="Next post">
            <div className="flex flex-col items-end gap-1">
              <ArrowRightIcon className="flex-1 text-[#6F6F6F] dark:text-neutral-400" />
              {nextProject.title}
            </div>
          </CustomLink>
        )}
      </section>
    </Container>
  );
}
