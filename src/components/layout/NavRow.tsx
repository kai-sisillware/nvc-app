import type { ReactNode } from "react";

interface NavRowProps {
  onBack?: () => void;
  backLabel?: string;
  children: ReactNode;
}

export function NavRow({ onBack, backLabel = "もどる", children }: NavRowProps) {
  return (
    <div className="mt-10 flex items-center justify-between gap-4">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="text-[14px] text-ink-faint hover:text-ink-soft transition-colors"
        >
          ← {backLabel}
        </button>
      ) : (
        <span />
      )}
      <div className="flex-1 flex justify-end">{children}</div>
    </div>
  );
}
