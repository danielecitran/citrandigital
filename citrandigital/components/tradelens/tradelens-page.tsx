"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  createContext,
  useContext,
  useRef,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import type { Locale } from "@/lib/i18n";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Props {
  locale: Locale;
}

// ─── Translations ─────────────────────────────────────────────────────────────
const T = {
  de: {
    nav: {
      howItWorks: "Wie es funktioniert",
      features: "Features",
      ariaLabel: "Hauptnavigation",
      ariaHome: "TradeLens – Zurück zur TradeLens-Seite",
    },
    hero: {
      badge: "Chart-Analysen in Sekunden",
      headlineL1: "Professionelle KI",
      headlineL2: "Chart Analysen in",
      headlineAccent: "Sekunden.",
      sub: "Lade einen Chart hoch und erhalte sofort eine detaillierte technische Analyse, klare Long/Short-Signale und einen vollständigen Trading-Plan.",
      exampleNote:
        "Hinweis: Zahlen & Assets sind Beispiele. In der App analysierst du deinen eigenen Chart.",
      trendLabel: "TREND SIGNAL",
      confidence: "Konfidenz 87%",
      aiLabel: "KI ANALYSE",
      newsLabel: "NEWS ANALYSE",
      sentiment: "Sentiment",
    },
    howItWorks: {
      eyebrow: "In 3 Schritten",
      heading: "Wie es funktioniert",
      steps: [
        {
          title: "Chart hochladen",
          description:
            "Fotografiere deinen Chart oder wähle einen Screenshot aus deiner Galerie.",
        },
        {
          title: "KI analysiert in Sekunden",
          description:
            "Unsere KI analysiert Trend, Muster, Volumen und Sentiment in Echtzeit.",
        },
        {
          title: "Klar handeln",
          description:
            "Erhalte einen vollständigen Trading-Plan mit Entry-Points, Stop-Loss und Risikobewertung.",
        },
      ],
      stepLabel: (n: number) => `Schritt ${n}`,
    },
    features: {
      eyebrow: "Funktionen",
      heading: "Was TradeLens kann",
      subtitle:
        "Alles was du brauchst, um besser zu traden wurde in einer App entwickelt.",
      items: [
        {
          title: "KI Chart Analyse",
          description:
            "Erhalte sofort eine professionelle technische Analyse mit Trend, Volatilität, Support- & Resistance-Levels, Chart-Patterns und einem klaren Trading-Plan.",
        },
        {
          title: "100+ News in Sekunden analysiert",
          description:
            "Die KI analysiert über 100 aktuelle Nachrichten zu deinem Asset und liefert dir sofortige Markt-Insights damit du immer informiert handelst.",
        },
        {
          title: "Dein persönlicher Trading Mentor",
          description:
            "Stelle Fragen zu Trading-Strategien, Risikomanagement und Marktanalyse. Der Trading-Mentor antwortet personalisiert und angepasst an dein Erfahrungslevel.",
        },
        {
          title: "Klare Long & Short Signale",
          description:
            "Keine Zweifel mehr. TradeLens gibt dir klare Handlungsempfehlungen: Long, Short oder Hold mit ausführlicher Begründung.",
        },
        {
          title: "Aktien, Crypto, Forex & mehr",
          description:
            "Egal ob du Kryptowährungen, Aktien, Forex oder Rohstoffe tradest, TradeLens analysiert jeden Chart jeder Asset-Klasse.",
        },
        {
          title: "Personalisiert auf dein Level",
          description:
            "Egal ob Anfänger oder Profi, TradeLens passt sich deinem Erfahrungslevel und deinen Märkten an, um dir die relevantesten Insights zu geben.",
        },
      ],
    },
    valueProps: {
      headingPart1: "Was Experten Stunden kostet,",
      headingAccent: "erledigt TradeLens in Sekunden.",
      items: [
        {
          icon: "bolt",
          stat: "Bis zu 6x",
          label: "schneller",
          description: "profitable Trades finden als mit manueller Analyse",
        },
        {
          icon: "spark",
          stat: "100+",
          label: "News",
          description: "gleichzeitig analysiert für jeden deiner Assets",
        },
        {
          icon: "orbit",
          stat: "24/7",
          label: "verfügbar",
          description: "Dein Trading-Mentor ist immer für dich erreichbar",
        },
      ],
    },
    cta: {
      countPrefix: "Über",
      countSuffix: "zufriedene Trader",
      heading: "Maximiere deine Profite mit TradeLens Pro",
      sub: "Weniger Zweifel, mehr Sicherheit bei jedem Trade. Starte noch heute.",
    },
    appStore: {
      line1: "Laden im",
      line2: "App Store",
    },
    footer: {
      tagline: "Klare Chart-Analysen. Klare Entscheidungen.",
      connectHeading: "Vernetze dich mit uns",
      legalHeading: "Rechtliches",
      privacyPolicy: "Datenschutzerklärung",
      termsOfUse: "Nutzungsbedingungen",
      contactHeading: "Kontakt",
      copyright: (year: number) =>
        `© ${year} Citran Digital. Alle Rechte vorbehalten.`,
      ariaTikTok: "TradeLens auf TikTok",
      ariaInstagram: "TradeLens auf Instagram",
      ariaEmail: "TradeLens per E-Mail kontaktieren",
      ariaLegal: "Rechtliche Links",
    },
  },
  en: {
    nav: {
      howItWorks: "How it works",
      features: "Features",
      ariaLabel: "Main navigation",
      ariaHome: "TradeLens – Back to the TradeLens page",
    },
    hero: {
      badge: "Chart analysis in seconds",
      headlineL1: "Professional AI",
      headlineL2: "Chart Analysis in",
      headlineAccent: "Seconds.",
      sub: "Upload a chart and instantly receive a detailed technical analysis, clear long/short signals, and a complete trading plan.",
      exampleNote:
        "Note: values & assets are examples. In the app, you analyze your own chart.",
      trendLabel: "TREND SIGNAL",
      confidence: "Confidence 87%",
      aiLabel: "AI ANALYSIS",
      newsLabel: "NEWS ANALYSIS",
      sentiment: "Sentiment",
    },
    howItWorks: {
      eyebrow: "3 simple steps",
      heading: "How it works",
      steps: [
        {
          title: "Upload a Chart",
          description:
            "Photograph your chart or pick a screenshot from your gallery, ready in seconds.",
        },
        {
          title: "AI Analyzes in Seconds",
          description:
            "Our AI analyzes trend, patterns, volume and sentiment in real time, fully automated.",
        },
        {
          title: "Trade with Clarity",
          description:
            "Get a complete trading plan with entry points, stop-loss and risk assessment.",
        },
      ],
      stepLabel: (n: number) => `Step ${n}`,
    },
    features: {
      eyebrow: "Features",
      heading: "What TradeLens can do",
      subtitle: "Everything you need to trade smarter, all in one app.",
      items: [
        {
          title: "AI Chart Analysis",
          description:
            "Instantly receive a professional technical analysis with trend, volatility, support and resistance levels, chart patterns, and a clear trading plan.",
        },
        {
          title: "100+ News Analyzed in Seconds",
          description:
            "The AI analyzes over 100 current news articles on your asset and delivers instant market insights so you always trade informed.",
        },
        {
          title: "Your Personal Trading Mentor",
          description:
            "Ask questions about trading strategies, risk management and market analysis. The AI mentor responds in a personalized way adapted to your experience level.",
        },
        {
          title: "Clear Long and Short Signals",
          description:
            "No more doubt. TradeLens gives you clear action recommendations: Long, Short or Hold with a detailed explanation.",
        },
        {
          title: "Stocks, Crypto, Forex and more",
          description:
            "Whether you trade cryptocurrencies, stocks, forex or commodities, TradeLens analyzes any chart of any asset class.",
        },
        {
          title: "Personalized to Your Level",
          description:
            "Beginner or pro, TradeLens adapts to your experience level and your markets to give you the most relevant insights.",
        },
      ],
    },
    valueProps: {
      headingPart1: "What experts spend hours on,",
      headingAccent: "TradeLens handles in seconds.",
      items: [
        {
          icon: "bolt",
          stat: "Up to 6x",
          label: "faster",
          description: "Find profitable trades compared to manual analysis",
        },
        {
          icon: "spark",
          stat: "100+",
          label: "News at once",
          description: "Analyzed simultaneously for each of your assets",
        },
        {
          icon: "orbit",
          stat: "24/7",
          label: "available",
          description: "Your AI trading mentor is always there for you",
        },
      ],
    },
    cta: {
      countPrefix: "Over",
      countSuffix: "satisfied traders",
      heading: "Maximize your profits with TradeLens Pro",
      sub: "Less doubt, more confidence on every trade. Start today.",
    },
    appStore: {
      line1: "Download on the",
      line2: "App Store",
    },
    footer: {
      tagline: "Clear chart analysis. Better decisions.",
      connectHeading: "Connect with us",
      legalHeading: "Legal",
      privacyPolicy: "Privacy Policy",
      termsOfUse: "Terms of Use",
      contactHeading: "Contact",
      copyright: (year: number) =>
        `© ${year} Citran Digital. All rights reserved.`,
      ariaTikTok: "TradeLens on TikTok",
      ariaInstagram: "TradeLens on Instagram",
      ariaEmail: "Contact TradeLens by email",
      ariaLegal: "Legal links",
    },
  },
} as const;

