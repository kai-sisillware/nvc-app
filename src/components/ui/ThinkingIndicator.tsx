interface ThinkingIndicatorProps {
  label?: string;
}

export function ThinkingIndicator({ label = "ことばを整えています" }: ThinkingIndicatorProps) {
  return (
    <div className="flex items-center gap-3 py-2 text-ink-soft" role="status" aria-live="polite">
      <span className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-moss-400 animate-breathe"
            style={{ animationDelay: `${i * 0.25}s` }}
          />
        ))}
      </span>
      <span className="text-[14px]">{label}</span>
    </div>
  );
}
