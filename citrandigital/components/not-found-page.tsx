import Link from "next/link";

import { buttonVariants } from "@/components/ui/neon-button";
import type { Dictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type NotFoundCopy = Dictionary["notFound"];

const neonLineTop =
  "pointer-events-none absolute inset-x-0 inset-y-0 mx-auto h-px w-3/4 bg-linear-to-r from-transparent via-neutral-900/55 to-transparent opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100 dark:via-white/90";
const neonLineBottom =
  "pointer-events-none absolute inset-x-0 -bottom-px mx-auto h-px w-3/4 bg-linear-to-r from-transparent via-neutral-900/55 to-transparent opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-40 dark:via-white/90";

export function NotFoundPage({
  locale,
  copy,
}: {
  locale: Locale;
  copy: NotFoundCopy;
}) {
  return (
    <div className="relative flex min-h-dvh flex-1 flex-col items-center justify-center overflow-hidden bg-black px-4 py-16 text-center">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,oklch(0.488_0.243_264.376/0.35),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_100%,oklch(0.32_0.06_264/0.18),transparent_50%)]"
        aria-hidden
      />
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.07]"
        viewBox="0 0 696 316"
        fill="none"
        aria-hidden
      >
        <title>Decorative lines</title>
        <path
          d="M-120 120C80 40 280 200 480 100C580 60 640 120 700 180"
          stroke="currentColor"
          strokeWidth="0.75"
        />
        <path
          d="M-60 220C100 280 320 80 520 200C600 240 660 200 720 140"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.6"
        />
      </svg>

      <main className="relative z-10 mx-auto flex max-w-lg flex-col items-center">
        <p className="mb-6 font-mono text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
          {copy.hint}
        </p>

        <h1 className="flex flex-col items-center gap-5">
          <span
            className={cn(
              "font-heading bg-linear-to-b from-white to-white/45 bg-clip-text text-7xl font-bold leading-none tracking-tighter text-transparent sm:text-8xl",
            )}
          >
            404
          </span>
          <span className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
            {copy.heading}
          </span>
        </h1>

        <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          {copy.body}
        </p>

        <div className="mt-12 flex w-full max-w-md flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Link
            href={`/${locale}`}
            className={cn(
              buttonVariants({ variant: "solid", size: "lg" }),
              "group w-full sm:w-auto",
            )}
          >
            <span className={neonLineTop} aria-hidden />
            {copy.ctaHome}
            <span className={neonLineBottom} aria-hidden />
          </Link>
          <Link
            href={`/${locale}/tradelens`}
            className={cn(
              buttonVariants({ variant: "ghost", size: "lg" }),
              "group w-full sm:w-auto",
            )}
          >
            <span className={neonLineTop} aria-hidden />
            {copy.ctaTradelens}
            <span className={neonLineBottom} aria-hidden />
          </Link>
        </div>
      </main>
    </div>
  );
}
