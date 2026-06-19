import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Card({ className = "", children, ...rest }: CardProps) {
  return (
    <div
      className={`rounded-xl2 bg-paper-soft border border-line shadow-soft p-6 sm:p-8 ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
