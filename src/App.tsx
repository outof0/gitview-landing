import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { MagicShowcase } from "./components/MagicShowcase";
import { WhatItDoes } from "./components/WhatItDoes";
import { WhyGitView } from "./components/WhyGitView";
import { GitPlumbing } from "./components/GitPlumbing";
import { Changelog } from "./components/Changelog";
import { Faq } from "./components/Faq";
import { PlatformPicker } from "./components/PlatformPicker";
import { Footer } from "./components/Footer";
import { StickyCta } from "./components/StickyCta";
import { Privacy } from "./components/Privacy";
import { ToastProvider } from "./hooks/useToast";

export function App() {
  return (
    <ToastProvider>
      <div className="min-h-screen overflow-x-hidden">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-paper focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">
          <Hero />
          <MagicShowcase />
          <WhatItDoes />
          <WhyGitView />
          <GitPlumbing />
          <Changelog />
          <Faq />
          <PlatformPicker />
          <Privacy />
        </main>
        <Footer />
        <StickyCta />
      </div>
    </ToastProvider>
  );
}
