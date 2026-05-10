"use client";

import { PreviewCard } from "@base-ui/react/preview-card";
import clsx from "clsx";
import { useState } from "react";

import usePointerDevice from "../../hooks/usePointerDevice";
import { MediaPlayer } from "../media-player/MediaPlayer";

import styles from "./MediaPreviewLink.module.css";

interface MediaPreviewVideo {
  type: "video";
  poster?: string;
  src: string;
}

interface MediaPreviewLinkProps {
  children: React.ReactNode;
  href: string;
  media: MediaPreviewVideo;
  className?: string;
  openDelayMs?: number;
  closeDelayMs?: number;
}

const OPEN_DELAY_MS = 80;
const CLOSE_DELAY_MS = 100;

export default function MediaPreviewLink({
  children,
  href,
  media,
  className,
  openDelayMs = OPEN_DELAY_MS,
  closeDelayMs = CLOSE_DELAY_MS,
}: MediaPreviewLinkProps) {
  const [open, setOpen] = useState(false);

  const { isPointerDevice } = usePointerDevice();

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
  }

  return (
    <PreviewCard.Root open={open} onOpenChange={handleOpenChange}>
      <PreviewCard.Trigger
        href={href}
        delay={openDelayMs}
        closeDelay={closeDelayMs}
        data-state={open ? "open" : "closed"}
        className={clsx(styles.trigger, className)}
        onClick={(event) => {
          if (isPointerDevice) {
            return;
          }

          if (!open) {
            event.preventDefault();
            handleOpenChange(true);
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
                  handleOpenChange(false);
                }}
              />
            </MediaPlayer.Root>
          </PreviewCard.Popup>
        </PreviewCard.Positioner>
      </PreviewCard.Portal>
    </PreviewCard.Root>
  );
}
