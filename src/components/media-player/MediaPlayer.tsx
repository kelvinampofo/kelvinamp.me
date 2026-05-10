"use client";

import clsx from "clsx";
import {
  use,
  type ComponentPropsWithoutRef,
  type ReactNode,
  useRef,
  createContext,
  useState,
} from "react";

import useShortcuts from "../../hooks/useShortcuts";
import { clamp } from "../../utils/math";

import styles from "./MediaPlayer.module.css";

interface MediaPlayerContextValue {
  setVideoElement: (node: HTMLVideoElement | null) => void;
  togglePlayback: () => Promise<void>;
}

type ShortcutHandlers = Parameters<typeof useShortcuts>[0];
type MediaPlayerRootProps = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode;
};
type MediaPlayerVideoProps = Omit<ComponentPropsWithoutRef<"video">, "ref">;

const MediaPlayerContext = createContext<MediaPlayerContextValue | null>(null);

const PLAYBACK_RATES = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
const FRAME_DURATION = 1 / 30;
const KEYBOARD_SEEK_SECONDS = 10;
const ARROW_KEY_SEEK_SECONDS = 5;
const PERCENT_SHORTCUT_COUNT = 10;

function useMediaPlayerContext(componentName: string) {
  const context = use(MediaPlayerContext);

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

function Root({ children, className, ...props }: MediaPlayerRootProps) {
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
    0: () => seekToPercentage(0 / PERCENT_SHORTCUT_COUNT),
    1: () => seekToPercentage(1 / PERCENT_SHORTCUT_COUNT),
    2: () => seekToPercentage(2 / PERCENT_SHORTCUT_COUNT),
    3: () => seekToPercentage(3 / PERCENT_SHORTCUT_COUNT),
    4: () => seekToPercentage(4 / PERCENT_SHORTCUT_COUNT),
    5: () => seekToPercentage(5 / PERCENT_SHORTCUT_COUNT),
    6: () => seekToPercentage(6 / PERCENT_SHORTCUT_COUNT),
    7: () => seekToPercentage(7 / PERCENT_SHORTCUT_COUNT),
    8: () => seekToPercentage(8 / PERCENT_SHORTCUT_COUNT),
    9: () => seekToPercentage(9 / PERCENT_SHORTCUT_COUNT),
  };

  useShortcuts(shortcutHandlers, {
    preventDefault: true,
  });

  return (
    <MediaPlayerContext.Provider value={{ setVideoElement, togglePlayback }}>
      <div ref={rootRef} className={clsx(styles.root, className)} {...props}>
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
  onClick,
  onCanPlay,
  playsInline = true,
  preload = "metadata",
  ...props
}: MediaPlayerVideoProps) {
  const [hasVideoLoaded, setHasVideoLoaded] = useState(false);
  const { setVideoElement, togglePlayback } =
    useMediaPlayerContext("MediaPlayer.Video");
  const { poster, src } = props;
  const foregroundVideo = (
    <video
      {...props}
      ref={setVideoElement}
      autoPlay={autoPlay}
      controls={controls}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      preload={preload}
      onCanPlay={(event) => {
        setHasVideoLoaded(true);
        onCanPlay?.(event);
      }}
      onClick={(event) => {
        onClick?.(event);

        if (!event.defaultPrevented) {
          void togglePlayback();
        }
      }}
      className={clsx(styles.video, className)}
    />
  );

  return (
    <div
      className={styles.stage}
      data-state={hasVideoLoaded ? "loaded" : "loading"}
    >
      {src && (
        <video
          aria-hidden
          autoPlay={autoPlay}
          className={styles.glow}
          controls={false}
          loop={loop}
          muted
          poster={poster}
          playsInline={playsInline}
          preload={preload}
          src={src}
          tabIndex={-1}
        />
      )}
      <div className={styles.frame}>
        {poster && (
          <div
            aria-hidden
            className={styles.poster}
            style={{ backgroundImage: `url(${poster})` }}
          />
        )}
        <p className={styles.loading} role="status">
          Loading
          <span className={styles.loadingDots} />
        </p>
        {foregroundVideo}
      </div>
    </div>
  );
}

export const MediaPlayer = Object.assign(Root, {
  Root,
  Video,
});
