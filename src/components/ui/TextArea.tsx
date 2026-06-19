import { useEffect, useRef, type TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
}

export function TextArea({ value, className = "", ...rest }: TextAreaProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  return (
    <textarea
      ref={ref}
      value={value}
      rows={4}
      className={`w-full resize-none rounded-2xl border border-line bg-paper-soft px-5 py-4
        text-[16px] leading-relaxed text-ink placeholder:text-ink-faint
        focus:border-moss-300 focus:outline-none focus:ring-2 focus:ring-moss-100
        transition-colors duration-200 ${className}`}
      {...rest}
    />
  );
}
