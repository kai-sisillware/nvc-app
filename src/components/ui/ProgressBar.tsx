interface ProgressBarProps {
  /** 1〜6（Step7は任意なのでメインの進捗には含めない） */
  current: number;
  total?: number;
}

export function ProgressBar({ current, total = 5 }: ProgressBarProps) {
  const percent = Math.min(100, Math.round((current / total) * 100));

  return (
    <div className="w-full" aria-hidden="true">
      <div className="h-1 w-full rounded-full bg-line overflow-hidden">
        <div
          className="h-full rounded-full bg-moss-400 transition-[width] duration-700 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
