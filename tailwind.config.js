/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Dark blocks (code, editor) — brand canvas
        ink: "#16181D",
        "ink-2": "#1A1C23",
        surface: "#1E2129",
        border: "#22252C",
        chrome: "#2F3239",
        dim: "#9DA0A8",
        faint: "#BCBEC4",
        // Light page — brand surface / ink
        paper: "#FAFAF9",
        "paper-2": "#F0EFEC",
        "ink-light": "#0F1115",
        "fg-light": "#2A2D38",
        muted: "#5B6072",
        // Git semantic (diff UI) — keep graph colors distinct from brand
        "git-add": "#22C55E",
        "git-mod": "#3882F6",
        "git-del": "#6b6c6e",
        "git-conflict": "#EF4444",
        // Tinted bg variants for sample lines
        "git-add-tint": "rgba(34, 197, 94, 0.12)",
        "git-mod-tint": "rgba(56, 130, 246, 0.12)",
        "git-del-tint": "rgba(107, 108, 110, 0.12)",
        "git-conflict-tint": "rgba(239, 68, 68, 0.14)",
        // Brand primary
        accent: "#F15A29",
      },
      fontFamily: {
        sans: [
          "Inter Tight",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: ["IBM Plex Mono", "ui-monospace", "monospace"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }],
      },
      animation: {
        "fade-up": "fade-up 600ms cubic-bezier(0.22,1,0.36,1) forwards",
        "verb-swap": "verb-swap 360ms ease",
        "seg-fill": "seg-fill linear forwards",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "verb-swap": {
          from: {
            opacity: "0",
            transform: "translateY(0.18em)",
            filter: "blur(2px)",
          },
          to: { opacity: "1", transform: "none", filter: "none" },
        },
        "seg-fill": {
          from: { width: "0%" },
          to: { width: "100%" },
        },
      },
    },
  },
  plugins: [],
};
