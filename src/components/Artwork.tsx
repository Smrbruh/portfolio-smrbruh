type Props = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
};
export function Artwork({ src, alt, className = "", priority = false }: Props) {
  return (
    <picture className={`artwork ${className}`}>
      {!priority && <source media="(max-width: 640px)" srcSet={`${src}-sm.webp`} />}
      {/* The supplied responsive WebP variants are already optimized. */}
      <img
        src={`${src}.webp`}
        alt={alt}
        width="1536"
        height="1024"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
      />
    </picture>
  );
}
