"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
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
      ariaHome: "TradeLens – Zurück zur Startseite",
    },
    hero: {
      badge: "KI-gestützte Chart Analysen",
      headlineL1: "Professionelle KI",
      headlineL2: "Chart Analysen in",
      headlineAccent: "Sekunden.",
      sub: "Lade einen Chart hoch und erhalte sofort eine detaillierte technische Analyse, klare Long/Short-Signale und einen vollständigen Trading-Plan.",
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
          title: "Screenshot machen",
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
    },
    features: {
      eyebrow: "Funktionen",
      heading: "Was TradeLens kann",
      subtitle: "Alles was du brauchst, um besser zu traden wurde in einer App entwickelt.",
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
        { emoji: "⚡", stat: "6x", label: "schneller", description: "profitable Trades finden als mit manueller Analyse" },
        { emoji: "💡", stat: "100+", label: "News", description: "gleichzeitig analysiert für jeden deiner Assets" },
        { emoji: "🎯", stat: "24/7", label: "verfügbar", description: "Dein Trading-Mentor ist immer für dich erreichbar" },
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
      tagline: "KI-gestützte Chart Analysen für smarte Trader.",
      connectHeading: "Vernetze dich mit uns",
      legalHeading: "Rechtliches",
      privacyPolicy: "Datenschutzerklärung",
      termsOfUse: "Nutzungsbedingungen",
      contactHeading: "Kontakt",
      copyright: (year: number) => `© ${year} Citran Digital. Alle Rechte vorbehalten.`,
      ariaTikTok: "TradeLens auf TikTok",
      ariaEmail: "TradeLens per E-Mail kontaktieren",
      ariaLegal: "Rechtliche Links",
    },
  },
  en: {
    nav: {
      howItWorks: "How it works",
      features: "Features",
      ariaLabel: "Main navigation",
      ariaHome: "TradeLens – Back to home",
    },
    hero: {
      badge: "AI-powered Chart Analysis",
      headlineL1: "Professional AI",
      headlineL2: "Chart Analysis in",
      headlineAccent: "Seconds.",
      sub: "Upload a chart and instantly receive a detailed technical analysis, clear long/short signals, and a complete trading plan.",
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
          title: "Take a Screenshot",
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
        { emoji: "⚡", stat: "6x", label: "faster", description: "Find profitable trades compared to manual analysis" },
        { emoji: "💡", stat: "100+", label: "News at once", description: "Analyzed simultaneously for each of your assets" },
        { emoji: "🎯", stat: "24/7", label: "available", description: "Your AI trading mentor is always there for you" },
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
      tagline: "AI-powered chart analysis for smart traders.",
      connectHeading: "Connect with us",
      legalHeading: "Legal",
      privacyPolicy: "Privacy Policy",
      termsOfUse: "Terms of Use",
      contactHeading: "Contact",
      copyright: (year: number) => `© ${year} Citran Digital. All rights reserved.`,
      ariaTikTok: "TradeLens on TikTok",
      ariaEmail: "Contact TradeLens by email",
      ariaLegal: "Legal links",
    },
  },
} as const;

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
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Count-up number ──────────────────────────────────────────────────────────
function CountUp({ target, duration = 2200 }: { target: number; duration?: number }) {
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
function AppStoreBadge({ large = false, locale }: { large?: boolean; locale: Locale }) {
  const t = T[locale].appStore;
  return (
    <motion.a
      href="https://apps.apple.com/app/tradelens-chart-analyse/id6753321240"
      aria-label="TradeLens im App Store herunterladen"
      whileHover={{ scale: 1.03, boxShadow: "0 0 28px rgba(59,130,246,0.45)" }}
      whileTap={{ scale: 0.97 }}
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
      <svg viewBox="0 0 24 24" width={large ? 26 : 21} height={large ? 32 : 26} fill="#000">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.15, alignItems: "flex-start" }}>
        <span style={{ fontSize: large ? 11 : 10, fontWeight: 400, opacity: 0.65, letterSpacing: "0.05em" }}>
          {t.line1}
        </span>
        <span style={{ fontSize: large ? 21 : 18, fontWeight: 700, letterSpacing: "-0.025em" }}>
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
        width: 48,
        height: 48,
        borderRadius: 14,
        background: "rgba(59,130,246,0.1)",
        border: "1px solid rgba(59,130,246,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
        flexShrink: 0,
      }}
    >
      {children}
    </div>
  );
}