// ─── Mobile / touch: avoid heavy blur + infinite motion (Safari iOS) ─────────
const TradeLensMotionLiteContext = createContext(false);

function subscribeTradeLensMotionLite(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};
  const mqTouch = window.matchMedia("(hover: none)");
  const mqNarrow = window.matchMedia("(max-width: 768px)");
  const fire = () => onStoreChange();
  mqTouch.addEventListener("change", fire);
  mqNarrow.addEventListener("change", fire);
  return () => {
    mqTouch.removeEventListener("change", fire);
    mqNarrow.removeEventListener("change", fire);
  };
}

function getTradeLensMotionLiteSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(hover: none)").matches ||
    window.matchMedia("(max-width: 768px)").matches
  );
}

function useTradeLensMotionLiteFlag(): boolean {
  const prefersReduced = useReducedMotion();
  const mediaLite = useSyncExternalStore(
    subscribeTradeLensMotionLite,
    getTradeLensMotionLiteSnapshot,
    () => false,
  );
  return Boolean(prefersReduced || mediaLite);
}

function useTradeLensMotionLite(): boolean {
  return useContext(TradeLensMotionLiteContext);
}

/** Sticky TLNav (~72px) + etwas Luft, damit Überschriften nicht unter der Bar landen */
const TL_NAV_ANCHOR_OFFSET_PX = 88;

function scrollToTradeLensSection(
  elementId: string,
  behavior: ScrollBehavior = "smooth",
): void {
  const el = document.getElementById(elementId);
  if (!el) return;
  const top =
    el.getBoundingClientRect().top + window.scrollY - TL_NAV_ANCHOR_OFFSET_PX;
  window.scrollTo({ top: Math.max(0, top), behavior });
}

