'use client';

import Callout from '@/app/components/generic/Callout';
import Card from '@/app/components/generic/Card';
import FocusedReading from '@/app/components/ui/FocusedReading';
import usePointerDevice from '@/app/hooks/usePointerDevice';
import React from 'react';

export default function FocusedReadingPrototype() {
  const { isPointerDevice } = usePointerDevice();

  return (
    <>
      {!isPointerDevice && (
        <div className="flex flex-col gap-3">
          <Callout color="amber">This protype requires a pointer device.</Callout>
          <Card className="m-2 flex h-52 items-center justify-center">
            <video autoPlay playsInline className="h-auto w-auto rounded-sm">
              <source src="/assets/videos/focused-reading.mp4" type="video/mp4" />
            </video>
          </Card>
        </div>
      )}
      {isPointerDevice && (
        <Card className="flex h-52 items-center justify-center gap-12 md:gap-20">
          <FocusedReading>
            <div className="flex flex-col gap-2 p-1">
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, architecto.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, officia!</p>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum, impedit!</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, maiores!</p>
            </div>
          </FocusedReading>
        </Card>
      )}
    </>
  );
}
