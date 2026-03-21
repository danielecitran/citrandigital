import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { isLocale, type Locale } from "@/lib/i18n";

// ─── Translations ─────────────────────────────────────────────────────────────
const T = {
  de: {
    meta: {
      title: "Nutzungsbedingungen | TradeLens",
      description:
        "Allgemeine Geschäftsbedingungen der TradeLens iOS App von Citran Digital.",
    },
    breadcrumb: "Nutzungsbedingungen",
    eyebrow: "Rechtliches",
    pageTitle: "Allgemeine Geschäftsbedingungen",
    provider: "Bereitgestellt von Citran Digital",
    date: "Stand: 21.03.2026",
    backLink: "← Zurück zu TradeLens",
    copyright: (y: number) => `© ${y} Citran Digital. Alle Rechte vorbehalten.`,
    privacyLink: "TradeLens Datenschutzerklärung →",
    contactIntro: "Bei Fragen zu diesen AGB erreichen Sie uns unter:",
    sections: [
      {
        heading: "1. Geltungsbereich und Vertragsgegenstand",
        body: `Diese Allgemeinen Geschäftsbedingungen (AGB) regeln die Nutzung der mobilen Applikation „TradeLens", bereitgestellt von Citran Digital (nachfolgend „ich", „wir", „uns" oder „Anbieter" genannt). TradeLens bietet automatisierte Analysen von Trading-Charts anhand fotografierter oder hochgeladener Bilder (nachfolgend „Analyse"). Durch die Nutzung unserer Dienste erklären Sie sich mit diesen AGB sowie unserer Datenschutzerklärung einverstanden.`,
      },
      {
        heading: "2. Nutzungsberechtigung und Lizenz",
        body: `Sie erhalten eine beschränkte, nicht übertragbare, nicht-exklusive und widerrufbare Lizenz zur Nutzung der App für private, nicht-kommerzielle Zwecke. Die Nutzung erfolgt gemäss den jeweiligen App Store Richtlinien (z. B. Apple App Store oder Google Play Store).`,
      },
      {
        heading: "3. Keine Finanz- oder Anlageberatung",
        callout: { variant: "warning" as const, badge: "Wichtiger Hinweis" },
        body: `Die durch TradeLens bereitgestellten Analysen und Informationen stellen keine Finanz-, Anlage- oder Handelsempfehlungen dar. Die Ergebnisse basieren auf KI-gestützten Algorithmen und dienen ausschliesslich Informationszwecken. Für finanzielle Entscheidungen sind stets eigene Recherchen sowie gegebenenfalls die Beratung durch zugelassene Finanzexperten erforderlich.`,
      },
      {
        heading: "4. Haftungsausschluss und Gewährleistung",
        body: `Die Nutzung der App erfolgt auf eigene Gefahr. Die bereitgestellten Inhalte werden ohne Gewähr für Vollständigkeit, Richtigkeit oder Genauigkeit angeboten. Wir übernehmen keine Haftung für Verluste oder Schäden, die durch die Nutzung der App entstehen. Die App wird „wie besehen" bereitgestellt, ohne ausdrückliche oder stillschweigende Garantien.`,
      },
      {
        heading: "5. Verantwortung des Nutzers",
        body: `Sie sind für alle Aktivitäten verantwortlich, die über Ihr Benutzerkonto erfolgen. Es liegt in Ihrer Verantwortung, Zugangsdaten sicher aufzubewahren und uns umgehend über unautorisierte Zugriffe zu informieren.`,
      },
      {
        heading: "6. Altersfreigabe und rechtliche Voraussetzungen",
        body: `Die Nutzung der App ist ab 13 Jahren gestattet. Nutzer unter 18 Jahren dürfen die App nur mit Zustimmung ihrer Erziehungsberechtigten verwenden. Mit der Nutzung versichern Sie, die gesetzlichen Voraussetzungen Ihres Landes zu erfüllen.`,
      },
      {
        heading: "7. Abonnements, Zahlungen und Kündigung",
        body: `Die App bietet ein automatisches, wöchentliches und 6-Monatiges Abonnement an. Die Abrechnung erfolgt über den jeweiligen App Store. Abonnements können jederzeit bis 24 Stunden vor Ablauf des aktuellen Zeitraums gekündigt werden. Bei Kündigung endet der Zugang zu Premium-Funktionen mit Ablauf des bezahlten Zeitraums. Rückerstattungen erfolgen ausschliesslich über den App Store Anbieter.`,
      },
      {
        heading: "8. Datenschutz",
        privacySection: true,
        body: `Wir verarbeiten personenbezogene Daten gemäss den geltenden Datenschutzgesetzen (insb. DSG). Einzelheiten können Sie unserer Datenschutzerklärung entnehmen.`,
      },
      {
        heading: "9. Rechte Dritter und geistiges Eigentum",
        body: `Alle Inhalte, Marken, Logos und Softwarekomponenten innerhalb der App sind urheberrechtlich oder anderweitig geschützt. Die Nutzung dieser Inhalte ist nur im Rahmen der App gestattet. Bei mutmasslichen Rechtsverletzungen durch Inhalte oder Analysen der App bitten wir um umgehende Kontaktaufnahme.`,
      },
      {
        heading: "10. Nutzungsbeschränkung",
        callout: { variant: "info" as const, badge: "Fair Use Policy" },
        body: `Zur fairen Nutzung des Dienstes behalten wir uns vor, die Anzahl der monatlich durchführbaren Chartanalysen pro Nutzer auf maximal 100 Analysen zu beschränken. Bei Überschreitung dieser Grenze kann der Zugriff auf weitere Analysen bis auf Weiteres eingeschränkt werden.`,
      },
      {
        heading: "11. Vertragsverletzungen und Sperrung",
        body: `Wir behalten uns das Recht vor, bei Verstossen gegen diese AGB den Zugang zur App zeitweise oder dauerhaft zu sperren, insbesondere bei missbräuchlicher Nutzung.`,
      },
      {
        heading: "12. Drittanbieterbedingungen und App Store Hinweise",
        body: `Die Nutzung der App kann Bedingungen Dritter unterliegen (z. B. Ihres Mobilfunkanbieters, des Anbieters zur KI-Bereitstellung oder App Store Betreibers). Diese sind vom Nutzer zu beachten. Apple und Google sind nicht Vertragspartei dieser Vereinbarung, können aber im Rahmen ihrer Richtlinien als Drittbegünstigte auftreten.`,
      },
      {
        heading: "13. Änderung der AGB",
        body: `Wir behalten uns vor, diese AGB jederzeit zu ändern. Änderungen werden über die App oder per Mitteilung bekanntgegeben. Mit fortgesetzter Nutzung erklären Sie sich mit den geänderten Bedingungen einverstanden.`,
      },
      {
        heading: "14. Salvatorische Klausel",
        body: `Sollten einzelne Bestimmungen dieser AGB ganz oder teilweise unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.`,
      },
      {
        heading: "15. Kontakt",
        contactSection: true,
        body: `Bei Fragen zu diesen AGB erreichen Sie uns unter:`,
      },
    ],
  },
  en: {
    meta: {
      title: "Terms of Use | TradeLens",
      description:
        "Terms and Conditions of the TradeLens iOS App by Citran Digital.",
    },
    breadcrumb: "Terms of Use",
    eyebrow: "Legal",
    pageTitle: "Terms and Conditions",
    provider: "Provided by Citran Digital",
    date: "Last updated: March 21, 2026",
    backLink: "← Back to TradeLens",
    copyright: (y: number) => `© ${y} Citran Digital. All rights reserved.`,
    privacyLink: "TradeLens Privacy Policy →",
    contactIntro:
      "For any questions regarding these Terms, please contact us at:",
    sections: [
      {
        heading: "1. Scope and Subject Matter",
        body: `These Terms and Conditions govern the use of the mobile application "TradeLens", provided by Citran Digital (hereinafter referred to as "I", "we", "us" or "Provider"). TradeLens offers automated analyses of trading charts based on photographed or uploaded images (hereinafter "Analysis"). By using our services, you agree to these Terms and Conditions as well as our Privacy Policy.`,
      },
      {
        heading: "2. Usage Rights and License",
        body: `You are granted a limited, non-transferable, non-exclusive and revocable license to use the App for private, non-commercial purposes. Use of the App is subject to the applicable App Store guidelines (e.g. Apple App Store or Google Play Store).`,
      },
      {
        heading: "3. No Financial or Investment Advice",
        callout: { variant: "warning" as const, badge: "Important Notice" },
        body: `The analyses and information provided by TradeLens do not constitute financial, investment or trading recommendations. The results are based on AI-powered algorithms and are intended for informational purposes only. Any financial decisions require independent research and, where appropriate, consultation with a licensed financial professional.`,
      },
      {
        heading: "4. Disclaimer and Limitation of Liability",
        body: `Use of the App is at your own risk. The content provided is offered without warranty as to its completeness, accuracy or correctness. We accept no liability for losses or damages arising from the use of the App. The App is provided "as is", without express or implied warranties of any kind.`,
      },
      {
        heading: "5. User Responsibility",
        body: `You are responsible for all activities that occur through your user account. It is your responsibility to keep your login credentials secure and to notify us immediately of any unauthorized access.`,
      },
      {
        heading: "6. Age Requirements and Legal Eligibility",
        body: `Use of the App is permitted from the age of 13. Users under the age of 18 may only use the App with the consent of a parent or legal guardian. By using the App, you confirm that you meet the legal requirements applicable in your country.`,
      },
      {
        heading: "7. Subscriptions, Payments and Cancellation",
        body: `The App offers automatic weekly and 6-month subscription plans. Billing is handled through the respective App Store. Subscriptions may be cancelled at any time up to 24 hours before the end of the current billing period. Upon cancellation, access to premium features will continue until the end of the paid period. Refunds are processed exclusively through the App Store provider.`,
      },
      {
        heading: "8. Privacy",
        privacySection: true,
        body: `We process personal data in accordance with applicable data protection laws. Further details can be found in our Privacy Policy.`,
      },
      {
        heading: "9. Third-Party Rights and Intellectual Property",
        body: `All content, trademarks, logos and software components within the App are protected by copyright or other intellectual property rights. Use of this content is permitted solely within the scope of the App. If you become aware of any potential infringement of rights through content or analyses provided by the App, please contact us immediately.`,
      },
      {
        heading: "10. Usage Restrictions",
        callout: { variant: "info" as const, badge: "Fair Use Policy" },
        body: `To ensure fair use of the service, we reserve the right to limit the number of chart analyses a user may perform per month to a maximum of 100 analyses. If this limit is exceeded, access to further analyses may be temporarily restricted.`,
      },
      {
        heading: "11. Breach of Terms and Account Suspension",
        body: `We reserve the right to temporarily or permanently suspend access to the App in the event of a violation of these Terms, in particular in cases of abusive use.`,
      },
      {
        heading: "12. Third-Party Terms and App Store Notices",
        body: `Use of the App may be subject to the terms of third parties (e.g. your mobile network operator, the AI infrastructure provider or the App Store operator). These are the responsibility of the user to observe. Apple and Google are not parties to this agreement but may act as third-party beneficiaries under their respective policies.`,
      },
      {
        heading: "13. Changes to These Terms",
        body: `We reserve the right to amend these Terms at any time. Changes will be communicated via the App or by notice. Continued use of the App following any such changes constitutes your acceptance of the updated Terms.`,
      },
      {
        heading: "14. Severability",
        body: `If any provision of these Terms is found to be wholly or partially invalid or unenforceable, the validity of the remaining provisions shall not be affected.`,
      },
      {
        heading: "15. Contact",
        contactSection: true,
        body: `For any questions regarding these Terms, please contact us at:`,
      },
    ],
  },
} as const;

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const t = T[raw as Locale].meta;
  return { title: t.title, description: t.description };
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function TermsOfUsePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = T[locale];

  return (
    <div
      style={{
        fontFamily:
          "var(--font-plus-jakarta, 'Plus Jakarta Sans', system-ui, sans-serif)",
        background: "#010101",
        color: "#ffffff",
        minHeight: "100vh",
      }}
    >
      {/* Minimal nav */}
      <header
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            height: 68,
          }}
        >
          <Link
            href={`/${locale}/tradelens`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              textDecoration: "none",
            }}
            aria-label="TradeLens"
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                overflow: "hidden",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.1)",
              }}
            >
              <Image
                src="/tradelens.png"
                alt="TradeLens"
                width={34}
                height={34}
              />
            </div>
            <span
              style={{
                fontSize: 17,
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-0.03em",
              }}
            >
              TradeLens
            </span>
          </Link>
          <span
            style={{
              marginLeft: 16,
              paddingLeft: 16,
              borderLeft: "1px solid rgba(255,255,255,0.12)",
              fontSize: 14,
              color: "#7f7f7f",
            }}
          >
            {t.breadcrumb}
          </span>
        </div>
      </header>

      {/* Document */}
      <main
        style={{ maxWidth: 720, margin: "0 auto", padding: "72px 24px 120px" }}
      >
        {/* Page header */}
        <div
          style={{
            marginBottom: 56,
            paddingBottom: 40,
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#3B82F6",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            {t.eyebrow}
          </div>
          <h1
            style={{
              fontSize: "clamp(28px, 5vw, 44px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: "#ffffff",
              lineHeight: 1.1,
              marginBottom: 10,
            }}
          >
            {t.pageTitle}
          </h1>
          <p style={{ fontSize: 15, color: "#7f7f7f", margin: "0 0 4px" }}>
            {t.provider}
          </p>
          <p style={{ fontSize: 14, color: "#7f7f7f", margin: 0 }}>{t.date}</p>
        </div>

        {/* Sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {t.sections.map((section) => {
            const isContact =
              "contactSection" in section && section.contactSection;
            const isPrivacy =
              "privacySection" in section && section.privacySection;
            const callout = "callout" in section ? section.callout : null;

            if (isContact) {
              return (
                <div
                  key={section.heading}
                  style={{
                    paddingTop: 8,
                    borderTop: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <h2
                    style={{
                      fontSize: 17,
                      fontWeight: 700,
                      color: "#ffffff",
                      letterSpacing: "-0.02em",
                      marginBottom: 14,
                    }}
                  >
                    {section.heading}
                  </h2>
                  <p
                    style={{
                      fontSize: 15,
                      color: "#b6b6b6",
                      lineHeight: 1.75,
                      marginBottom: 16,
                    }}
                  >
                    {section.body}
                  </p>
                  <p
                    style={{
                      fontSize: 15,
                      color: "#b6b6b6",
                      lineHeight: 1.75,
                      margin: 0,
                    }}
                  >
                    Daniele Citran
                    <br />
                    <a
                      href="mailto:contact@citran.digital"
                      style={{ color: "#3B82F6", textDecoration: "none" }}
                    >
                      contact@citran.digital
                    </a>
                  </p>
                </div>
              );
            }

            return (
              <DocSection key={section.heading} heading={section.heading}>
                {callout ? (
                  <Callout variant={callout.variant} badge={callout.badge}>
                    {section.body}
                  </Callout>
                ) : isPrivacy ? (
                  <>
                    {section.body}{" "}
                    <Link
                      href={`/${locale}/tradelens/privacy-policy`}
                      style={{
                        color: "#3B82F6",
                        textDecoration: "none",
                        fontWeight: 500,
                      }}
                    >
                      {t.privacyLink}
                    </Link>
                  </>
                ) : (
                  section.body
                )}
              </DocSection>
            );
          })}
        </div>

        <div style={{ marginTop: 64, textAlign: "center" }}>
          <Link
            href={`/${locale}/tradelens`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 14,
              fontWeight: 600,
              color: "#3B82F6",
              textDecoration: "none",
            }}
          >
            {t.backLink}
          </Link>
        </div>
      </main>

      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "24px",
          textAlign: "center",
          fontSize: 13,
          color: "#7f7f7f",
        }}
      >
        {t.copyright(new Date().getFullYear())}
      </footer>
    </div>
  );
}

// ─── Doc section ──────────────────────────────────────────────────────────────
function DocSection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2
        style={{
          fontSize: 17,
          fontWeight: 700,
          color: "#ffffff",
          letterSpacing: "-0.02em",
          marginBottom: 12,
        }}
      >
        {heading}
      </h2>
      <div style={{ fontSize: 15, color: "#b6b6b6", lineHeight: 1.75 }}>
        {children}
      </div>
    </div>
  );
}

// ─── Callout highlight ────────────────────────────────────────────────────────
function Callout({
  variant,
  badge,
  children,
}: {
  variant: "warning" | "info";
  badge: string;
  children: React.ReactNode;
}) {
  const warn = variant === "warning";
  return (
    <div
      style={{
        borderLeft: `3px solid ${warn ? "rgba(239,68,68,0.7)" : "rgba(59,130,246,0.7)"}`,
        background: warn ? "rgba(239,68,68,0.05)" : "rgba(59,130,246,0.05)",
        borderRadius: "0 10px 10px 0",
        padding: "16px 20px",
      }}
    >
      <span
        style={{
          display: "inline-block",
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: warn ? "#fca5a5" : "#93c5fd",
          background: warn ? "rgba(239,68,68,0.12)" : "rgba(59,130,246,0.12)",
          border: `1px solid ${warn ? "rgba(239,68,68,0.3)" : "rgba(59,130,246,0.3)"}`,
          borderRadius: 100,
          padding: "2px 10px",
          marginBottom: 10,
        }}
      >
        {badge}
      </span>
      <p
        style={{ fontSize: 15, color: "#b6b6b6", lineHeight: 1.75, margin: 0 }}
      >
        {children}
      </p>
    </div>
  );
}