// ─── Shared: Fade-in-up on scroll ─────────────────────────────────────────────
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const lite = useTradeLensMotionLite();
  return (
    <motion.div
      ref={ref}
      initial={lite ? { opacity: 0 } : { opacity: 0, y: 32 }}
      animate={inView ? (lite ? { opacity: 1 } : { opacity: 1, y: 0 }) : {}}
      transition={
        lite
          ? { duration: 0.35, ease: [0.22, 1, 0.36, 1], delay }
          : { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Count-up number ──────────────────────────────────────────────────────────
function CountUp({
  target,
  duration = 2200,
}: {
  target: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  return <span ref={ref}>{count.toLocaleString("de-CH")}</span>;
}

// ─── Apple App Store Badge ────────────────────────────────────────────────────
function AppStoreBadge({
  large = false,
  locale,
}: {
  large?: boolean;
  locale: Locale;
}) {
  const t = T[locale].appStore;
  const lite = useTradeLensMotionLite();
  return (
    <motion.a
      href="https://apps.apple.com/app/id6753321240"
      aria-label="TradeLens im App Store herunterladen"
      whileHover={
        lite
          ? undefined
          : { scale: 1.03, boxShadow: "0 0 28px rgba(59,130,246,0.45)" }
      }
      whileTap={lite ? { scale: 0.98 } : { scale: 0.97 }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: large ? 14 : 11,
        background: "#ffffff",
        borderRadius: 13,
        padding: large ? "13px 28px" : "10px 20px",
        textDecoration: "none",
        color: "#000",
        boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
        cursor: "pointer",
        flexShrink: 0,
      }}
    >
      <svg
        viewBox="0 0 24 24"
        width={large ? 26 : 21}
        height={large ? 32 : 26}
        fill="#000"
      >
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          lineHeight: 1.15,
          alignItems: "flex-start",
        }}
      >
        <span
          style={{
            fontSize: large ? 11 : 10,
            fontWeight: 400,
            opacity: 0.65,
            letterSpacing: "0.05em",
          }}
        >
          {t.line1}
        </span>
        <span
          style={{
            fontSize: large ? 21 : 18,
            fontWeight: 700,
            letterSpacing: "-0.025em",
          }}
        >
          {t.line2}
        </span>
      </div>
    </motion.a>
  );
}

// ─── Icon container ────────────────────────────────────────────────────────────
function IconBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 18,
        flexShrink: 0,
        filter: "drop-shadow(0 0 14px rgba(59,130,246,0.22))",
      }}
    >
      {children}
    </div>
  );
}

// ─── Inline SVG Icons ─────────────────────────────────────────────────────────
const ICONS = {
  camera: (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#3B82F6"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  ),
  sparkles: (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#3B82F6"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4M19 17v4M3 5h4M17 19h4" />
    </svg>
  ),
  trendingUp: (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#3B82F6"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  ),
  barChart: (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#3B82F6"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </svg>
  ),
  newspaper: (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#3B82F6"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
      <path d="M18 14h-8M15 18h-5M10 6h8v4h-8V6Z" />
    </svg>
  ),
  chat: (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#3B82F6"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  arrowUpDown: (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#3B82F6"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="17 11 12 6 7 11" />
      <polyline points="17 18 12 13 7 18" />
    </svg>
  ),
  globe: (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#3B82F6"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  user: (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#3B82F6"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  boltMini: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#60A5FA"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  sparkMini: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#60A5FA"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.7 5.2a2 2 0 0 1-1.3 1.3L3 12l5.2 1.7a2 2 0 0 1 1.3 1.3L12 21l1.7-5.2a2 2 0 0 1 1.3-1.3L21 12l-5.2-1.7a2 2 0 0 1-1.3-1.3L12 3Z" />
    </svg>
  ),
  orbitMini: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#60A5FA"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" opacity="0.7" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
};

const STEP_ICONS = [ICONS.camera, ICONS.sparkles, ICONS.trendingUp];
const FEATURE_ICONS = [
  ICONS.barChart,
  ICONS.newspaper,
  ICONS.chat,
  ICONS.arrowUpDown,
  ICONS.globe,
  ICONS.user,
];

// ─── NAVIGATION ───────────────────────────────────────────────────────────────
function TLNav({ locale }: { locale: Locale }) {
  const t = T[locale].nav;
  const [scrolled, setScrolled] = useState(false);
  const lite = useTradeLensMotionLite();
  const prefersReducedMotion = useReducedMotion();

  const handleInPageAnchor = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    e.preventDefault();
    const behavior: ScrollBehavior = prefersReducedMotion ? "auto" : "smooth";
    scrollToTradeLensSection(sectionId, behavior);
    window.history.replaceState(null, "", `#${sectionId}`);
  };

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        ...(lite
          ? {}
          : {
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }),
        background: lite
          ? scrolled
            ? "rgba(1,1,1,0.98)"
            : "rgba(1,1,1,0.96)"
          : scrolled
            ? "rgba(1,1,1,0.92)"
            : "rgba(1,1,1,0.55)",
        borderBottom: `1px solid ${scrolled ? "rgba(255,255,255,0.08)" : "transparent"}`,
        transition: "background 0.35s ease, border-color 0.35s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 72,
        }}
      >
        <Link
          href={`/${locale}/tradelens`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            textDecoration: "none",
          }}
          aria-label={t.ariaHome}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              overflow: "hidden",
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.12), 0 4px 12px rgba(0,0,0,0.5)",
            }}
          >
            <Image
              src="/tradelens.png"
              alt="TradeLens App Icon"
              width={40}
              height={40}
            />
          </div>
          <span
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            TradeLens
          </span>
        </Link>

        <nav
          style={{ display: "flex", alignItems: "center", gap: 4 }}
          aria-label={t.ariaLabel}
        >
          <a
            href="#how-it-works"
            onClick={(e) => handleInPageAnchor(e, "how-it-works")}
            className="hidden md:inline-flex items-center text-[#b6b6b6] hover:text-white text-sm font-medium px-3.5 py-2 rounded-lg transition-colors duration-200"
          >
            {t.howItWorks}
          </a>
          <a
            href="#features"
            onClick={(e) => handleInPageAnchor(e, "features")}
            className="hidden md:inline-flex items-center text-[#b6b6b6] hover:text-white text-sm font-medium px-3.5 py-2 rounded-lg transition-colors duration-200"
          >
            {t.features}
          </a>
        </nav>
      </div>
    </header>
  );
}

