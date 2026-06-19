import type { ReactNode } from "react";

interface StepHeaderProps {
  eyebrow: string;
  title: string;
  description?: ReactNode;
}

export function StepHeader({ eyebrow, title, description }: StepHeaderProps) {
  return (
    <header className="mb-8 space-y-3">
      <p className="text-[13px] tracking-[0.2em] text-moss-500 uppercase">{eyebrow}</p>
      <h1 className="text-[22px] sm:text-[26px] leading-snug text-ink font-medium">{title}</h1>
      {description && (
        <p className="text-[14.5px] leading-[1.9] text-ink-soft">{description}</p>
      )}
    </header>
  );
}
