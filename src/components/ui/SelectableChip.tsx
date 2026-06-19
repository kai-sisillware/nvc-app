interface SelectableChipProps {
  label: string;
  selected: boolean;
  onToggle: () => void;
}

export function SelectableChip({ label, selected, onToggle }: SelectableChipProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      className={`rounded-full border px-4 py-2.5 text-[14px] transition-all duration-200
        ${
          selected
            ? "bg-moss-500 border-moss-500 text-paper-soft shadow-soft"
            : "bg-paper-soft border-line text-ink-soft hover:border-moss-300 hover:text-ink"
        }`}
    >
      {label}
    </button>
  );
}
