"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

function useScroll(threshold: number) {
  const [scrolled, setScrolled] = React.useState(false);
  const onScroll = React.useCallback(() => {
    setScrolled(window.scrollY > threshold);
  }, [threshold]);
  React.useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);
  React.useEffect(() => {
    onScroll();
  }, [onScroll]);
  return scrolled;
}

/** Entspricht grob shadcn `buttonVariants({ variant: "ghost" })` + default-Höhe */
const projectsLinkClass =
  "inline-flex h-10 items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:bg-accent hover:text-accent-foreground";

type GlassScrollHeaderProps = {
  logoHref?: string;
  projectsHref?: string;
  homeAriaLabel?: string;
  projectsLabel?: string;
};

export function GlassScrollHeader({
  logoHref = "/",
  projectsHref = "#",
  homeAriaLabel = "Startseite",
  projectsLabel = "Projekte",
}: GlassScrollHeaderProps) {
  const scrolled = useScroll(10);

  return (
    <header
      className={cn(
        "overflow-visible font-sans text-foreground bg-background/95 sticky top-0 z-50 mx-auto w-full max-w-5xl border-b border-transparent rounded-full md:border md:border-transparent md:transition-all md:ease-out after:pointer-events-none after:absolute after:inset-0 after:rounded-full after:bg-[linear-gradient(115deg,rgba(255,255,255,0.18),rgba(226,232,240,0.06),rgba(255,255,255,0.16))] after:p-px after:opacity-0 after:transition-opacity after:duration-300 after:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] after:mask-exclude after:content-['']",
        scrolled &&
          "border-b border-b-white/20 bg-background/95 backdrop-blur-lg supports-backdrop-filter:bg-background/50 md:top-4 md:max-w-4xl md:border md:border-white/15 md:shadow md:shadow-black/25 md:after:opacity-100",
      )}
    >
      <nav className="flex h-14 w-full items-center justify-between px-2 md:h-12 md:px-1 md:transition-all md:ease-out">
        <Link href={logoHref} aria-label={homeAriaLabel}>
          <Image
            src="/banner.svg"
            alt=""
            width={450}
            height={105}
            className="h-11 w-auto md:h-10"
            priority
            unoptimized
          />
        </Link>
        <Link href={projectsHref} className={projectsLinkClass}>
          {projectsLabel}
        </Link>
      </nav>
    </header>
  );
}
