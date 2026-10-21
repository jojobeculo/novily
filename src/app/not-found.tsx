import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-svh flex-col justify-center py-40">
      <p className="text-eyebrow uppercase text-faint">Erreur 404</p>
      <h1 className="mt-8 max-w-[14ch] font-serif text-display font-light">
        Cette page s&apos;est <em className="text-accent">égarée.</em>
      </h1>
      <Button href="/" variant="outline" arrow className="mt-14 self-start">
        Retour à l&apos;accueil
      </Button>
    </section>
  );
}