// ─── Inline SVG Icons ─────────────────────────────────────────────────────────
const ICONS = {
  camera: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  ),
  sparkles: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4M19 17v4M3 5h4M17 19h4" />
    </svg>
  ),
  trendingUp: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  ),
  barChart: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </svg>
  ),
  newspaper: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
      <path d="M18 14h-8M15 18h-5M10 6h8v4h-8V6Z" />
    </svg>
  ),
  chat: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  arrowUpDown: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="17 11 12 6 7 11" />
      <polyline points="17 18 12 13 7 18" />
    </svg>
  ),
  globe: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  user: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
};

const STEP_ICONS = [ICONS.camera, ICONS.sparkles, ICONS.trendingUp];
const FEATURE_ICONS = [ICONS.barChart, ICONS.newspaper, ICONS.chat, ICONS.arrowUpDown, ICONS.globe, ICONS.user];

// ─── NAVIGATION ───────────────────────────────────────────────────────────────
function TLNav({ locale }: { locale: Locale }) {
  const t = T[locale].nav;
  const [scrolled, setScrolled] = useState(false);

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
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        background: scrolled ? "rgba(1,1,1,0.92)" : "rgba(1,1,1,0.55)",
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
          href={`/${locale}`}
          style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}
          aria-label={t.ariaHome}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              overflow: "hidden",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.12), 0 4px 12px rgba(0,0,0,0.5)",
            }}
          >
            <Image src="/tradelens.png" alt="TradeLens App Icon" width={40} height={40} />
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

        <nav style={{ display: "flex", alignItems: "center", gap: 4 }} aria-label={t.ariaLabel}>
          <a
            href="#how-it-works"
            className="hidden md:inline-flex items-center text-[#b6b6b6] hover:text-white text-sm font-medium px-3.5 py-2 rounded-lg transition-colors duration-200"
          >
            {t.howItWorks}
          </a>
          <a
            href="#features"
            className="hidden md:inline-flex items-center text-[#b6b6b6] hover:text-white text-sm font-medium px-3.5 py-2 rounded-lg transition-colors duration-200"
          >
            {t.features}
          </a>
          <div style={{ marginLeft: 8 }}>
            <AppStoreBadge locale={locale} />
          </div>
        </nav>
      </div>
    </header>
  );
}

