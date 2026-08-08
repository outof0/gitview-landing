import { SITE } from "../site";

type Variant = "primary" | "reverse";

type Props = {
  /** primary = dark ink on light; reverse = white on dark */
  variant?: Variant;
  className?: string;
  /** Show full lockup (symbol + wordmark). Compact uses symbol only. */
  compact?: boolean;
};

const LOCKUP: Record<Variant, string> = {
  primary: "./brand/lockup-primary.svg",
  reverse: "./brand/lockup-reverse.svg",
};

const SYMBOL: Record<Variant, string> = {
  primary: "./brand/symbol-primary.svg",
  reverse: "./brand/symbol-small.svg",
};

/** Official GitView lockup / symbol. Do not typeset a replacement wordmark. */
export function BrandMark({
  variant = "primary",
  className = "",
  compact = false,
}: Props) {
  if (compact) {
    return (
      <img
        src={SYMBOL[variant]}
        alt={SITE.name}
        width={24}
        height={24}
        className={`h-6 w-6 ${className}`}
        decoding="async"
      />
    );
  }

  return (
    <img
      src={LOCKUP[variant]}
      alt={SITE.name}
      width={140}
      height={40}
      className={`h-7 w-auto sm:h-8 ${className}`}
      decoding="async"
    />
  );
}
