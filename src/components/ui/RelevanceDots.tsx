interface RelevanceDotsProps {
  /** 1〜5 */
  value: number;
}

/**
 * 「★」のような評価記号は、無意識に“採点されている”感覚を生みやすい。
 * このアプリは評価をしない方針のため、やわらかい円のグラデーションで
 * 「今回どれくらい関係していそうか」という度合いだけを静かに示す。
 */
export function RelevanceDots({ value }: RelevanceDotsProps) {
  return (
    <div className="flex items-center gap-1" aria-label={`関連度 ${value} / 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`h-1.5 w-1.5 rounded-full ${
            i < value ? "bg-moss-400" : "bg-line"
          }`}
        />
      ))}
    </div>
  );
}
