import React from "react";

type BlurGradientProps = {
  /** position: bottom | top | center */
  position?: "bottom" | "top" | "center";
  /** CSS height value for the gradient block (e.g. '66%', '200px') */
  height?: string;
  /** Custom gradient CSS (overrides default) */
  gradientCSS?: string;
  /** Blur amount in px */
  blur?: number;
  className?: string;
};

export function BlurGradient({
  position = "bottom",
  height = "66%",
  gradientCSS,
  blur = 8,
  className = "",
}: BlurGradientProps) {
  const defaultGradient =
    "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0) 100%)";

  const gradient = gradientCSS || defaultGradient;

  const posStyle: React.CSSProperties =
    position === "bottom"
      ? { left: 0, right: 0, bottom: 0, height }
      : position === "top"
        ? { left: 0, right: 0, top: 0, height }
        : { left: 0, right: 0, top: "50%", height };

  return (
    <div
      className={`absolute ${className}`}
      style={{
        ...posStyle,
        background: gradient,
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
      }}
      aria-hidden
    />
  );
}

export default BlurGradient;
