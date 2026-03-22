import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { isLocale, type Locale } from "@/lib/i18n";

// ─── UI chrome strings ────────────────────────────────────────────────────────
const UI = {
  de: {
    meta: {
      title: "Datenschutzerklärung | TradeLens",
      description:
        "Datenschutzerklärung der TradeLens iOS App von Citran Digital.",
    },
    breadcrumb: "Datenschutzerklärung",
    eyebrow: "Rechtliches",
    pageTitle: "Datenschutzerklärung",
    provider: "Bereitgestellt von Citran Digital",
    date: "Stand: 21.03.2026",
    backLink: "← Zurück zu TradeLens",
    copyright: (y: number) => `© ${y} Citran Digital. Alle Rechte vorbehalten.`,
  },
  en: {
    meta: {
      title: "Privacy Policy | TradeLens",
      description: "Privacy Policy of the TradeLens iOS App by Citran Digital.",
    },
    breadcrumb: "Privacy Policy",
    eyebrow: "Legal",
    pageTitle: "Privacy Policy",
    provider: "Provided by Citran Digital",
    date: "Last updated: March 21, 2026",
    backLink: "← Back to TradeLens",
    copyright: (y: number) => `© ${y} Citran Digital. All rights reserved.`,
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
  const t = UI[raw as Locale].meta;
  return { title: t.title, description: t.description };
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const ui = UI[locale];

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
            {ui.breadcrumb}
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
            {ui.eyebrow}
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
            {ui.pageTitle}
          </h1>
          <p style={{ fontSize: 15, color: "#7f7f7f", margin: "0 0 4px" }}>
            {ui.provider}
          </p>
          <p style={{ fontSize: 14, color: "#7f7f7f", margin: 0 }}>{ui.date}</p>
        </div>

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {locale === "de" ? <DeContent /> : <EnContent />}
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
            {ui.backLink}
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
        {ui.copyright(new Date().getFullYear())}
      </footer>
    </div>
  );
}

