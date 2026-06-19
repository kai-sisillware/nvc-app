import type { ReactNode } from "react";

interface ScreenContainerProps {
  children: ReactNode;
}

export function ScreenContainer({ children }: ScreenContainerProps) {
  return (
    <div className="min-h-[100dvh] w-full bg-paper flex flex-col items-center px-5 py-8 sm:py-14">
      <div className="w-full max-w-xl animate-fade-up">{children}</div>
    </div>
  );
}
