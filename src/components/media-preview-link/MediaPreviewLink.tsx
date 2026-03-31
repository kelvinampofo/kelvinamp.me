"use client";

import { PreviewCard } from "@base-ui/react/preview-card";
import clsx from "clsx";
import { useState } from "react";

import usePointerDevice from "../../hooks/usePointerDevice";
import { MediaPlayer } from "../media-player/MediaPlayer";

import styles from "./MediaPreviewLink.module.css";

interface VideoPreview {
  poster?: string;
  src: string;
}

interface MediaPreviewLinkProps {
  children: React.ReactNode;
  href: string;
  media: VideoPreview;
  className?: string;
  delay?: number;
  closeDelay?: number;
}

const DELAY = 80;
const CLOSE_DELAY = 100;

export default function MediaPreviewLink({
  children,
  href,
  media,
  className,
  delay = DELAY,
  closeDelay = CLOSE_DELAY,
}: MediaPreviewLinkProps) {
  const [open, setOpen] = useState(false);
  const { isPointerDevice } = usePointerDevice();

  return (
    <PreviewCard.Root open={open} onOpenChange={setOpen}>
      <PreviewCard.Trigger
        href={href}
        delay={delay}
        closeDelay={closeDelay}
        className={clsx(styles.trigger, className)}
        onClick={(event) => {
          if (isPointerDevice) {
            return;
          }

          if (!open) {
            event.preventDefault();
            setOpen(true);
          }
        }}
      >
        {children}
      </PreviewCard.Trigger>

      <PreviewCard.Portal>
        <PreviewCard.Positioner
          side="top"
          align="center"
          sideOffset={14}
          className={styles.positioner}
        >
          <PreviewCard.Popup className={styles.popup}>
            <MediaPlayer.Root className={styles.player}>
              <MediaPlayer.Video
                className={styles.video}
                src={media.src}
                poster={media.poster}
                muted={false}
                loop={false}
                preload="auto"
                onEnded={() => {
                  setOpen(false);
                }}
              />
            </MediaPlayer.Root>
          </PreviewCard.Popup>
        </PreviewCard.Positioner>
      </PreviewCard.Portal>
    </PreviewCard.Root>
  );
}
