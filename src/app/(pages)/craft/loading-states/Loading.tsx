import Text from '@/app/components/generic/Text';

interface LoadingProps {
  variant:
    | 'loading-text'
    | 'loading-dots'
    | 'primary-spinner'
    | 'secondary-spinner'
    | 'ios-spinner';
}

export default function Loading({ variant }: LoadingProps) {
  switch (variant) {
    case 'loading-text':
      return (
        <Text
          as="span"
          size="small"
          className="loading-text hidden w-20 cursor-not-allowed sm:block"
        >
          Loading
          <span className="loading-dots ml-1"></span>
        </Text>
      );
    case 'loading-dots':
      return (
        <div className="loading-dots cursor-not-allowed" aria-label="Loading dots">
          {[...Array(3)].map((_, index) => (
            <span key={index} className="bg-neutral-800 dark:bg-neutral-500"></span>
          ))}
        </div>
      );
    case 'primary-spinner':
      return (
        <span
          className="spinner h-6 w-6 cursor-not-allowed rounded-full border-2 border-transparent border-l-neutral-800 dark:border-l-white"
          aria-label="Primary spinner"
        ></span>
      );
    case 'secondary-spinner':
      return (
        <span
          className="spinner h-6 w-6 cursor-not-allowed rounded-full border-2 border-neutral-300 border-l-neutral-800 dark:border-neutral-700 dark:border-l-white"
          aria-label="Secondary spinner"
        ></span>
      );
    case 'ios-spinner':
      return (
        <div className="ios-spinner cursor-not-allowed">
          {[...Array(12)].map((_, index) => (
            <div key={index}></div>
          ))}
        </div>
      );
    default:
      return null;
  }
}