// ─── HERO SECTION ─────────────────────────────────────────────────────────────
function TLHero({ locale }: { locale: Locale }) {
  const t = T[locale].hero;

  return (
    <section
      style={{ position: "relative", overflow: "hidden", padding: "100px 24px 80px", textAlign: "center" }}
    >
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
          background: "radial-gradient(ellipse at center, rgba(59,130,246,0.18) 0%, rgba(99,102,241,0.09) 35%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <motion.div
        animate={{ y: [0, 16, 0] }}
        transition={{ duration: 9, ease: "easeInOut", repeat: Infinity, delay: 1.5 }}
        style={{
          position: "absolute",
          top: "20%",
          right: "10%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 820, margin: "0 auto" }}>
        <FadeUp>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(59,130,246,0.08)",
              border: "1px solid rgba(59,130,246,0.25)",
              borderRadius: 100,
              padding: "7px 18px",
              marginBottom: 32,
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#3B82F6",
                boxShadow: "0 0 8px rgba(59,130,246,0.9)",
              }}
            />
            <span style={{ fontSize: 13, fontWeight: 600, color: "#60A5FA", letterSpacing: "0.02em" }}>
              {t.badge}
            </span>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h1
            style={{
              fontSize: "clamp(36px, 6.5vw, 70px)",
              fontWeight: 800,
              letterSpacing: "-0.05em",
              lineHeight: 1.02,
              color: "#ffffff",
              margin: "0 0 28px",
            }}
          >
            {t.headlineL1}
            <br />
            {t.headlineL2}{" "}
            <span style={{ color: "#3B82F6", position: "relative", display: "inline-block" }}>
              {t.headlineAccent}
            </span>
          </h1>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p
            style={{
              fontSize: "clamp(16px, 2vw, 20px)",
              fontWeight: 400,
              lineHeight: 1.7,
              color: "#b6b6b6",
              maxWidth: 600,
              margin: "0 auto 44px",
            }}
          >
            {t.sub}
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <AppStoreBadge large locale={locale} />
          </div>
        </FadeUp>

        <FadeUp delay={0.45}>
          <div className="flex flex-wrap justify-center gap-4 mt-16">
            {/* Card 1: Signal */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, ease: "easeInOut", repeat: Infinity }}
              style={{
                background: "#131313",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 20,
                padding: "20px 22px",
                width: 180,
                textAlign: "left",
                boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  background: "rgba(34,197,94,0.12)",
                  border: "1px solid rgba(34,197,94,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 12,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
              </div>
              <div style={{ fontSize: 11, color: "#7f7f7f", letterSpacing: "0.05em", marginBottom: 6 }}>
                {t.trendLabel}
              </div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#22C55E", letterSpacing: "-0.03em" }}>
                Long ↑
              </div>
              <div style={{ fontSize: 11, color: "#7f7f7f", marginTop: 6 }}>{t.confidence}</div>
            </motion.div>

            {/* Card 2: Trading plan */}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5.5, ease: "easeInOut", repeat: Infinity, delay: 0.4 }}
              style={{
                background: "#0f0f0f",
                border: "1px solid rgba(59,130,246,0.25)",
                borderRadius: 20,
                padding: "22px 26px",
                width: 210,
                textAlign: "left",
                boxShadow: "0 8px 40px rgba(0,0,0,0.6), 0 0 40px rgba(59,130,246,0.1)",
              }}
            >
              <div style={{ fontSize: 10, color: "#3B82F6", fontWeight: 700, letterSpacing: "0.08em", marginBottom: 10 }}>
                {t.aiLabel}
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 14 }}>BTC / USD</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { label: "Entry", value: "$43,200", color: "#ffffff" },
                  { label: "Stop-Loss", value: "$41,800", color: "#ef4444" },
                  { label: "Target", value: "$46,500", color: "#22C55E" },
                ].map(({ label, value, color }) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 12, color: "#7f7f7f" }}>{label}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color }}>{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Card 3: News */}
            <motion.div
              animate={{ y: [0, -9, 0] }}
              transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, delay: 0.8 }}
              style={{
                background: "#131313",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 20,
                padding: "20px 22px",
                width: 180,
                textAlign: "left",
                boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  background: "rgba(59,130,246,0.1)",
                  border: "1px solid rgba(59,130,246,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 12,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                </svg>
              </div>
              <div style={{ fontSize: 11, color: "#7f7f7f", letterSpacing: "0.05em", marginBottom: 6 }}>
                {t.newsLabel}
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 10 }}>
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
                      border: "1px solid rgba(59,130,246,0.2)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── HOW IT WORKS ─────────────────────────────────────────────────────────────
