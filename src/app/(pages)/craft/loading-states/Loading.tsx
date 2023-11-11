import Text from '@/app/components/generic/Text';

interface LoadingProps {
  variant: 'loading-text' | 'dots' | 'spinner';
}

export default function Loading({ variant }: LoadingProps) {
  switch (variant) {
    case 'loading-text':
      return (
        <Text as="span" size="small" className="loading-text w-20 cursor-not-allowed">
          Loading
          <span className="loading-dots ml-1"></span>
        </Text>
      );
    case 'dots':
      return (
        <div className="loading-dots cursor-not-allowed">
          <span className="bg-neutral-800 dark:bg-neutral-500"></span>
          <span className="bg-neutral-800 dark:bg-neutral-500"></span>
          <span className="bg-neutral-800 dark:bg-neutral-500"></span>
        </div>
      );
    case 'spinner':
      return (
        <span className="spinner h-6 w-6 cursor-not-allowed rounded-full border-2 border-transparent border-l-neutral-800 dark:border-l-white"></span>
      );
    default:
      return null;
  }
}
