"use client";

import clsx from "clsx";
import {
  useContext,
  type ComponentProps,
  type ReactNode,
  useRef,
  useState,
  createContext,
} from "react";

import useShortcuts from "../../hooks/useShortcuts";
import { clamp } from "../../utils/math";

import styles from "./MediaPlayer.module.css";

interface MediaPlayerContextValue {
  setVideoElement: (node: HTMLVideoElement | null) => void;
}

type ShortcutHandlers = Parameters<typeof useShortcuts>[0];

const MediaPlayerContext = createContext<MediaPlayerContextValue | null>(null);

const PLAYBACK_RATES = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
const FRAME_DURATION = 1 / 30;
const KEYBOARD_SEEK_SECONDS = 10;
const ARROW_KEY_SEEK_SECONDS = 5;
const PERCENT_SHORTCUT_COUNT = 10;

function useMediaPlayerContext(componentName: string) {
  const context = useContext(MediaPlayerContext);

  if (!context) {
    throw new Error(`${componentName} must be used inside MediaPlayer.Root`);
  }

  return context;
}

function toggleTextTrack(track: TextTrack) {
  track.mode =
    track.mode === "showing" || track.mode === "hidden" ? "disabled" : "hidden";
}

async function playWithoutInterrupting(video: HTMLVideoElement) {
  try {
    await video.play();
  } catch {}
}

function Root({
  children,
  className,
  ...props
}: ComponentProps<"div"> & {
  children: ReactNode;
}) {
  const [isActive, setIsActive] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  function setVideoElement(node: HTMLVideoElement | null) {
    videoRef.current = node;
  }

  function withVideo(action: (video: HTMLVideoElement) => void) {
    const video = videoRef.current;

    if (video) {
      action(video);
    }
  }

  function withSeekableVideo(action: (video: HTMLVideoElement) => void) {
    withVideo((video) => {
      if (Number.isFinite(video.duration)) {
        action(video);
      }
    });
  }

  async function togglePlayback() {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.paused || video.ended) {
      await playWithoutInterrupting(video);
      return;
    }

    video.pause();
  }

  async function toggleMute() {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const shouldUnmute = video.muted || video.volume === 0;

    if (shouldUnmute) {
      video.muted = false;

      if (video.volume === 0) {
        video.volume = 1;
      }

      await playWithoutInterrupting(video);
      return;
    }

    video.muted = true;
  }

  function seekBy(seconds: number) {
    withSeekableVideo((video) => {
      video.currentTime = clamp(video.currentTime + seconds, 0, video.duration);
    });
  }

  function seekToPercentage(percentage: number) {
    withSeekableVideo((video) => {
      video.currentTime = video.duration * percentage;
    });
  }

  function adjustVolumeBy(delta: number) {
    withVideo((video) => {
      video.muted = false;
      video.volume = clamp(video.volume + delta, 0, 1);
    });
  }

  function cyclePlaybackRate(direction: 1 | -1) {
    withVideo((video) => {
      const currentIndex = PLAYBACK_RATES.indexOf(video.playbackRate);
      const safeIndex =
        currentIndex === -1 ? PLAYBACK_RATES.indexOf(1) : currentIndex;
      const nextIndex = clamp(
        safeIndex + direction,
        0,
        PLAYBACK_RATES.length - 1
      );

      video.playbackRate = PLAYBACK_RATES[nextIndex];
    });
  }

  async function toggleFullscreen() {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    if (document.fullscreenElement === root) {
      await document.exitFullscreen();
      return;
    }

    await root.requestFullscreen();
  }

  function toggleCaptions() {
    withVideo((video) => {
      const track = video.textTracks?.[0];

      if (track) {
        toggleTextTrack(track);
      }
    });
  }

  function stepFrame(direction: 1 | -1) {
    withVideo((video) => {
      if (!video.paused) {
        return;
      }

      video.currentTime = clamp(
        video.currentTime + direction * FRAME_DURATION,
        0,
        video.duration || Number.MAX_SAFE_INTEGER
      );
    });
  }

  const shortcutHandlers: ShortcutHandlers = {
    S: () => void toggleMute(),
    M: () => void toggleMute(),
    K: () => void togglePlayback(),
    " ": () => void togglePlayback(),
    J: () => seekBy(-KEYBOARD_SEEK_SECONDS),
    L: () => seekBy(KEYBOARD_SEEK_SECONDS),
    ArrowLeft: () => seekBy(-ARROW_KEY_SEEK_SECONDS),
    ArrowRight: () => seekBy(ARROW_KEY_SEEK_SECONDS),
    ArrowUp: () => adjustVolumeBy(0.05),
    ArrowDown: () => adjustVolumeBy(-0.05),
    F: () => void toggleFullscreen(),
    C: toggleCaptions,
    ".": () => stepFrame(1),
    ",": () => stepFrame(-1),
    ">": () => cyclePlaybackRate(1),
    "<": () => cyclePlaybackRate(-1),
    ...Object.fromEntries(
      Array.from({ length: PERCENT_SHORTCUT_COUNT }, (_, digit) => [
        String(digit),
        () => seekToPercentage(digit / PERCENT_SHORTCUT_COUNT),
      ])
    ),
  };

  useShortcuts(shortcutHandlers, {
    enabled: isActive,
    preventDefault: true,
  });

  return (
    <MediaPlayerContext.Provider value={{ setVideoElement }}>
      <div
        ref={rootRef}
        className={clsx(styles.root, className)}
        onMouseEnter={() => {
          setIsActive(true);
        }}
        onMouseLeave={() => {
          setIsActive(false);
        }}
        onFocusCapture={() => {
          setIsActive(true);
        }}
        onBlurCapture={(event) => {
          if (
            !event.currentTarget.contains(event.relatedTarget as Node | null)
          ) {
            setIsActive(false);
          }
        }}
        {...props}
      >
        {children}
      </div>
    </MediaPlayerContext.Provider>
  );
}

function Video({
  autoPlay = true,
  className,
  controls = false,
  loop = true,
  muted = true,
  playsInline = true,
  preload = "metadata",
  ...props
}: ComponentProps<"video">) {
  const { setVideoElement } = useMediaPlayerContext("MediaPlayer.Video");

  return (
    <video
      {...props}
      ref={setVideoElement}
      autoPlay={autoPlay}
      controls={controls}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      preload={preload}
      className={clsx(styles.video, className)}
    />
  );
}

export const MediaPlayer = Object.assign(Root, {
  Root,
  Video,
});
