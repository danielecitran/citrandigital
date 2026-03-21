import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative group inline-flex items-center justify-center gap-1 border text-foreground text-center rounded-full transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-black/[0.04] hover:bg-black/[0.07] border-black/15 text-neutral-900 dark:bg-white/5 dark:hover:bg-white/[0.02] dark:border-white/25 dark:text-white",
        solid:
          "bg-neutral-900 text-white hover:bg-neutral-800 border-transparent hover:border-black/20 dark:bg-white dark:text-black dark:hover:bg-white/90 dark:hover:border-white/40 transition-all duration-200",
        ghost:
          "border-transparent bg-transparent text-neutral-900 hover:border-black/20 hover:bg-black/[0.06] dark:text-white dark:hover:border-white/35 dark:hover:bg-white/10",
      },
      size: {
        default: "px-7 py-1.5 text-sm",
        sm: "px-4 py-0.5 text-sm",
        lg: "px-10 py-2.5 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const neonLineTop =
  "pointer-events-none absolute inset-x-0 inset-y-0 mx-auto h-px w-3/4 bg-linear-to-r from-transparent via-neutral-900/55 to-transparent opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100 dark:via-white/90";
const neonLineBottom =
  "pointer-events-none absolute inset-x-0 -bottom-px mx-auto h-px w-3/4 bg-linear-to-r from-transparent via-neutral-900/55 to-transparent opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-40 dark:via-white/90";

export type NeonButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "href"
> &
  VariantProps<typeof buttonVariants> & {
    neon?: boolean;
    href?: string;
  };

const NeonButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  NeonButtonProps
>(
  (
    {
      className,
      neon = true,
      size,
      variant,
      children,
      href,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const classes = cn(buttonVariants({ variant, size }), className);

    const content = (
      <>
        {neon ? (
          <>
            <span className={neonLineTop} aria-hidden />
            {children}
            <span className={neonLineBottom} aria-hidden />
          </>
        ) : (
          children
        )}
      </>
    );

    if (href) {
      return (
        <Link
          href={href}
          className={classes}
          ref={ref as React.Ref<HTMLAnchorElement>}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        type={type}
        className={classes}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...props}
      >
        {content}
      </button>
    );
  },
);
NeonButton.displayName = "NeonButton";

export { NeonButton, NeonButton as Button, buttonVariants };
