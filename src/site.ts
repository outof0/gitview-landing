const GITHUB_URL = "https://github.com/outof0/gitview";
const VERSION = "0.1.0";
const RELEASE_URL = `${GITHUB_URL}/releases/tag/v${VERSION}`;
const DOWNLOAD_FILENAME = `gitview-${VERSION}.vsix`;
const DOWNLOAD_URL = `${GITHUB_URL}/releases/download/v${VERSION}/${DOWNLOAD_FILENAME}`;

export const SITE = {
  name: "GitView",
  tagline: "See Git clearly.",
  descriptor: "History, branches, changes and diffs — finally in view.",
  version: VERSION,
  domain: "gitview.dev",
  github: GITHUB_URL,
  landingRepository: "https://github.com/outof0/gitview-landing",
  supportEmail: "hello.outof0@gmail.com",
  marketplaceId: "gitview.gitview",
  marketplaceLive: false,
  releaseUrl: RELEASE_URL,
  downloadFilename: DOWNLOAD_FILENAME,
  downloadUrl: DOWNLOAD_URL,
  primaryUrl: DOWNLOAD_URL,
  primaryLabel: "Download VSIX",
  installUrl: "vscode:extension/gitview.gitview",
  marketplaceUrl:
    "https://marketplace.visualstudio.com/items?itemName=gitview.gitview",
  qualityLabel: "CI verified",
} as const;

export const EDITORS = [
  "VS Code",
  "Cursor",
  "VSCodium",
  "Windsurf",
  "Antigravity",
] as const;

export const TRUST = [
  { label: SITE.qualityLabel, detail: "release gates" },
  { label: "MIT", detail: "free, forever" },
  { label: "0 telemetry", detail: "no product phone-home" },
  { label: "VS Code 1.85+", detail: "release tested" },
] as const;
