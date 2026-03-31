"use client";

import { PreviewCard } from "@base-ui/react/preview-card";
import clsx from "clsx";

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
  return (
    <PreviewCard.Root>
      <PreviewCard.Trigger
        href={href}
        delay={delay}
        closeDelay={closeDelay}
        className={clsx(styles.trigger, className)}
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
              />
            </MediaPlayer.Root>
          </PreviewCard.Popup>
        </PreviewCard.Positioner>
      </PreviewCard.Portal>
    </PreviewCard.Root>
  );
}
