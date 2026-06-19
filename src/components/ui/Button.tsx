import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-moss-500 text-paper-soft hover:bg-moss-600 active:bg-moss-700 disabled:bg-moss-200 disabled:text-moss-50",
  secondary:
    "bg-transparent text-moss-600 border border-moss-300 hover:bg-moss-50 disabled:text-ink-faint disabled:border-line",
  ghost: "bg-transparent text-ink-soft hover:text-ink underline-offset-4 hover:underline",
};

export function Button({ variant = "primary", className = "", children, ...rest }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5
        text-[15px] font-medium tracking-wide transition-colors duration-200
        disabled:cursor-not-allowed
        ${variantStyles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
