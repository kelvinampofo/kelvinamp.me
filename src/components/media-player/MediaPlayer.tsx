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
  clearIndicator: () => void;
  indicator: IndicatorState;
}

interface MediaPlayerRootProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
}

interface MediaPlayerIconProps {
  className: string;
}

type ShortcutHandlers = Parameters<typeof useShortcuts>[0];
type MediaPlayerVideoProps = Omit<ComponentPropsWithoutRef<"video">, "ref">;
type VideoSource = MediaPlayerVideoProps["src"];
type Indicator = "play" | "pause";
type IndicatorState = Indicator | null;

const MediaPlayerContext = createContext<MediaPlayerContextValue | null>(null);

const PLAYBACK_RATES = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
const FRAME_DURATION = 1 / 30;
const KEYBOARD_SEEK_SECONDS = 10;
const ARROW_KEY_SEEK_SECONDS = 5;
const PERCENT_SHORTCUT_COUNT = 10;
const MAX_GLOW_DRIFT_SECONDS = 0.08;

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

  const [indicator, setIndicator] = useState<IndicatorState>(null);

  function showIndicator(nextIndicator: Indicator) {
    setIndicator(nextIndicator);
  }

  function clearIndicator() {
    setIndicator(null);
  }

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
      showIndicator("pause");
      return;
    }

    video.pause();
    showIndicator("play");
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
    <MediaPlayerContext.Provider
      value={{
        setVideoElement,
        togglePlayback,
        clearIndicator,
        indicator,
      }}
    >
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
  onPause,
  onPlay,
  onRateChange,
  onSeeked,
  onSeeking,
  onTimeUpdate,
  onLoadedData,
  playsInline = true,
  preload = "metadata",
  ...props
}: MediaPlayerVideoProps) {
  const sourceRef = useRef<HTMLVideoElement | null>(null);
  const glowRef = useRef<HTMLVideoElement>(null);
  const [loadedSource, setLoadedSource] = useState<VideoSource>();

  const { setVideoElement, togglePlayback, clearIndicator, indicator } =
    useMediaPlayerContext("MediaPlayer.Video");

  const { poster, src } = props;
  const hasSourceLoaded = src != null && loadedSource === src;

  function setSourceLoaded() {
    setLoadedSource(src);
  }

  function syncGlowVideo(video: HTMLVideoElement) {
    const glow = glowRef.current;

    if (!glow || glow.readyState === glow.HAVE_NOTHING) {
      return;
    }

    if (
      Math.abs(glow.currentTime - video.currentTime) > MAX_GLOW_DRIFT_SECONDS
    ) {
      glow.currentTime = video.currentTime;
    }

    glow.playbackRate = video.playbackRate;

    if (video.paused || video.ended) {
      glow.pause();
      return;
    }

    void playWithoutInterrupting(glow);
  }

  function handleVideoRef(node: HTMLVideoElement | null) {
    sourceRef.current = node;
    setVideoElement(node);

    if (!node) {
      return;
    }

    // Cached videos can already be playable before canplay fires.
    if (node.readyState >= node.HAVE_FUTURE_DATA) {
      setSourceLoaded();
    }
  }

  const foregroundVideo = (
    <video
      {...props}
      ref={handleVideoRef}
      autoPlay={autoPlay}
      controls={controls}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      preload={preload}
      onCanPlay={(event) => {
        setSourceLoaded();
        syncGlowVideo(event.currentTarget);
        onCanPlay?.(event);
      }}
      onLoadedData={(event) => {
        setSourceLoaded();
        syncGlowVideo(event.currentTarget);
        onLoadedData?.(event);
      }}
      onClick={(event) => {
        onClick?.(event);

        if (!event.defaultPrevented) {
          void togglePlayback();
        }
      }}
      onPause={(event) => {
        syncGlowVideo(event.currentTarget);
        onPause?.(event);
      }}
      onPlay={(event) => {
        syncGlowVideo(event.currentTarget);
        onPlay?.(event);
      }}
      onRateChange={(event) => {
        syncGlowVideo(event.currentTarget);
        onRateChange?.(event);
      }}
      onSeeked={(event) => {
        syncGlowVideo(event.currentTarget);
        onSeeked?.(event);
      }}
      onSeeking={(event) => {
        syncGlowVideo(event.currentTarget);
        onSeeking?.(event);
      }}
      onTimeUpdate={(event) => {
        syncGlowVideo(event.currentTarget);
        onTimeUpdate?.(event);
      }}
      className={clsx(styles.video, className)}
    />
  );

  return (
    <div
      className={styles.stage}
      data-state={hasSourceLoaded ? "loaded" : "pending"}
    >
      {src && hasSourceLoaded && (
        <video
          aria-hidden
          className={styles.glow}
          controls={false}
          loop={loop}
          muted
          poster={poster}
          playsInline={playsInline}
          preload={preload}
          ref={glowRef}
          src={src}
          tabIndex={-1}
          onCanPlay={() => {
            if (sourceRef.current) {
              syncGlowVideo(sourceRef.current);
            }
          }}
          onLoadedData={() => {
            if (sourceRef.current) {
              syncGlowVideo(sourceRef.current);
            }
          }}
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
        {foregroundVideo}
        {indicator && (
          <div
            aria-hidden
            className={styles.playbackIndicator}
            data-indicator={indicator}
            onAnimationEnd={() => {
              if (indicator === "pause") {
                clearIndicator();
              }
            }}
          >
            <span className={styles.playbackIconStack}>
              <PlayIcon className={styles.playbackIcon} />
              <PauseIcon className={styles.playbackIcon} />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function PlayIcon({ className }: MediaPlayerIconProps) {
  return (
    <svg aria-hidden className={className} viewBox="0 0 18 18" fill="none">
      <path
        d="M5.5 3.8C5.5 3.25 6.08 2.9 6.55 3.18L14.8 8.08C15.28 8.36 15.28 9.08 14.8 9.36L6.55 14.26C6.08 14.54 5.5 14.19 5.5 13.64V3.8Z"
        fill="currentColor"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="0.5"
      />
    </svg>
  );
}

function PauseIcon({ className }: MediaPlayerIconProps) {
  return (
    <svg aria-hidden className={className} viewBox="0 0 18 18" fill="none">
      <rect
        x="4.5"
        y="3.5"
        width="3.5"
        height="11"
        rx="1"
        fill="currentColor"
      />
      <rect x="10" y="3.5" width="3.5" height="11" rx="1" fill="currentColor" />
    </svg>
  );
}

export const MediaPlayer = Object.assign(Root, {
  Root,
  Video,
});
