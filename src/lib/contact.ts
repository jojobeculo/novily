export const projectTypes = [
  "Site web",
  "Accessibilité et conformité",
  "Transition IA",
  "Marketing et motion design",
  "Logiciel sur mesure",
  "Autre",
] as const;
export type ProjectType = (typeof projectTypes)[number];

/** Window event that preselects a project type in the contact form. */
export const PROJECT_TYPE_EVENT = "noveo:project-type";

const PROJECT_TYPE_KEY = "noveo-project-type";

/**
 * Preselects a project type in the contact form: right away when the form is
 * on the page, or when it appears after navigating to the home page.
 */
export function requestProjectType(type: ProjectType) {
  try {
    sessionStorage.setItem(PROJECT_TYPE_KEY, type);
  } catch {
    // Storage blocked: only the same-page event works.
  }
  window.dispatchEvent(new CustomEvent(PROJECT_TYPE_EVENT, { detail: type }));
}

/** The type requested from another page, if any. Read once. */
export function takeRequestedProjectType(): ProjectType | null {
  try {
    const value = sessionStorage.getItem(PROJECT_TYPE_KEY);
    sessionStorage.removeItem(PROJECT_TYPE_KEY);
    return projectTypes.find((t) => t === value) ?? null;
  } catch {
    return null;
  }
}

export type ContactRequest = {
  name: string;
  email: string;
  company: string;
  projectType: ProjectType | "";
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactRequest, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const text = (value: unknown) => (typeof value === "string" ? value.trim() : "");

/**
 * Parses untrusted input into a ContactRequest.
 * The form calls it before it sends anything.
 */
export function parseContact(input: Record<string, unknown>):
  | { ok: true; data: ContactRequest }
  | { ok: false; errors: ContactErrors } {
  const data = {
    name: text(input.name),
    email: text(input.email),
    company: text(input.company),
    projectType: text(input.projectType),
    message: text(input.message),
  };
  const errors: ContactErrors = {};

  if (data.name.length < 2 || data.name.length > 120) errors.name = "Indiquez votre nom.";
  if (!EMAIL.test(data.email) || data.email.length > 200)
    errors.email = "Indiquez une adresse e-mail valide.";
  if (data.company.length > 120) errors.company = "120 caractères maximum.";
  if (data.projectType !== "" && !projectTypes.includes(data.projectType as never))
    errors.projectType = "Type de projet inconnu.";
  if (data.message.length < 10) errors.message = "Décrivez votre projet en quelques mots.";
  if (data.message.length > 5000) errors.message = "5 000 caractères maximum.";

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, data: data as ContactRequest };
}
