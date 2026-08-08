import { type AnchorHTMLAttributes, type ReactNode } from "react";
import { SITE } from "../site";
import { useToast } from "../hooks/useToast";

type Props = {
  children: ReactNode;
  /** Analytics source label */
  source: string;
  /** Which install target */
  href?: string;
  className?: string;
  toastMessage?: string;
} & Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "children" | "className"
>;

export function InstallLink({
  children,
  source,
  href = SITE.primaryUrl,
  className,
  toastMessage,
  onClick,
  ...rest
}: Props) {
  const toast = useToast();
  const isProtocol = href.startsWith("vscode:");
  const isDownload = href === SITE.downloadUrl;
  const openInNewTab = href.startsWith("http") && !isDownload;

  return (
    <a
      href={href}
      data-analytics="Install"
      data-analytics-source={source}
      className={className}
      target={openInNewTab ? "_blank" : undefined}
      rel={openInNewTab ? "noreferrer noopener" : undefined}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) {
          return;
        }
        if (isProtocol) {
          toast(toastMessage ?? "Opening VS Code…");
        } else if (isDownload) {
          toast(toastMessage ?? `Downloading GitView v${SITE.version}…`);
        } else if (href.startsWith("http") && href.includes("marketplace")) {
          toast(toastMessage ?? "Opening Marketplace…");
        }
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
