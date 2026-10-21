"use client";

import type { ReactNode } from "react";
import { requestProjectType, type ProjectType } from "@/lib/contact";
import { Button } from "./button";

type ContactButtonProps = {
  projectType: ProjectType;
  children: ReactNode;
  variant?: "primary" | "light" | "outline";
  className?: string;
};

/** "Parlons de votre projet": leads to the contact form with the project type preselected. */
export function ContactButton({ projectType, children, variant, className }: ContactButtonProps) {
  return (
    <Button
      href="/#contact"
      variant={variant}
      arrow
      className={className}
      onClick={() => requestProjectType(projectType)}
    >
      {children}
    </Button>
  );
}
