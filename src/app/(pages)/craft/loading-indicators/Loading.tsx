import Text from '@/app/components/generic/Text';

type LoadingVariant =
  | 'loading-text'
  | 'loading-dots'
  | 'primary-spinner'
  | 'secondary-spinner'
  | 'ios-spinner';

interface LoadingProps {
  variant: LoadingVariant;
}

export default function Loading({ variant }: LoadingProps) {
  switch (variant) {
    case 'loading-text':
      return (
        <Text size="small" className="loading-text hidden w-20 cursor-not-allowed sm:block">
          Loading
          <span className="loading-dots ml-[2px]"></span>
        </Text>
      );
    case 'loading-dots':
      return (
        <div className="loading-dots cursor-not-allowed" aria-label="Loading..." role="progressbar">
          {[...Array(3)].map((_, index) => (
            <span key={index} className="bg-neutral-800 dark:bg-neutral-300"></span>
          ))}
        </div>
      );
    case 'primary-spinner':
      return (
        <div
          className="primary-spinner h-6 w-6 cursor-not-allowed rounded-full border-2 border-transparent border-t-neutral-800 dark:border-t-white"
          aria-label="Loading..."
          role="progressbar"
        ></div>
      );
    case 'secondary-spinner':
      return (
        <div
          className="secondary-spinner h-6 w-6 cursor-not-allowed rounded-full border-2 border-neutral-300 border-t-neutral-800 dark:border-neutral-700 dark:border-t-white"
          aria-label="Secondary spinner"
          role="progressbar"
        ></div>
      );
    case 'ios-spinner':
      return (
        <div className="ios-spinner cursor-not-allowed" aria-label="Loading..." role="progressbar">
          {[...Array(12)].map((_, index) => (
            <div key={index}></div>
          ))}
        </div>
      );
    default:
      return null;
  }
}