function TLHowItWorks({ locale }: { locale: Locale }) {
  const t = T[locale].howItWorks;

  return (
    <section id="how-it-works" style={{ padding: "100px 24px", background: "#010101" }}>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {t.steps.map((step, i) => (
            <FadeUp key={step.title} delay={i * 0.12}>
              <motion.div
                whileHover={{ scale: 1.02, borderColor: "rgba(59,130,246,0.3)" }}
                transition={{ duration: 0.3 }}
                style={{
                  background: "#131313",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 22,
                  padding: "32px 28px",
                  height: "100%",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 800,
                    color: "#3B82F6",
                    letterSpacing: "0.06em",
                    marginBottom: 20,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <IconBox>{STEP_ICONS[i]}</IconBox>
                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#ffffff",
                    letterSpacing: "-0.03em",
                    marginBottom: 12,
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ fontSize: 15, lineHeight: 1.65, color: "#b6b6b6", margin: 0 }}>
                  {step.description}
                </p>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FEATURES SECTION ─────────────────────────────────────────────────────────
function TLFeatures({ locale }: { locale: Locale }) {
  const t = T[locale].features;

  return (
    <section id="features" style={{ padding: "100px 24px", background: "#0a0a0a" }}>
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
          <p style={{ fontSize: 18, color: "#b6b6b6", maxWidth: 540, margin: "0 auto 60px" }}>
            {t.subtitle}
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {t.items.map((feat, i) => (
            <FadeUp key={feat.title} delay={i * 0.1}>
              <motion.div
                whileHover={{
                  scale: 1.02,
                  borderColor: "rgba(59,130,246,0.3)",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.5), 0 0 20px rgba(59,130,246,0.08)",
                }}
                transition={{ duration: 0.3 }}
                style={{
                  background: "#131313",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 22,
                  padding: "32px 30px",
                  height: "100%",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
                }}
              >
                <IconBox>{FEATURE_ICONS[i]}</IconBox>
                <h3
                  style={{
                    fontSize: 19,
                    fontWeight: 700,
                    color: "#ffffff",
                    letterSpacing: "-0.03em",
                    marginBottom: 10,
                  }}
                >
                  {feat.title}
                </h3>
                <p style={{ fontSize: 15, lineHeight: 1.65, color: "#b6b6b6", margin: 0 }}>
                  {feat.description}
                </p>
              </motion.div>
            </FadeUp>
          ))}
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
        <FadeUp className="text-center mb-16">
          <h2
            style={{
              fontSize: "clamp(26px, 4vw, 46px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: "#ffffff",
              maxWidth: 700,
              margin: "0 auto",
            }}
          >
            {t.headingPart1}{" "}
            <span style={{ color: "#3B82F6" }}>{t.headingAccent}</span>
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {t.items.map((vp, i) => (
            <FadeUp key={vp.label} delay={i * 0.12}>
              <div
                style={{
                  background: "#131313",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 22,
                  padding: "40px 32px",
                  textAlign: "center",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 16 }}>{vp.emoji}</div>
                <div
                  style={{
                    fontSize: 52,
                    fontWeight: 800,
                    letterSpacing: "-0.05em",
                    color: "#ffffff",
                    lineHeight: 1,
                    marginBottom: 4,
                  }}
                >
                  {vp.stat}
                </div>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#3B82F6",
                    marginBottom: 12,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {vp.label}
                </div>
                <p style={{ fontSize: 14, color: "#b6b6b6", lineHeight: 1.6, margin: 0 }}>
                  {vp.description}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── DOWNLOAD CTA ─────────────────────────────────────────────────────────────
function TLDownloadCTA({ locale }: { locale: Locale }) {
  const t = T[locale].cta;

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
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(59,130,246,0.2) 0%, rgba(29,78,216,0.1) 40%, transparent 70%)",
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
          background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
          filter: "blur(30px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 700, margin: "0 auto" }}>
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
            <AppStoreBadge large locale={locale} />
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
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, overflow: "hidden", boxShadow: "0 0 0 1px rgba(255,255,255,0.1)" }}>
                <Image src="/tradelens.png" alt="TradeLens" width={32} height={32} />
              </div>
              <span style={{ fontSize: 16, fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>
                TradeLens
              </span>
            </div>
            <p style={{ fontSize: 13, color: "#7f7f7f", lineHeight: 1.65, margin: 0, maxWidth: 200 }}>
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
                href="https://www.tiktok.com/@tradelens_de"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.ariaTikTok}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#b6b6b6",
                  textDecoration: "none",
                  transition: "background 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.1)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.77 1.52V6.77a4.85 4.85 0 0 1-1-.08z" />
                </svg>
              </motion.a>
              <motion.a
                href="mailto:help@citran.digital"
                aria-label={t.ariaEmail}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#b6b6b6",
                  textDecoration: "none",
                  transition: "background 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.1)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
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
            <nav aria-label={t.ariaLegal} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Link
                href={`/${locale}/tradelens/privacy-policy`}
                style={{ fontSize: 14, color: "#b6b6b6", textDecoration: "none", transition: "color 0.2s" }}
                className="hover:text-white"
              >
                {t.privacyPolicy}
              </Link>
              <Link
                href={`/${locale}/tradelens/terms-of-use`}
                style={{ fontSize: 14, color: "#b6b6b6", textDecoration: "none", transition: "color 0.2s" }}
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
              style={{ fontSize: 14, color: "#b6b6b6", textDecoration: "none", transition: "color 0.2s" }}
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
  return (
    <div
      style={{
        fontFamily: "var(--font-plus-jakarta, 'Plus Jakarta Sans', system-ui, sans-serif)",
        background: "#010101",
        color: "#ffffff",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <TLNav locale={locale} />
      <main>
        <TLHero locale={locale} />
        <TLHowItWorks locale={locale} />
        <TLFeatures locale={locale} />
        <TLValueProps locale={locale} />
        <TLDownloadCTA locale={locale} />
      </main>
      <TLFooter locale={locale} />
    </div>
  );
}
