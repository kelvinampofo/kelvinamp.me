export default function VoiceInput() {
  return (
    <div className="mx-6 flex h-[4.5rem] w-80 items-center justify-between rounded-2xl bg-neutral-50/60 px-6 py-4 backdrop-blur-md dark:bg-neutral-900/60 dark:backdrop-blur-xl">
      <div className="flex cursor-default flex-col bg-[length:200%] text-xs text-blue-700 dark:bg-gradient-to-r dark:from-blue-600 dark:via-teal-300 dark:to-blue-600 dark:bg-clip-text dark:text-transparent dark:hover:animate-shine">
        <span className="text-lg font-medium">Kelvin</span>
        <span className="font-medium">is speaking ...</span>
      </div>
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" className="waveform">
        <g clipPath="url(#clip0_76_1253)">
          <rect y="12" width="2.5" height="6" rx="1.25" />
          <rect x="5.5" y="6" width="2.5" height="18" rx="1.25" />
          <rect x="11" width="2.5" height="30" rx="1.25" />
          <rect x="16.5" y="8" width="2.5" height="15" rx="1.25" />
          <rect x="22" y="4" width="2.5" height="23" rx="1.25" />
          <rect x="27.5" y="11" width="2.5" height="9" rx="1.25" />
        </g>
        <defs>
          <clipPath id="clip0_76_1253">
            <rect width="30" height="30" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
