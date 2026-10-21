"use client";

import { AnimatePresence, m } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { OPEN_CONSENT_EVENT, readConsent, saveConsent, type Consent } from "@/lib/consent";
import { easeOutExpo } from "@/lib/motion";
import { siteConfig } from "@/lib/site";

type GtagWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };

/** Loads Google Analytics 4. Called only after the visitor accepts. */
function startAnalytics(id: string) {
  const w = window as GtagWindow;
  if (w.gtag) {
    w.gtag("consent", "update", { analytics_storage: "granted" });
    return;
  }
  w.dataLayer = w.dataLayer ?? [];
  w.gtag = function gtag() {
    // gtag.js reads the arguments object itself, not an array.
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer!.push(arguments);
  };
  w.gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  w.gtag("js", new Date());
  w.gtag("config", id);
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);
}

/** Stops measurement and removes the Analytics cookies after a refusal. */
function stopAnalytics() {
  (window as GtagWindow).gtag?.("consent", "update", { analytics_storage: "denied" });
  const host = window.location.hostname;
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0].trim();
    if (!name.startsWith("_ga")) continue;
    for (const domain of ["", `; domain=${host}`, `; domain=.${host.replace(/^www\./, "")}`]) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain}`;
    }
  }
}

/**
 * Consent banner for audience measurement. Nothing is loaded and no cookie is
 * set before "Accepter". Refusing is as easy as accepting (CNIL). Without an
 * analytics id, the site sets no cookie at all and the banner never shows.
 */
export function CookieConsent() {
  const id = siteConfig.analyticsId;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!id) return;
    const consent = readConsent();
    if (consent === "granted") startAnalytics(id);
    // Shown after hydration: the static HTML cannot know the visitor's choice.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (consent === null) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, [id]);

  if (!id) return null;

  function choose(value: Consent) {
    saveConsent(value);
    if (value === "granted") startAnalytics(id);
    else stopAnalytics();
    setOpen(false);
  }

  return (
    <AnimatePresence>
      {open ? (
        <m.div
          role="dialog"
          aria-modal="false"
          aria-labelledby="consent-title"
          aria-describedby="consent-text"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16, transition: { duration: 0.3 } }}
          transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.6 }}
          className="fixed inset-x-0 bottom-0 z-[55] px-[max(1rem,env(safe-area-inset-left))] pb-[max(1rem,env(safe-area-inset-bottom))] sm:inset-x-auto sm:left-6 sm:max-w-md sm:px-0 sm:pb-6"
        >
          <div className="rounded-card border border-line-strong bg-surface/95 p-6 backdrop-blur-xl">
            <p id="consent-title" className="font-serif text-xl font-light">
              Mesure d&apos;audience
            </p>
            <p id="consent-text" className="mt-3 text-sm leading-relaxed text-muted">
              Avec votre accord, nous utilisons Google Analytics pour savoir comment le site est
              consulté. Si vous refusez, aucun cookie n&apos;est déposé.{" "}
              <Link
                href="/politique-de-confidentialite/"
                className="text-cream underline decoration-line-strong underline-offset-4 hover:decoration-accent"
              >
                En savoir plus
              </Link>
            </p>
            {/* Same size and style for both choices: refusing must be as easy as accepting. */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <Button variant="outline" size="sm" onClick={() => choose("denied")}>
                Refuser
              </Button>
              <Button variant="outline" size="sm" onClick={() => choose("granted")}>
                Accepter
              </Button>
            </div>
          </div>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
