"use client";

import { PreviewCard } from "@base-ui/react/preview-card";
import clsx from "clsx";
import Image from "next/image";
import { useRef, useState, type CSSProperties, type ReactNode } from "react";

import usePointerDevice from "../../hooks/usePointerDevice";
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
  const [hasVideoIntent, setHasVideoIntent] = useState(false);

  const actionsRef = useRef<PreviewCard.Root.Actions>(null);
  const triggerRef = useRef<HTMLAnchorElement>(null);

  const { isPointerDevice } = usePointerDevice();

  function showProgress(video: HTMLVideoElement) {
    if (Number.isFinite(video.duration)) {
      const progress = (video.currentTime / video.duration) * 100;
      triggerRef.current?.style.setProperty("--progress", `${progress}%`);
    }
  }

  // timeupdate fires only about four times a second, too coarse for a smooth fill
  function trackProgress(video: HTMLVideoElement) {
    showProgress(video);

    if (!video.paused) {
      requestAnimationFrame(() => trackProgress(video));
    }
  }

  return (
    <PreviewCard.Root actionsRef={actionsRef} onOpenChange={setOpen}>
      <PreviewCard.Trigger
        ref={triggerRef}
        href={href}
        delay={openDelayMs}
        closeDelay={closeDelayMs}
        className={clsx(styles.trigger, media.type === "video" && styles.progress, className)}
        onFocus={() => setHasVideoIntent(true)}
        onPointerEnter={() => setHasVideoIntent(true)}
      >
        {children}
      </PreviewCard.Trigger>
      <PreviewCard.Portal keepMounted={media.type === "video"}>
        <PreviewCard.Positioner
          side="top"
          align="center"
          sideOffset={14}
          className={styles.positioner}
        >
          <PreviewCard.Popup className={styles.popup}>
            <div className={styles.media} style={{ aspectRatio }}>
              {media.type === "video" ? (
                <MediaPlayer.Root className={styles.player} shortcutsEnabled={open}>
                  <MediaPlayer.Video
                    active={open}
                    className={styles.video}
                    src={media.src}
                    poster={media.poster}
                    loop={false}
                    muted={false}
                    // the card opens on mouse hover, so touch readers rarely see the video
                    preload={isPointerDevice || hasVideoIntent ? "auto" : "none"}
                    onPlay={(event) => trackProgress(event.currentTarget)}
                    onTimeUpdate={(event) => showProgress(event.currentTarget)}
                    onEnded={() => actionsRef.current?.close()}
                  />
                </MediaPlayer.Root>
              ) : (
                <Image
                  className={styles.image}
                  src={media.src}
                  width={media.width}
                  height={media.height}
                  sizes="(max-width: 480px) 100vw, 480px"
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
