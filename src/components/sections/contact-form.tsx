"use client";

import { AnimatePresence, m } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import {
  parseContact,
  PROJECT_TYPE_EVENT,
  projectTypes,
  type ContactErrors,
  type ProjectType,
} from "@/lib/contact";
import { easeOutExpo } from "@/lib/motion";
import { siteConfig } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "mailto" | "error";

type FieldProps = {
  name: "name" | "email" | "company" | "message";
  label: string;
  error?: string;
  type?: string;
  autoComplete?: string;
  multiline?: boolean;
  optional?: boolean;
};

// Same limits as parseContact, so the browser stops typing where validation would refuse.
const MIN_FILL_MS = 3000;

const MAX_LENGTH: Record<FieldProps["name"], number> = { name: 120, email: 200, company: 120, message: 5000 };

/** Fields in page order: after a failed submit, focus goes to the first one in error. */
const FIELD_ORDER: ReadonlyArray<FieldProps["name"]> = ["name", "email", "company", "message"];

/** Moves focus to the confirmation as soon as it appears, so it is read out. */
const focusOnMount = (el: HTMLElement | null) => el?.focus({ preventScroll: true });

function Field({ name, label, error, type = "text", autoComplete, multiline, optional }: FieldProps) {
  const id = `contact-${name}`;
  const errorId = `${id}-error`;
  const inputClass =
    "peer w-full resize-none border-0 border-b border-line bg-transparent pt-8 pb-3 text-lg text-cream outline-none transition-colors duration-500 placeholder:text-transparent focus:border-transparent focus-visible:outline-none aria-[invalid=true]:border-accent/60";

  return (
    <div className="relative">
      {multiline ? (
        <textarea
          id={id}
          name={name}
          rows={4}
          required={!optional}
          maxLength={MAX_LENGTH[name]}
          placeholder={label}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={inputClass}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          required={!optional}
          maxLength={MAX_LENGTH[name]}
          placeholder={label}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={inputClass}
        />
      )}
      {/* Label floats up when the field has focus or content. */}
      <label
        htmlFor={id}
        className="pointer-events-none absolute top-1 left-0 origin-left text-xs tracking-[0.14em] text-faint uppercase transition-all duration-500 ease-out-expo peer-placeholder-shown:top-8 peer-placeholder-shown:text-lg peer-placeholder-shown:tracking-normal peer-placeholder-shown:normal-case peer-focus:top-1 peer-focus:text-xs peer-focus:tracking-[0.14em] peer-focus:text-cream peer-focus:uppercase"
      >
        {label}
        {optional ? <span className="ml-2">(facultatif)</span> : null}
      </label>
      <span
        aria-hidden
        className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-700 ease-out-expo peer-focus:scale-x-100"
      />
      {error ? (
        <p id={errorId} className="mt-2 text-sm text-accent">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [projectType, setProjectType] = useState<ProjectType | "">("");
  // After a first failed submit, errors update as the visitor types.
  const [checked, setChecked] = useState(false);
  // E-mail fallback: the prepared message, ready to copy if no mail app opens.
  const [draft, setDraft] = useState("");
  const [copied, setCopied] = useState(false);
  // When the form became usable: a submission within seconds of it comes from a bot.
  const readyAt = useRef(0);
  useEffect(() => {
    readyAt.current = Date.now();
  }, []);

  // A service card preselects its project type before the page glides here.
  useEffect(() => {
    const onPick = (e: Event) => setProjectType((e as CustomEvent<ProjectType>).detail);
    window.addEventListener(PROJECT_TYPE_EVENT, onPick);
    return () => window.removeEventListener(PROJECT_TYPE_EVENT, onPick);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    const parsed = parseContact({ ...values, projectType });
    if (!parsed.ok) {
      setErrors(parsed.errors);
      setChecked(true);
      const first = FIELD_ORDER.find((name) => parsed.errors[name]);
      if (first) form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setErrors({});

    // Anti-spam: real visitors never see nor fill the honeypot field, and need more
    // than a few seconds to write a message. Bots get a silent fake success.
    if (values.website || Date.now() - readyAt.current < MIN_FILL_MS) {
      setStatus("sent");
      return;
    }

    const { name, email, company, message } = parsed.data;
    const subject = `Nouveau projet — ${name}${company ? ` (${company})` : ""}`;

    // A static site has no server: without a form service, hand over to the e-mail app.
    if (!siteConfig.contactEndpoint) {
      const body = [
        message,
        "",
        `${name} — ${email}`,
        ...(company ? [`Entreprise : ${company}`] : []),
        ...(parsed.data.projectType ? [`Type de projet : ${parsed.data.projectType}`] : []),
      ].join("\n");
      window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setDraft(`${subject}\n\n${body}`);
      setStatus("mailto");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(siteConfig.contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...parsed.data, _subject: subject, _replyto: email }),
        signal: AbortSignal.timeout(10000),
      });
      if (!res.ok) throw new Error(String(res.status));
      setChecked(false);
      form.reset();
      setProjectType("");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  function revalidate(form: HTMLFormElement) {
    if (!checked) return;
    const parsed = parseContact({ ...Object.fromEntries(new FormData(form)), projectType });
    setErrors(parsed.ok ? {} : parsed.errors);
  }

  async function copyDraft() {
    try {
      await navigator.clipboard.writeText(`${siteConfig.email}\n\n${draft}`);
      setCopied(true);
    } catch {
      // Clipboard refused: the address stays visible and selectable.
    }
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "sent" || status === "mailto" ? (
        <m.div
          key="sent"
          ref={focusOnMount}
          tabIndex={-1}
          role="status"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: easeOutExpo }}
          className="flex min-h-[28rem] flex-col justify-center border-t border-line pt-10"
        >
          {status === "sent" ? (
            <>
              <p className="font-serif text-title font-light">
                Merci. <em className="text-accent">Votre message est bien arrivé.</em>
              </p>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
                Nous revenons vers vous sous 24 heures ouvrées pour échanger sur votre projet.
              </p>
            </>
          ) : (
            <>
              <p className="font-serif text-title font-light">
                Merci. <em className="text-accent">Votre messagerie s&apos;ouvre.</em>
              </p>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
                Votre message est prêt à partir vers {siteConfig.email} : il ne reste qu&apos;à
                l&apos;envoyer. Nous revenons vers vous sous 24 heures ouvrées.
              </p>
              <p className="mt-8 max-w-md text-sm leading-relaxed text-faint">
                Rien ne s&apos;est ouvert ? Copiez votre message et collez-le dans votre
                messagerie habituelle.
              </p>
              <Button variant="outline" size="sm" className="mt-5 self-start" onClick={copyDraft}>
                <span aria-live="polite">{copied ? "Message copié" : "Copier le message"}</span>
              </Button>
            </>
          )}
        </m.div>
      ) : (
        <m.form
          key="form"
          noValidate
          onSubmit={handleSubmit}
          onChange={(e) => revalidate(e.currentTarget)}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.5, ease: easeOutExpo }}
          className="flex flex-col gap-8"
        >
          <div className="grid gap-8 md:grid-cols-2 md:gap-10">
            <Field name="name" label="Votre nom" autoComplete="name" error={errors.name} />
            <Field
              name="email"
              type="email"
              label="Votre e-mail"
              autoComplete="email"
              error={errors.email}
            />
          </div>
          <Field
            name="company"
            label="Entreprise"
            autoComplete="organization"
            optional
            error={errors.company}
          />

          <fieldset className="pt-4">
            <legend className="text-xs tracking-[0.14em] text-faint uppercase">
              Type de projet
            </legend>
            <div className="mt-5 flex flex-wrap gap-2">
              {projectTypes.map((type) => {
                const active = projectType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setProjectType(active ? "" : type)}
                    className={`rounded-full border px-4 py-2 text-sm transition-[color,background-color,border-color,scale] duration-500 active:scale-95 active:duration-150 ${
                      active
                        ? "border-cream bg-cream text-ink"
                        : "border-line text-muted hover:border-line-strong hover:text-cream"
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <Field name="message" label="Parlez-nous de votre projet" multiline error={errors.message} />

          {/* Honeypot field, hidden from people and assistive technology. */}
          <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label htmlFor="contact-website">Site web</label>
            <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="flex flex-col gap-6 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xs text-xs leading-relaxed text-faint">
              Vos données servent uniquement à répondre à votre demande : elles ne sont ni vendues
              ni cédées.{" "}
              <Link
                href="/politique-de-confidentialite/"
                className="text-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-cream hover:decoration-accent"
              >
                En savoir plus
              </Link>
            </p>
            <Magnetic>
              <Button type="submit" arrow disabled={status === "sending"}>
                {status === "sending" ? "Envoi en cours…" : "Envoyer le message"}
              </Button>
            </Magnetic>
          </div>

          {status === "error" ? (
            <p role="alert" className="text-sm text-accent">
              L&apos;envoi n&apos;a pas abouti. Écrivez-nous directement à{" "}
              <a href={`mailto:${siteConfig.email}`} className="underline underline-offset-4">
                {siteConfig.email}
              </a>
              .
            </p>
          ) : null}
        </m.form>
      )}
    </AnimatePresence>
  );
}
