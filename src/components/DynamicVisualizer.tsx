import React from "react";

interface VisualizerProps {
  type: string;
  variant?: number;
}

export function DynamicVisualizer({ type, variant = 0 }: VisualizerProps) {
  const isAlt = variant % 2 === 1;

  switch (type) {
    case "cicd":
    case "ml":
      return (
        <svg viewBox="0 0 400 240" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
          <rect width="400" height="240" fill="oklch(0.22 0.05 250)" />
          <line x1="80" y1="120" x2="200" y2="120" stroke="oklch(0.55 0.08 240)" strokeWidth="4" strokeDasharray={isAlt ? "4 4" : "none"} />
          <line x1="200" y1="120" x2="320" y2="120" stroke="oklch(0.55 0.08 240)" strokeWidth="4" strokeDasharray={!isAlt ? "4 4" : "none"} />
          <circle cx="80" cy="120" r="28" fill="oklch(0.3 0.06 245)" stroke="oklch(0.75 0.18 190)" strokeWidth="3" />
          <circle cx="200" cy="120" r="28" fill="oklch(0.3 0.06 245)" stroke="oklch(0.75 0.18 190)" strokeWidth="3" />
          <circle cx="320" cy="120" r="28" fill="oklch(0.3 0.06 245)" stroke="oklch(0.75 0.18 190)" strokeWidth="3" />
        </svg>
      );
    case "database":
      return (
        <svg viewBox="0 0 400 240" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
          <rect width="400" height="240" fill="oklch(0.22 0.05 250)" />
          <ellipse cx="200" cy="70" rx="90" ry="18" fill="oklch(0.32 0.06 245)" stroke="oklch(0.75 0.18 190)" strokeWidth="1.5" />
          <path d="M110 70 L110 140 A 90 18 0 0 0 290 140 L290 70" fill="oklch(0.28 0.06 245)" stroke="oklch(0.75 0.18 190)" strokeWidth="1.5" />
        </svg>
      );
    case "cyber":
      return (
        <svg viewBox="0 0 400 240" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
          <rect width="400" height="240" fill="oklch(0.22 0.05 250)" />
          <path d="M200 50 L250 75 L250 145 L200 180 L150 145 L150 75 Z" fill="none" stroke="oklch(0.85 0.15 190)" strokeWidth="3" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 400 240" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
          <rect width="400" height="240" fill="oklch(0.22 0.05 250)" />
          <rect x="50" y="40" width="300" height="160" rx="6" fill="oklch(0.3 0.06 245)" stroke="oklch(0.55 0.08 240)" strokeWidth="2" />
        </svg>
      );
  }
}
