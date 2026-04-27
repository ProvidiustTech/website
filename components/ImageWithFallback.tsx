'use client';

interface Props {
  src: string;
  alt: string;
  className: string;
  fallback: string;
}

export default function ImageWithFallback({ src, alt, className, fallback }: Props) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).src = fallback;
      }}
    />
  );
}
