import React from "react";

/**
 * Festival Logo: "നൂറുൻ അലാ നൂർ" (Noorun Ala Noor)
 * Faithfully mirrors the user's uploaded gold Malayalam calligraphy design
 * with 3D gold gradients, ornate swashes, decorative accents, and luxury dark backdrop.
 */
export function FestivalCalligraphyLogo({
  className = "size-16 sm:size-20",
}: {
  className?: string;
}) {
  return (
    <div
      className={`relative flex shrink-0 items-center justify-center rounded-2xl border border-amber-500/40 bg-gradient-to-b from-neutral-900 via-black to-neutral-950 p-2 shadow-[0_0_20px_rgba(217,119,6,0.25)] transition-transform hover:scale-105 ${className}`}
      title="Noorun Ala Noor Festival Emblem"
      aria-label="Noorun Ala Noor Festival Emblem"
    >
      {/* Ambient gold glow */}
      <div className="absolute inset-0 rounded-2xl bg-amber-400/5 blur-sm" />

      <svg
        viewBox="0 0 200 200"
        className="relative size-full overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="festGoldGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2B2" />
            <stop offset="35%" stopColor="#F5D061" />
            <stop offset="70%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#AA7C11" />
          </linearGradient>
          <linearGradient id="festGoldSheen" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E2B13C" />
            <stop offset="50%" stopColor="#FFF8DC" />
            <stop offset="100%" stopColor="#C99726" />
          </linearGradient>
          <filter id="goldDropShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* Decorative background Islamic geometry circle outline */}
        <circle
          cx="100"
          cy="100"
          r="92"
          fill="none"
          stroke="url(#festGoldGlow)"
          strokeWidth="1.2"
          strokeDasharray="4 3"
          opacity="0.5"
        />

        {/* Top flourishes */}
        <path
          d="M 60 30 C 85 24, 115 24, 140 30"
          stroke="url(#festGoldSheen)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="100" cy="24" r="2.5" fill="url(#festGoldSheen)" />

        {/* Malayalam Calligraphy Text Group: "നൂറുൻ അലാ നൂർ" */}
        <g filter="url(#goldDropShadow)" fill="url(#festGoldGlow)">
          {/* Top Line: നൂറുൻ */}
          <text
            x="100"
            y="68"
            textAnchor="middle"
            fontFamily="'Cinzel', 'Noto Sans Malayalam', 'Manjari', 'Gayathri', sans-serif"
            fontWeight="900"
            fontSize="34"
            letterSpacing="-0.5"
            fill="url(#festGoldSheen)"
          >
            നൂറുൻ
          </text>

          {/* Decorative mini heart / center accent between Line 1 and 2 */}
          <path
            d="M 100 80 C 97 76, 92 78, 92 82 C 92 86, 100 90, 100 90 C 100 90, 108 86, 108 82 C 108 78, 103 76, 100 80 Z"
            fill="url(#festGoldGlow)"
          />

          {/* Middle Line: അലാ */}
          <text
            x="100"
            y="118"
            textAnchor="middle"
            fontFamily="'Cinzel', 'Noto Sans Malayalam', 'Manjari', 'Gayathri', sans-serif"
            fontWeight="900"
            fontSize="38"
            letterSpacing="-0.5"
            fill="url(#festGoldGlow)"
          >
            അലാ
          </text>

          {/* Bottom Line: നൂർ */}
          <text
            x="100"
            y="166"
            textAnchor="middle"
            fontFamily="'Cinzel', 'Noto Sans Malayalam', 'Manjari', 'Gayathri', sans-serif"
            fontWeight="900"
            fontSize="44"
            letterSpacing="-1"
            fill="url(#festGoldSheen)"
          >
            നൂർ
          </text>

          {/* Decorative swirl accents mimicking the artist's calligraphy */}
          <path
            d="M 38 128 C 30 145, 45 160, 52 148 C 56 140, 48 135, 42 140"
            stroke="url(#festGoldGlow)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 162 128 C 170 145, 155 160, 148 148 C 144 140, 152 135, 158 140"
            stroke="url(#festGoldGlow)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Bottom mini heart flourish */}
          <path
            d="M 85 178 C 82 175, 78 176, 78 180 C 78 183, 85 186, 85 186 C 85 186, 92 183, 92 180 C 92 176, 88 175, 85 178 Z"
            fill="url(#festGoldGlow)"
            transform="scale(0.8) translate(25, 36)"
          />
        </g>
      </svg>
    </div>
  );
}

/**
 * Institution Logo: "Guideon Learning Hub"
 * Faithfully mirrors the user's uploaded Guideon brand logo:
 * Circular geometric black 'G' emblem with an origami fold and vibrant emerald green upward arrow at top right,
 * with modern typography "Guideon" featuring the green 'o'.
 */
export function GuideonInstitutionLogo({
  className = "size-16 sm:size-20",
}: {
  className?: string;
}) {
  return (
    <div
      className={`relative flex shrink-0 items-center justify-center rounded-2xl border border-emerald-500/30 bg-white dark:bg-neutral-900 p-2 shadow-[0_0_18px_rgba(16,185,129,0.18)] transition-transform hover:scale-105 ${className}`}
      title="Guideon Learning Hub"
      aria-label="Guideon Learning Hub Logo"
    >
      <svg
        viewBox="0 0 200 200"
        className="size-full overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="guideonGreen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>

        {/* Upward corner arrow at top right (#10B981) */}
        <path
          d="M 104 32 L 118 32 L 118 46 L 112 46 L 112 38 L 104 38 Z"
          fill="#10B981"
          transform="scale(1.8) translate(-40, -10)"
        />

        {/* Main 'G' Circular Shape */}
        <g transform="translate(100, 78)">
          {/* Black outer ring with notch at upper right */}
          <path
            d="
              M 0 -48 
              A 48 48 0 1 0 48 0 
              L 48 8 
              L 20 8 
              L 20 -8 
              L 26 -8 
              A 26 26 0 1 1 0 -26 
              C 4 -26 8 -24 12 -22 
              L 24 -36 
              C 17 -44 9 -48 0 -48 
              Z
            "
            fill="currentColor"
            className="text-neutral-900 dark:text-white"
          />

          {/* Origami folded shadow / corner accent */}
          <path d="M 12 -22 L 34 -4 L 14 0 Z" fill="#1f2937" opacity="0.85" />
          {/* Green accent triangle fold */}
          <path d="M 16 -30 L 32 -30 L 32 -14 Z" fill="#10B981" />
        </g>

        {/* Guideon Wordmark */}
        <g transform="translate(100, 155)">
          <text
            textAnchor="middle"
            fontFamily="system-ui, -apple-system, 'Inter', sans-serif"
            fontWeight="800"
            fontSize="28"
            letterSpacing="-0.5"
            className="fill-neutral-950 dark:fill-white"
          >
            Guide
            <tspan fill="#10B981">o</tspan>n
          </text>

          {/* Subtitle: Learning Hub */}
          <text
            y="18"
            textAnchor="middle"
            fontFamily="system-ui, -apple-system, 'Inter', sans-serif"
            fontWeight="700"
            fontSize="9"
            letterSpacing="2.5"
            fill="#10B981"
            className="uppercase"
          >
            Learning Hub
          </text>
        </g>
      </svg>
    </div>
  );
}