// ─── HERO SECTION ─────────────────────────────────────────────────────────────
function TLHero({ locale }: { locale: Locale }) {
  const t = T[locale].hero;
  const lite = useTradeLensMotionLite();
  const [heroCardIndex, setHeroCardIndex] = useState(1);

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "100px 24px 96px",
        textAlign: "center",
      }}
    >
      {lite ? (
        <>
          <div
            style={{
              position: "absolute",
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "min(100vw, 800px)",
              height: 480,
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse at center, rgba(59,130,246,0.14) 0%, rgba(99,102,241,0.06) 45%, transparent 72%)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "18%",
              right: "8%",
              width: 240,
              height: 240,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
        </>
      ) : (
        <>
          <motion.div
            animate={{ y: [0, -22, 0] }}
            transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
            style={{
              position: "absolute",
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 800,
              height: 600,
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse at center, rgba(59,130,246,0.18) 0%, rgba(99,102,241,0.09) 35%, transparent 70%)",
              filter: "blur(60px)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{
              duration: 9,
              ease: "easeInOut",
              repeat: Infinity,
              delay: 1.5,
            }}
            style={{
              position: "absolute",
              top: "20%",
              right: "10%",
              width: 300,
              height: 300,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)",
              filter: "blur(40px)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
        </>
      )}

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 820,
          margin: "0 auto",
        }}
      >
        {/* Hero rhythm: headline → sub → CTA → cards → note (consistent spacing) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0,
          }}
        >
          <FadeUp>
            <h1
              style={{
                fontSize: "clamp(36px, 6.5vw, 70px)",
                fontWeight: 800,
                letterSpacing: "-0.05em",
                lineHeight: 1.02,
                color: "#ffffff",
                margin: "0 0 24px",
              }}
            >
              {t.headlineL1}
              <br />
              {t.headlineL2}{" "}
              <span
                style={{
                  color: "#3B82F6",
                  position: "relative",
                  display: "inline-block",
                }}
              >
                {t.headlineAccent}
              </span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p
              style={{
                fontSize: "clamp(16px, 2vw, 20px)",
                fontWeight: 400,
                lineHeight: 1.7,
                color: "#b6b6b6",
                maxWidth: 600,
                margin: "0 0 44px",
              }}
            >
              {t.sub}
            </p>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="md:hidden">
                <AppStoreBadge locale={locale} />
              </div>
              <div className="hidden md:block">
                <AppStoreBadge large locale={locale} />
              </div>
            </div>
          </FadeUp>

          <div aria-hidden="true" style={{ height: 56 }} />

          <FadeUp delay={0.3}>
            {/* Mobile: touchable overlapping cards (angled peeks) */}
            <div
              className="md:hidden"
              style={{
                position: "relative",
                height: 196,
                width: "min(520px, 100%)",
                margin: "0 auto",
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: -22,
                  background:
                    "radial-gradient(ellipse at center, rgba(59,130,246,0.12) 0%, rgba(0,0,0,0) 62%)",
                  filter: "blur(12px)",
                  opacity: 0.7,
                }}
              />
              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                onDragEnd={(_, info) => {
                  const swipe = info.offset.x + info.velocity.x * 0.15;
                  if (swipe > 60) setHeroCardIndex((v) => Math.max(0, v - 1));
                  if (swipe < -60) setHeroCardIndex((v) => Math.min(2, v + 1));
                }}
                style={{ position: "absolute", inset: 0, touchAction: "pan-y" }}
              >
                {([0, 1, 2] as const).map((idx) => {
                  const isCenter = idx === heroCardIndex;
                  const isLeft = idx === heroCardIndex - 1;
                  const isRight = idx === heroCardIndex + 1;

                  const baseCardStyle: React.CSSProperties = {
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    translate: "-50% 0",
                    borderRadius: 20,
                    textAlign: "left",
                    boxShadow:
                      "0 14px 54px rgba(0,0,0,0.72), inset 0 1px 0 rgba(255,255,255,0.07)",
                    backdropFilter: lite ? undefined : "blur(12px)",
                    WebkitBackdropFilter: lite ? undefined : "blur(12px)",
                    width: 238,
                    padding: "16px 16px",
                    cursor: "pointer",
                    userSelect: "none",
                    WebkitUserSelect: "none",
                  };

                  const bgPrimary =
                    "linear-gradient(180deg, rgba(59,130,246,0.14) 0%, rgba(59,130,246,0.06) 45%, rgba(0,0,0,0) 100%), rgba(12,12,12,0.72)";
                  const bgSecondary =
                    "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 50%, rgba(0,0,0,0) 100%), rgba(19,19,19,0.72)";
                  const bg = idx === 1 ? bgPrimary : bgSecondary;

                  const animate = isCenter
                    ? { x: 0, rotate: 0, scale: 1, opacity: 1, zIndex: 3 }
                    : isLeft
                      ? {
                          x: -112,
                          rotate: -8,
                          scale: 0.92,
                          opacity: 0.82,
                          zIndex: 2,
                        }
                      : isRight
                        ? {
                            x: 112,
                            rotate: 8,
                            scale: 0.92,
                            opacity: 0.82,
                            zIndex: 2,
                          }
                        : {
                            x: idx < heroCardIndex ? -180 : 180,
                            rotate: idx < heroCardIndex ? -10 : 10,
                            scale: 0.9,
                            opacity: 0,
                            zIndex: 1,
                          };

                  return (
                    <motion.div
                      key={idx}
                      initial={false}
                      animate={animate}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 26,
                        mass: 0.9,
                      }}
                      style={{
                        ...baseCardStyle,
                        background: isCenter
                          ? idx === 1
                            ? bgPrimary.replace(
                                "rgba(12,12,12,0.72)",
                                "rgba(12,12,12,0.96)",
                              )
                            : bgSecondary.replace(
                                "rgba(19,19,19,0.72)",
                                "rgba(19,19,19,0.94)",
                              )
                          : bg,
                      }}
                      onClick={() => setHeroCardIndex(idx)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Hero card ${idx + 1}`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ")
                          setHeroCardIndex(idx);
                        if (e.key === "ArrowLeft")
                          setHeroCardIndex((v) => Math.max(0, v - 1));
                        if (e.key === "ArrowRight")
                          setHeroCardIndex((v) => Math.min(2, v + 1));
                      }}
                    >
                      {idx === 0 ? (
                        <>
                          <div
                            style={{
                              width: 30,
                              height: 30,
                              borderRadius: 10,
                              background: "rgba(34,197,94,0.12)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              marginBottom: 10,
                              boxShadow:
                                "0 0 0 rgba(0,0,0,0), 0 0 18px rgba(34,197,94,0.12)",
                            }}
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#22C55E"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                              <polyline points="16 7 22 7 22 13" />
                            </svg>
                          </div>
                          <div
                            style={{
                              fontSize: 10,
                              color: "#7f7f7f",
                              letterSpacing: "0.06em",
                              marginBottom: 6,
                            }}
                          >
                            {t.trendLabel}
                          </div>
                          <div
                            style={{
                              fontSize: 20,
                              fontWeight: 800,
                              color: "#22C55E",
                              letterSpacing: "-0.03em",
                            }}
                          >
                            Long ↑
                          </div>
                          <div
                            style={{
                              fontSize: 10,
                              color: "#7f7f7f",
                              marginTop: 6,
                            }}
                          >
                            {t.confidence}
                          </div>
                        </>
                      ) : idx === 1 ? (
                        <>
                          <div
                            style={{
                              fontSize: 10,
                              color: "#3B82F6",
                              fontWeight: 700,
                              letterSpacing: "0.08em",
                              marginBottom: 10,
                            }}
                          >
                            {t.aiLabel}
                          </div>
                          <div
                            style={{
                              fontSize: 13,
                              fontWeight: 700,
                              color: "#fff",
                              marginBottom: 12,
                            }}
                          >
                            BTC / USD
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 8,
                            }}
                          >
                            {[
                              {
                                label: "Entry",
                                value: "$43,200",
                                color: "#ffffff",
                              },
                              {
                                label: "Stop-Loss",
                                value: "$41,800",
                                color: "#ef4444",
                              },
                              {
                                label: "Target",
                                value: "$46,500",
                                color: "#22C55E",
                              },
                            ].map(({ label, value, color }) => (
                              <div
                                key={label}
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <span
                                  style={{ fontSize: 11, color: "#7f7f7f" }}
                                >
                                  {label}
                                </span>
                                <span
                                  style={{
                                    fontSize: 12,
                                    fontWeight: 700,
                                    color,
                                  }}
                                >
                                  {value}
                                </span>
                              </div>
                            ))}
                          </div>
                        </>
                      ) : (
                        <>
                          <div
                            style={{
                              width: 30,
                              height: 30,
                              borderRadius: 10,
                              background: "rgba(59,130,246,0.1)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              marginBottom: 10,
                              boxShadow:
                                "0 0 0 rgba(0,0,0,0), 0 0 18px rgba(59,130,246,0.14)",
                            }}
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#3B82F6"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                            </svg>
                          </div>
                          <div
                            style={{
                              fontSize: 10,
                              color: "#7f7f7f",
                              letterSpacing: "0.06em",
                              marginBottom: 6,
                            }}
                          >
                            {t.newsLabel}
                          </div>
                          <div
                            style={{
                              fontSize: 13,
                              fontWeight: 700,
                              color: "#fff",
                              marginBottom: 10,
                            }}
                          >
                            {t.sentiment}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              gap: 4,
                              flexWrap: "wrap",
                            }}
                          >
                            {["Bullish", "+2.3%", "100+ News"].map((tag) => (
                              <span
                                key={tag}
                                style={{
                                  fontSize: 10,
                                  fontWeight: 600,
                                  padding: "3px 8px",
                                  borderRadius: 100,
                                  background: "rgba(59,130,246,0.1)",
                                  color: "#60A5FA",
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* Desktop: simple aligned trio */}
            <div className="hidden md:flex flex-wrap justify-center gap-4 mt-16 mb-10">
              {/* Card 1: Signal */}
              <motion.div
                animate={lite ? false : { y: [0, -10, 0] }}
                transition={
                  lite
                    ? undefined
                    : { duration: 4.5, ease: "easeInOut", repeat: Infinity }
                }
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 50%, rgba(0,0,0,0) 100%), rgba(19,19,19,0.72)",
                  borderRadius: 20,
                  padding: "20px 22px",
                  width: 180,
                  textAlign: "left",
                  boxShadow:
                    "0 10px 38px rgba(0,0,0,0.62), inset 0 1px 0 rgba(255,255,255,0.06)",
                  backdropFilter: lite ? undefined : "blur(10px)",
                  WebkitBackdropFilter: lite ? undefined : "blur(10px)",
                }}
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 10,
                    background: "rgba(34,197,94,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 12,
                    boxShadow:
                      "0 0 0 rgba(0,0,0,0), 0 0 18px rgba(34,197,94,0.12)",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#22C55E"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                    <polyline points="16 7 22 7 22 13" />
                  </svg>
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "#7f7f7f",
                    letterSpacing: "0.05em",
                    marginBottom: 6,
                  }}
                >
                  {t.trendLabel}
                </div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: "#22C55E",
                    letterSpacing: "-0.03em",
                  }}
                >
                  Long ↑
                </div>
                <div style={{ fontSize: 11, color: "#7f7f7f", marginTop: 6 }}>
                  {t.confidence}
                </div>
              </motion.div>

              {/* Card 2: Trading plan */}
              <motion.div
                animate={lite ? false : { y: [0, -14, 0] }}
                transition={
                  lite
                    ? undefined
                    : {
                        duration: 5.5,
                        ease: "easeInOut",
                        repeat: Infinity,
                        delay: 0.4,
                      }
                }
                style={{
                  background:
                    "linear-gradient(180deg, rgba(59,130,246,0.14) 0%, rgba(59,130,246,0.06) 45%, rgba(0,0,0,0) 100%), rgba(12,12,12,0.72)",
                  borderRadius: 20,
                  padding: "22px 26px",
                  width: 210,
                  textAlign: "left",
                  boxShadow:
                    "0 14px 54px rgba(0,0,0,0.72), 0 0 44px rgba(59,130,246,0.10), inset 0 1px 0 rgba(255,255,255,0.07)",
                  backdropFilter: lite ? undefined : "blur(12px)",
                  WebkitBackdropFilter: lite ? undefined : "blur(12px)",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    color: "#3B82F6",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    marginBottom: 10,
                  }}
                >
                  {t.aiLabel}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#fff",
                    marginBottom: 14,
                  }}
                >
                  BTC / USD
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                  {[
                    { label: "Entry", value: "$43,200", color: "#ffffff" },
                    { label: "Stop-Loss", value: "$41,800", color: "#ef4444" },
                    { label: "Target", value: "$46,500", color: "#22C55E" },
                  ].map(({ label, value, color }) => (
                    <div
                      key={label}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ fontSize: 12, color: "#7f7f7f" }}>
                        {label}
                      </span>
                      <span style={{ fontSize: 13, fontWeight: 700, color }}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Card 3: News */}
              <motion.div
                animate={lite ? false : { y: [0, -9, 0] }}
                transition={
                  lite
                    ? undefined
                    : {
                        duration: 4,
                        ease: "easeInOut",
                        repeat: Infinity,
                        delay: 0.8,
                      }
                }
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 50%, rgba(0,0,0,0) 100%), rgba(19,19,19,0.72)",
                  borderRadius: 20,
                  padding: "20px 22px",
                  width: 180,
                  textAlign: "left",
                  boxShadow:
                    "0 10px 38px rgba(0,0,0,0.62), inset 0 1px 0 rgba(255,255,255,0.06)",
                  backdropFilter: lite ? undefined : "blur(10px)",
                  WebkitBackdropFilter: lite ? undefined : "blur(10px)",
                }}
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 10,
                    background: "rgba(59,130,246,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 12,
                    boxShadow:
                      "0 0 0 rgba(0,0,0,0), 0 0 18px rgba(59,130,246,0.14)",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                  </svg>
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "#7f7f7f",
                    letterSpacing: "0.05em",
                    marginBottom: 6,
                  }}
                >
                  {t.newsLabel}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#fff",
                    marginBottom: 10,
                  }}
                >
                  {t.sentiment}
                </div>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                  {["Bullish", "+2.3%", "100+ News"].map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        padding: "3px 8px",
                        borderRadius: 100,
                        background: "rgba(59,130,246,0.1)",
                        color: "#60A5FA",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
            <p
              style={{
                marginTop: 12,
                fontSize: 11,
                color: "rgba(182,182,182,0.72)",
                letterSpacing: "0.01em",
              }}
            >
              {t.exampleNote}
            </p>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ─── HOW IT WORKS ─────────────────────────────────────────────────────────────
function TLHowItWorks({ locale }: { locale: Locale }) {
  const t = T[locale].howItWorks;

  return (
    <section
      id="how-it-works"
      style={{ padding: "100px 24px", background: "#010101" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeUp className="text-center mb-16">
          <span
            style={{
              display: "inline-block",
              fontSize: 12,
              fontWeight: 700,
              color: "#3B82F6",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            {t.eyebrow}
          </span>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: "#ffffff",
              margin: 0,
            }}
          >
            {t.heading}
          </h2>
        </FadeUp>

        {/* Steps: clean flow layout (no "cards", no absolute timeline) */}
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {t.steps.map((step, i) => (
              <FadeUp key={step.title} delay={i * 0.08}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "84px 1fr",
                    gap: 18,
                    alignItems: "start",
                    padding:
                      i === t.steps.length - 1 ? "10px 0" : "10px 0 36px",
                  }}
                >
                  {/* Left rail: step index + connector */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                    aria-hidden="true"
                  >
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: 9999,
                        display: "grid",
                        placeItems: "center",
                        background:
                          "radial-gradient(circle at 30% 30%, rgba(96,165,250,0.20), rgba(59,130,246,0.07) 55%, rgba(0,0,0,0) 72%)",
                        boxShadow:
                          "0 0 0 rgba(0,0,0,0), 0 0 30px rgba(59,130,246,0.14), inset 0 1px 0 rgba(255,255,255,0.06)",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 850,
                          letterSpacing: "0.12em",
                          color: "#93c5fd",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    {i !== t.steps.length - 1 ? (
                      <div
                        style={{
                          width: 2,
                          flex: 1,
                          marginTop: 10,
                          background:
                            "linear-gradient(180deg, rgba(59,130,246,0.32) 0%, rgba(255,255,255,0.08) 60%, rgba(255,255,255,0) 100%)",
                          minHeight: 44,
                        }}
                      />
                    ) : null}
                  </div>

                  {/* Content */}
                  <div
                    style={{
                      borderBottom: "none",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: 22,
                        fontWeight: 800,
                        color: "#ffffff",
                        letterSpacing: "-0.04em",
                        margin: "2px 0 10px",
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 15,
                        lineHeight: 1.7,
                        color: "#b6b6b6",
                        margin: 0,
                        maxWidth: 640,
                      }}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FEATURES SECTION ─────────────────────────────────────────────────────────
function TLFeatures({ locale }: { locale: Locale }) {
  const t = T[locale].features;

  return (
    <section
      id="features"
      style={{ padding: "100px 24px", background: "#0a0a0a" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeUp className="text-center mb-4">
          <span
            style={{
              display: "inline-block",
              fontSize: 12,
              fontWeight: 700,
              color: "#3B82F6",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            {t.eyebrow}
          </span>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: "#ffffff",
              margin: "0 0 16px",
            }}
          >
            {t.heading}
          </h2>
          <p
            style={{
              fontSize: 18,
              color: "#b6b6b6",
              maxWidth: 540,
              margin: "0 auto 60px",
            }}
          >
            {t.subtitle}
          </p>
        </FadeUp>

        {/* Editorial feature list (spacing > dividers; no "card stack") */}
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-10">
            {t.items.map((feat, i) => (
              <FadeUp key={feat.title} delay={i * 0.06}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "40px 1fr",
                    gap: 16,
                    alignItems: "flex-start",
                  }}
                >
                  <div aria-hidden="true" style={{ paddingTop: 2 }}>
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: 9999,
                        display: "grid",
                        placeItems: "center",
                        background:
                          "radial-gradient(circle at 30% 30%, rgba(96,165,250,0.16), rgba(59,130,246,0.07) 55%, rgba(0,0,0,0) 72%)",
                        boxShadow:
                          "0 0 0 rgba(0,0,0,0), 0 0 26px rgba(59,130,246,0.10)",
                      }}
                    >
                      {FEATURE_ICONS[i]}
                    </div>
                  </div>
                  <div>
                    <h3
                      style={{
                        fontSize: 18,
                        fontWeight: 800,
                        color: "#ffffff",
                        letterSpacing: "-0.03em",
                        margin: "0 0 8px",
                      }}
                    >
                      {feat.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 15,
                        lineHeight: 1.7,
                        color: "#b6b6b6",
                        margin: 0,
                      }}
                    >
                      {feat.description}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── VALUE PROPS ──────────────────────────────────────────────────────────────
function TLValueProps({ locale }: { locale: Locale }) {
  const t = T[locale].valueProps;

  return (
    <section style={{ padding: "100px 24px", background: "#010101" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeUp className="text-center">
          <h2
            style={{
              fontSize: "clamp(26px, 4vw, 46px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: "#ffffff",
              maxWidth: 700,
              margin: "0 auto 56px",
            }}
          >
            {t.headingPart1}{" "}
            <span style={{ color: "#3B82F6" }}>{t.headingAccent}</span>
          </h2>
        </FadeUp>

        {/* Clean 3-up benefits (typography + whitespace, no gradients) */}
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-16">
            {t.items.map((vp, i) => (
              <FadeUp key={vp.label} delay={i * 0.08}>
                <div style={{ textAlign: "left" }}>
                  <div
                    style={{
                      fontSize: 64,
                      fontWeight: 900,
                      letterSpacing: "-0.08em",
                      lineHeight: 0.98,
                      color: "#ffffff",
                      marginBottom: 10,
                    }}
                  >
                    {vp.stat}
                  </div>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 800,
                      letterSpacing: "-0.02em",
                      color: "#ffffff",
                      marginBottom: 10,
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        width: 18,
                        height: 2,
                        borderRadius: 9999,
                        background: "rgba(59,130,246,0.9)",
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ color: "rgba(147,197,253,0.92)" }}>
                      {vp.label}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: 15,
                      lineHeight: 1.75,
                      color: "#b6b6b6",
                      margin: 0,
                      maxWidth: 360,
                    }}
                  >
                    {vp.description}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── DOWNLOAD CTA ─────────────────────────────────────────────────────────────
function TLDownloadCTA({ locale }: { locale: Locale }) {
  const t = T[locale].cta;
  const lite = useTradeLensMotionLite();

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "120px 24px",
        textAlign: "center",
        background: "#010101",
      }}
    >
      {lite ? (
        <>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "min(100vw, 640px)",
              height: 420,
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse, rgba(59,130,246,0.12) 0%, rgba(29,78,216,0.06) 45%, transparent 72%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "28%",
              left: "15%",
              width: 180,
              height: 180,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
        </>
      ) : (
        <>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 700,
              height: 500,
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse, rgba(59,130,246,0.2) 0%, rgba(29,78,216,0.1) 40%, transparent 70%)",
              filter: "blur(80px)",
              pointerEvents: "none",
            }}
          />
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
            style={{
              position: "absolute",
              top: "30%",
              left: "20%",
              width: 200,
              height: 200,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
              filter: "blur(30px)",
              pointerEvents: "none",
            }}
          />
        </>
      )}

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 700,
          margin: "0 auto",
        }}
      >
        <FadeUp>
          <div
            style={{
              fontSize: "clamp(14px, 2.5vw, 18px)",
              fontWeight: 700,
              color: "#3B82F6",
              letterSpacing: "-0.01em",
              marginBottom: 20,
            }}
          >
            {t.countPrefix} <CountUp target={10000} /> {t.countSuffix}
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h2
            style={{
              fontSize: "clamp(30px, 5vw, 58px)",
              fontWeight: 800,
              letterSpacing: "-0.05em",
              lineHeight: 1.05,
              color: "#ffffff",
              margin: "0 0 20px",
            }}
          >
            {t.heading}
          </h2>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p
            style={{
              fontSize: 18,
              color: "#b6b6b6",
              lineHeight: 1.65,
              margin: "0 auto 44px",
              maxWidth: 520,
            }}
          >
            {t.sub}
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="md:hidden">
              <AppStoreBadge locale={locale} />
            </div>
            <div className="hidden md:block">
              <AppStoreBadge large locale={locale} />
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function TLFooter({ locale }: { locale: Locale }) {
  const t = T[locale].footer;
  const year = new Date().getFullYear();
  const lite = useTradeLensMotionLite();

  return (
    <footer
      style={{
        background: "#010101",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        padding: "72px 24px 0",
      }}
      role="contentinfo"
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {/* 1. TradeLens brand */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  overflow: "hidden",
                  boxShadow: "0 0 0 1px rgba(255,255,255,0.1)",
                }}
              >
                <Image
                  src="/tradelens.png"
                  alt="TradeLens"
                  width={32}
                  height={32}
                />
              </div>
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  color: "#fff",
                  letterSpacing: "-0.03em",
                }}
              >
                TradeLens
              </span>
            </div>
            <p
              style={{
                fontSize: 13,
                color: "#7f7f7f",
                lineHeight: 1.65,
                margin: 0,
                maxWidth: 200,
              }}
            >
              {t.tagline}
            </p>
          </div>

          {/* 2. Connect */}
          <div>
            <p
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#7f7f7f",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              {t.connectHeading}
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <motion.a
                href="https://www.tiktok.com/@tradelensapp"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.ariaTikTok}
                whileHover={lite ? undefined : { scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 9999,
                  background: "rgba(255,255,255,0.05)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#b6b6b6",
                  textDecoration: "none",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(59,130,246,0.1)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 10px 34px rgba(0,0,0,0.55), 0 0 22px rgba(59,130,246,0.16), inset 0 1px 0 rgba(255,255,255,0.06)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(255,255,255,0.05)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.77 1.52V6.77a4.85 4.85 0 0 1-1-.08z" />
                </svg>
              </motion.a>
              <motion.a
                href="https://www.instagram.com/tradelens_en"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.ariaInstagram}
                whileHover={lite ? undefined : { scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 9999,
                  background: "rgba(255,255,255,0.05)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#b6b6b6",
                  textDecoration: "none",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(59,130,246,0.1)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 10px 34px rgba(0,0,0,0.55), 0 0 22px rgba(59,130,246,0.16), inset 0 1px 0 rgba(255,255,255,0.06)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(255,255,255,0.05)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </motion.a>
              <motion.a
                href="mailto:help@citran.digital"
                aria-label={t.ariaEmail}
                whileHover={lite ? undefined : { scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 9999,
                  background: "rgba(255,255,255,0.05)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#b6b6b6",
                  textDecoration: "none",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(59,130,246,0.1)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 10px 34px rgba(0,0,0,0.55), 0 0 22px rgba(59,130,246,0.16), inset 0 1px 0 rgba(255,255,255,0.06)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(255,255,255,0.05)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </motion.a>
            </div>
          </div>

          {/* 3. Legal */}
          <div>
            <p
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#7f7f7f",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              {t.legalHeading}
            </p>
            <nav
              aria-label={t.ariaLegal}
              style={{ display: "flex", flexDirection: "column", gap: 10 }}
            >
              <Link
                href={`/${locale}/tradelens/privacy-policy`}
                style={{
                  fontSize: 14,
                  color: "#b6b6b6",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                className="hover:text-white"
              >
                {t.privacyPolicy}
              </Link>
              <Link
                href={`/${locale}/tradelens/terms-of-use`}
                style={{
                  fontSize: 14,
                  color: "#b6b6b6",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                className="hover:text-white"
              >
                {t.termsOfUse}
              </Link>
            </nav>
          </div>

          {/* 4. Contact */}
          <div>
            <p
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#7f7f7f",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              {t.contactHeading}
            </p>
            <a
              href="mailto:help@citran.digital"
              style={{
                fontSize: 14,
                color: "#b6b6b6",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              className="hover:text-white"
            >
              help@citran.digital
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            marginTop: 64,
            paddingTop: 24,
            paddingBottom: 32,
            borderTop: "1px solid rgba(255,255,255,0.06)",
            textAlign: "center",
            fontSize: 13,
            color: "#7f7f7f",
          }}
        >
          {t.copyright(year)}
        </div>
      </div>
    </footer>
  );
}

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────
export function TradeLensPage({ locale }: Props) {
  const motionLite = useTradeLensMotionLiteFlag();

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;
    const el = document.getElementById(hash);
    if (!el) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior: ScrollBehavior = reduce ? "auto" : "smooth";
    const id = requestAnimationFrame(() => {
      scrollToTradeLensSection(hash, behavior);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <TradeLensMotionLiteContext.Provider value={motionLite}>
      <div
        style={{
          fontFamily:
            "var(--font-plus-jakarta, 'Plus Jakarta Sans', system-ui, sans-serif)",
          background: "#010101",
          color: "#ffffff",
          minHeight: "100vh",
          overflowX: "hidden",
          position: "relative",
        }}
      >
        {/* Ambient background (subtle, non-distracting) */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
            background:
              "radial-gradient(900px 600px at 12% 16%, rgba(59,130,246,0.10) 0%, rgba(0,0,0,0) 60%), radial-gradient(700px 480px at 88% 28%, rgba(99,102,241,0.08) 0%, rgba(0,0,0,0) 58%), radial-gradient(900px 520px at 50% 92%, rgba(34,197,94,0.05) 0%, rgba(0,0,0,0) 60%)",
            opacity: motionLite ? 0.55 : 0.8,
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(255,255,255,0.018) 0px, rgba(255,255,255,0.018) 1px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 6px)",
            opacity: motionLite ? 0 : 0.18,
          }}
        />
        <TLNav locale={locale} />
        <main style={{ position: "relative", zIndex: 1 }}>
          <TLHero locale={locale} />
          <TLHowItWorks locale={locale} />
          <TLFeatures locale={locale} />
          <TLValueProps locale={locale} />
          <TLDownloadCTA locale={locale} />
        </main>
        <TLFooter locale={locale} />
      </div>
    </TradeLensMotionLiteContext.Provider>
  );
}
