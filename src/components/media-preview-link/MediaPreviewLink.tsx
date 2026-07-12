"use client";

import { PreviewCard } from "@base-ui/react/preview-card";
import clsx from "clsx";
import Image from "next/image";
import { useRef, useState, type CSSProperties, type ReactNode } from "react";

import { MediaPlayer } from "../media-player/MediaPlayer";

import styles from "./MediaPreviewLink.module.css";

interface MediaPreviewVideo {
  type: "video";
  src: string;
  poster: string;
}

interface MediaPreviewImage {
  type: "image";
  src: string;
  width: number;
  height: number;
  unoptimized?: boolean;
}

interface MediaPreviewLinkProps {
  children: ReactNode;
  href: string;
  media: MediaPreviewVideo | MediaPreviewImage;
  aspectRatio?: CSSProperties["aspectRatio"];
  className?: string;
  openDelayMs?: number;
  closeDelayMs?: number;
}

const MEDIA_ASPECT_RATIO = "16 / 9";
const OPEN_DELAY_MS = 80;
const CLOSE_DELAY_MS = 100;

export default function MediaPreviewLink({
  children,
  href,
  media,
  aspectRatio = MEDIA_ASPECT_RATIO,
  className,
  openDelayMs = OPEN_DELAY_MS,
  closeDelayMs = CLOSE_DELAY_MS,
}: MediaPreviewLinkProps) {
  const [open, setOpen] = useState(false);
  const actionsRef = useRef<PreviewCard.Root.Actions>(null);

  return (
    <PreviewCard.Root actionsRef={actionsRef} onOpenChange={setOpen}>
      <PreviewCard.Trigger
        href={href}
        delay={openDelayMs}
        closeDelay={closeDelayMs}
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
            <div className={styles.media} style={{ aspectRatio }}>
              {media.type === "video" ? (
                <MediaPlayer.Root
                  className={styles.player}
                  shortcutsEnabled={open}
                >
                  <MediaPlayer.Video
                    className={styles.video}
                    src={media.src}
                    poster={media.poster}
                    loop={false}
                    preload="metadata"
                    onEnded={() => actionsRef.current?.close()}
                  />
                </MediaPlayer.Root>
              ) : (
                <Image
                  className={styles.image}
                  src={media.src}
                  width={media.width}
                  height={media.height}
                  sizes="(max-width: 512px) 100vw, 512px"
                  unoptimized={media.unoptimized}
                  alt=""
                />
              )}
            </div>
          </PreviewCard.Popup>
        </PreviewCard.Positioner>
      </PreviewCard.Portal>
    </PreviewCard.Root>
  );
}
