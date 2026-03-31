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

import styles from "./MediaPlayer.module.css";

interface MediaPlayerContextValue {
  setVideoElement: (node: HTMLVideoElement | null) => void;
}

const MediaPlayerContext = createContext<MediaPlayerContextValue | null>(null);
const PLAYBACK_RATES = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

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

  async function togglePlayback() {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.paused || video.ended) {
      try {
        await video.play();
      } catch {}

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

      try {
        await video.play();
      } catch {}

      return;
    }

    video.muted = true;
  }

  function seekBy(seconds: number) {
    const video = videoRef.current;

    if (!video || !Number.isFinite(video.duration)) {
      return;
    }

    video.currentTime = Math.max(
      0,
      Math.min(video.duration, video.currentTime + seconds)
    );
  }

  function seekToPercentage(percentage: number) {
    const video = videoRef.current;

    if (!video || !Number.isFinite(video.duration)) {
      return;
    }

    video.currentTime = video.duration * percentage;
  }

  function adjustVolumeBy(delta: number) {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.muted = false;
    video.volume = Math.max(0, Math.min(1, video.volume + delta));
  }

  function cyclePlaybackRate(direction: 1 | -1) {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const currentIndex = PLAYBACK_RATES.indexOf(video.playbackRate);
    const safeIndex =
      currentIndex === -1 ? PLAYBACK_RATES.indexOf(1) : currentIndex;
    const nextIndex = Math.max(
      0,
      Math.min(PLAYBACK_RATES.length - 1, safeIndex + direction)
    );

    video.playbackRate = PLAYBACK_RATES[nextIndex];
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
    const track = videoRef.current?.textTracks?.[0];

    if (!track) {
      return;
    }

    toggleTextTrack(track);
  }

  function stepFrame(direction: 1 | -1) {
    const video = videoRef.current;

    if (!video || !video.paused) {
      return;
    }

    const frameDuration = 1 / 30;

    video.currentTime = Math.max(
      0,
      Math.min(
        video.duration || Number.MAX_SAFE_INTEGER,
        video.currentTime + direction * frameDuration
      )
    );
  }

  useShortcuts(
    {
      S: () => {
        void toggleMute();
      },
      M: () => {
        void toggleMute();
      },
      K: () => {
        void togglePlayback();
      },
      " ": () => {
        void togglePlayback();
      },
      J: () => {
        seekBy(-10);
      },
      L: () => {
        seekBy(10);
      },
      ArrowLeft: () => {
        seekBy(-5);
      },
      ArrowRight: () => {
        seekBy(5);
      },
      ArrowUp: () => {
        adjustVolumeBy(0.05);
      },
      ArrowDown: () => {
        adjustVolumeBy(-0.05);
      },
      F: () => {
        void toggleFullscreen();
      },
      C: () => {
        toggleCaptions();
      },
      ".": () => {
        stepFrame(1);
      },
      ",": () => {
        stepFrame(-1);
      },
      ">": () => {
        cyclePlaybackRate(1);
      },
      "<": () => {
        cyclePlaybackRate(-1);
      },
      "0": () => {
        seekToPercentage(0);
      },
      "1": () => {
        seekToPercentage(0.1);
      },
      "2": () => {
        seekToPercentage(0.2);
      },
      "3": () => {
        seekToPercentage(0.3);
      },
      "4": () => {
        seekToPercentage(0.4);
      },
      "5": () => {
        seekToPercentage(0.5);
      },
      "6": () => {
        seekToPercentage(0.6);
      },
      "7": () => {
        seekToPercentage(0.7);
      },
      "8": () => {
        seekToPercentage(0.8);
      },
      "9": () => {
        seekToPercentage(0.9);
      },
    },
    {
      enabled: isActive,
      preventDefault: true,
    }
  );

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