// ─── German content ───────────────────────────────────────────────────────────
function DeContent() {
  return (
    <>
      <DocSection heading="1. Verantwortlicher">
        Verantwortlich für die Datenbearbeitung im Sinne des Schweizer
        Datenschutzgesetzes (DSG) ist:
        <AddressBlock
          lines={[
            "Daniele Citran",
            "Pfruendhofstrasse 54",
            "8910 Affoltern am Albis",
            "Schweiz",
          ]}
          email="contact@citran.digital"
        />
      </DocSection>

      <DocSection heading="2. Erhebung und Bearbeitung personenbezogener Daten">
        Wir bearbeiten personenbezogene Daten nur im erforderlichen Umfang. Dazu
        gehören:
        <BulletList
          items={[
            "Direkt erhobene Daten (z. B. E-Mail-Adresse bei Support-Anfragen oder Kontoerstellung)",
            "Vertrags- und Zahlungsdaten im Rahmen kostenpflichtiger Abonnements",
            "Automatisch erfasste Daten wie IP-Adresse (anonymisiert), Betriebssystem, Geräteinformationen, Nutzungsverhalten, App-Version, Absturzberichte",
            "Bilddaten, die der Analyse von Trading-Charts dienen",
          ]}
        />
        Diese Daten dienen der Bereitstellung, Verbesserung und Absicherung
        unserer Dienste.
        <br />
        <br />
        Die Speicherung erfolgt sowohl:
        <BulletList
          items={[
            "auf den Geräten der Endnutzer (z. B. lokal gespeicherte Analysebilder oder Einstellungen), als auch",
            "auf unseren Servern (z. B. Analyseparameter, Fehlerprotokolle) zur Sicherstellung der Funktionalität und Verbesserung des Services.",
          ]}
        />
      </DocSection>

      <DocSection heading="3. Analyse- und Trackingtools">
        Zur Nutzungsanalyse setzen wir ggf. Dienste wie Google Analytics oder
        Firebase Analytics ein. Dabei werden Informationen über Ihr
        Nutzerverhalten pseudonymisiert gespeichert.
        <br />
        <br />
        Die Bearbeitung erfolgt nur mit Ihrer ausdrücklichen Einwilligung. Diese
        Einwilligung kann jederzeit mit Wirkung für die Zukunft widerrufen
        werden.
        <br />
        <br />
        Weitere Informationen: Google Ireland Ltd., Gordon House, Barrow Street,
        Dublin 4, Irland
        <br />
        Datenschutzerklärung:{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#3B82F6", textDecoration: "none" }}
        >
          policies.google.com/privacy
        </a>
      </DocSection>

      <DocSection heading="4. Zwecke der Bearbeitung">
        Wir verwenden Ihre Daten zu folgenden Zwecken:
        <BulletList
          items={[
            "Zur Bereitstellung und Verbesserung unserer App",
            "Zur Durchführung der Analysefunktionen",
            "Zur Kommunikation mit Ihnen (Support, Produktinformationen)",
            "Zur Abwicklung von Abonnements",
            "Zur Analyse von Nutzungsmustern (nur mit Einwilligung)",
          ]}
        />
      </DocSection>

      <DocSection heading="5. Weitergabe von Daten">
        Eine Weitergabe erfolgt nur:
        <BulletList
          items={[
            "an Hosting- und Zahlungsdienstleister",
            "an Analyse- und Trackinganbieter (nur mit Einwilligung)",
            "bei gesetzlicher Verpflichtung",
            "an externe Dienstleister zur Funktionsumsetzung, darunter:",
          ]}
        />
        <ThirdPartyBox
          name="OpenAI"
          rows={[
            {
              label: "Zweck",
              value:
                "Analyse von Chartbildern und Verbesserung der KI-Modelle (nur mit Einwilligung)",
            },
            {
              label: "Art der Daten",
              value:
                "Screenshots/Fotos von Charts (keine direkte Identifizierung möglich)",
            },
            {
              label: "Hinweis",
              value:
                "Bitte laden Sie ausschliesslich Chartbilder hoch. Sollten versehentlich personenbezogene Inhalte enthalten sein, können diese ebenfalls an OpenAI übermittelt werden.",
            },
            {
              label: "Ort der Bearbeitung",
              value:
                "USA. Die Übermittlung erfolgt auf Grundlage geeigneter Garantien (Standardvertragsklauseln).",
            },
          ]}
        />
        Weitere Dienstleister:
        <BulletList
          items={[
            "RevenueCat (Abonnementverwaltung)",
            "TikTok (Marketingoptimierung)",
            "Meta (Marketingoptimierung)",
          ]}
        />
        Einige dieser Anbieter befinden sich ausserhalb der Schweiz bzw. EU. Die
        Datenübermittlung erfolgt nur unter Sicherstellung eines angemessenen
        Datenschutzniveaus.
      </DocSection>

      <DocSection heading="6. Cookies und ähnliche Technologien">
        Unsere App und Website nutzen Cookies oder vergleichbare Technologien
        zur Funktionsgewährleistung, Analyse und ggf. Marketing. Sie können Ihre
        Cookie-Einstellungen jederzeit ändern oder Ihre Einwilligung widerrufen.
      </DocSection>

      <DocSection heading="7. Speicherdauer">
        Personenbezogene Daten werden nur so lange gespeichert, wie dies für die
        Zwecke der Bearbeitung erforderlich ist oder wie es gesetzliche
        Aufbewahrungsfristen verlangen.
      </DocSection>

      <DocSection heading="8. Datenschutzrechte der Nutzer">
        Sie haben im Rahmen des geltenden Schweizer Datenschutzgesetzes folgende
        Rechte:
        <BulletList
          items={[
            "Auskunft über gespeicherte Daten",
            "Berichtigung unrichtiger Daten",
            "Löschung von Daten",
            "Einschränkung der Bearbeitung",
            "Herausgabe/Übertragung Ihrer Daten",
            "Widerruf erteilter Einwilligungen",
          ]}
        />
        Zudem haben Sie das Recht, beim Eidgenössischen Datenschutz- und
        Öffentlichkeitsbeauftragten (EDÖB) Beschwerde einzureichen.
      </DocSection>

      <DocSection heading="9. Kinderschutz">
        Unsere Dienste richten sich nicht an Kinder unter 13 Jahren. Wir
        erfassen wissentlich keine Daten von Kindern ohne Zustimmung der Eltern
        oder Erziehungsberechtigten.
      </DocSection>

      <DocSection heading="10. Marketing und Kommunikation">
        Wenn Sie dem Empfang von Informationen zustimmen, können wir Ihnen
        Updates oder Angebote senden. Sie können sich jederzeit davon abmelden,
        z. B. über den Abmeldelink in E-Mails oder durch Kontaktaufnahme mit
        uns.
      </DocSection>

      <DocSection heading="11. Aktualisierungen der Datenschutzerklärung">
        Diese Datenschutzerklärung kann aktualisiert werden. Die jeweils
        aktuelle Version ist über unsere App oder Website einsehbar. Änderungen
        werden entsprechend kenntlich gemacht.
      </DocSection>

      {/* Contact */}
      <div
        style={{ paddingTop: 8, borderTop: "1px solid rgba(255,255,255,0.08)" }}
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
          12. Kontakt
        </h2>
        <p
          style={{
            fontSize: 15,
            color: "#b6b6b6",
            lineHeight: 1.75,
            marginBottom: 16,
          }}
        >
          Bei Fragen oder zur Ausübung Ihrer Rechte erreichen Sie uns unter:
        </p>
        <p
          style={{
            fontSize: 15,
            color: "#b6b6b6",
            lineHeight: 1.55,
            margin: 0,
          }}
        >
          Daniele Citran
          <br />
          Pfruendhofstrasse 54
          <br />
          8910 Affoltern am Albis
          <br />
          Schweiz
          <br />
          <a
            href="mailto:contact@citran.digital"
            style={{ color: "#3B82F6", textDecoration: "none" }}
          >
            contact@citran.digital
          </a>
        </p>
      </div>
    </>
  );
}

// ─── English content ──────────────────────────────────────────────────────────
function EnContent() {
  return (
    <>
      <DocSection heading="1. Data Controller">
        The data controller within the meaning of the Swiss Federal Act on Data
        Protection (FADP) is:
        <AddressBlock
          lines={[
            "Citran Digital",
            "Pfruendhofstrasse 54",
            "8910 Affoltern am Albis",
            "Switzerland",
          ]}
          email="contact@citran.digital"
        />
      </DocSection>

      <DocSection heading="2. Collection and Processing of Personal Data">
        We process personal data only to the extent necessary. This includes:
        <BulletList
          items={[
            "Data collected directly (e.g. email address when submitting a support request or creating an account)",
            "Contractual and payment data in connection with paid subscriptions",
            "Automatically collected data such as IP address (anonymised), operating system, device information, usage behaviour, app version and crash reports",
            "Image data used for the analysis of trading charts",
          ]}
        />
        This data is used to provide, improve and secure our services.
        <br />
        <br />
        Data is stored both:
        <BulletList
          items={[
            "on end-user devices (e.g. locally stored analysis images or settings), and",
            "on our servers (e.g. analysis parameters, error logs) to ensure functionality and improve the service.",
          ]}
        />
      </DocSection>

      <DocSection heading="3. Analytics and Tracking">
        For usage analytics, we may use services such as Google Analytics or
        Firebase Analytics. Information about your usage behaviour is stored in
        pseudonymised form.
        <br />
        <br />
        Processing takes place only with your explicit consent. This consent may
        be withdrawn at any time with effect for the future.
        <br />
        <br />
        Further information: Google Ireland Ltd., Gordon House, Barrow Street,
        Dublin 4, Ireland
        <br />
        Privacy Policy:{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#3B82F6", textDecoration: "none" }}
        >
          policies.google.com/privacy
        </a>
      </DocSection>

      <DocSection heading="4. Purposes of Processing">
        We use your data for the following purposes:
        <BulletList
          items={[
            "To provide and improve our App",
            "To carry out the analysis functions",
            "To communicate with you (support, product information)",
            "To process subscriptions",
            "To analyse usage patterns (with consent only)",
          ]}
        />
      </DocSection>

      <DocSection heading="5. Data Disclosure">
        Data is only shared:
        <BulletList
          items={[
            "with hosting and payment service providers",
            "with analytics and tracking providers (with consent only)",
            "when required by law",
            "with external service providers for service delivery, including:",
          ]}
        />
        <ThirdPartyBox
          name="OpenAI"
          rows={[
            {
              label: "Purpose",
              value:
                "Analysis of chart images and improvement of AI models (with consent only)",
            },
            {
              label: "Data type",
              value:
                "Screenshots/photos of charts (no direct identification possible)",
            },
            {
              label: "Note",
              value:
                "Please upload only chart images. If personal content is included accidentally, it may also be transmitted to OpenAI.",
            },
            {
              label: "Processing location",
              value:
                "USA. Transfer takes place on the basis of appropriate safeguards (Standard Contractual Clauses).",
            },
          ]}
        />
        Additional service providers:
        <BulletList
          items={[
            "RevenueCat (subscription management)",
            "TikTok (marketing optimisation)",
            "Meta (marketing optimisation)",
          ]}
        />
        Some of these providers are located outside Switzerland or the EU. Data
        transfers take place only where an adequate level of data protection is
        ensured.
      </DocSection>

      <DocSection heading="6. Cookies and Similar Technologies">
        Our App and website use cookies or similar technologies for
        functionality, analytics and, where applicable, marketing purposes. You
        may change your cookie settings or withdraw your consent at any time.
      </DocSection>

      <DocSection heading="7. Retention Period">
        Personal data is retained only for as long as necessary for the purposes
        of processing, or as required by statutory retention obligations.
      </DocSection>

      <DocSection heading="8. Data Subject Rights">
        Under the applicable Swiss Federal Act on Data Protection, you have the
        following rights:
        <BulletList
          items={[
            "Access to stored data",
            "Rectification of inaccurate data",
            "Erasure of data",
            "Restriction of processing",
            "Portability of your data",
            "Withdrawal of granted consents",
          ]}
        />
        You also have the right to lodge a complaint with the Federal Data
        Protection and Information Commissioner (FDPIC).
      </DocSection>

      <DocSection heading="9. Child Protection">
        Our services are not directed at children under the age of 13. We do not
        knowingly collect data from children without parental or guardian
        consent.
      </DocSection>

      <DocSection heading="10. Marketing and Communication">
        If you consent to receiving information, we may send you updates or
        offers. You may unsubscribe at any time, e.g. via the unsubscribe link
        in emails or by contacting us directly.
      </DocSection>

      <DocSection heading="11. Updates to this Privacy Policy">
        This Privacy Policy may be updated. The current version is available via
        our App or website. Any changes will be communicated accordingly.
      </DocSection>

      {/* Contact */}
      <div
        style={{ paddingTop: 8, borderTop: "1px solid rgba(255,255,255,0.08)" }}
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
          12. Contact
        </h2>
        <p
          style={{
            fontSize: 15,
            color: "#b6b6b6",
            lineHeight: 1.75,
            marginBottom: 16,
          }}
        >
          For questions or to exercise your rights, please contact us at:
        </p>
        <p
          style={{
            fontSize: 15,
            color: "#b6b6b6",
            lineHeight: 1.55,
            margin: 0,
          }}
        >
          Daniele Citran
          <br />
          Pfruendhofstrasse 54
          <br />
          8910 Affoltern am Albis
          <br />
          Switzerland
          <br />
          <a
            href="mailto:contact@citran.digital"
            style={{ color: "#3B82F6", textDecoration: "none" }}
          >
            contact@citran.digital
          </a>
        </p>
      </div>
    </>
  );
}

// ─── Helper components ────────────────────────────────────────────────────────
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

function BulletList({ items }: { items: string[] }) {
  return (
    <ul style={{ margin: "12px 0", paddingLeft: 22, listStyleType: "disc" }}>
      {items.map((item) => (
        <li
          key={item}
          style={{
            fontSize: 15,
            color: "#b6b6b6",
            lineHeight: 1.7,
            marginBottom: 6,
            display: "list-item",
          }}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function AddressBlock({ lines, email }: { lines: string[]; email: string }) {
  return (
    <p
      style={{
        margin: "14px 0 0",
        fontSize: 15,
        color: "#b6b6b6",
        lineHeight: 1.55,
      }}
    >
      {lines.map((line, i) => (
        <span key={i}>
          {line}
          <br />
        </span>
      ))}
      <a
        href={`mailto:${email}`}
        style={{ color: "#3B82F6", textDecoration: "none" }}
      >
        {email}
      </a>
    </p>
  );
}

function ThirdPartyBox({
  name,
  rows,
}: {
  name: string;
  rows: { label: string; value: string }[];
}) {
  return (
    <div
      style={{
        margin: "14px 0",
        borderLeft: "3px solid rgba(59,130,246,0.5)",
        background: "rgba(59,130,246,0.04)",
        borderRadius: "0 10px 10px 0",
        padding: "16px 20px",
      }}
    >
      <p
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: "#93c5fd",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          marginBottom: 12,
        }}
      >
        {name}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {rows.map(({ label, value }) => (
          <div
            key={label}
            style={{ display: "flex", gap: 10, alignItems: "flex-start" }}
          >
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#7f7f7f",
                minWidth: 120,
                paddingTop: 2,
                flexShrink: 0,
              }}
            >
              {label}
            </span>
            <span style={{ fontSize: 14, color: "#b6b6b6", lineHeight: 1.6 }}>
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
