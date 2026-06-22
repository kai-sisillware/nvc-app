import { useState } from "react";
import { useJourney } from "../../state/JourneyContext";

const STEPS = [
  {
    number: "01",
    keyword: "見る",
    title: "何があったか",
    description: "起きたことを、解釈を交えずそのまま見る。",
  },
  {
    number: "02",
    keyword: "感じる",
    title: "どんな気持ちか",
    description: "イライラ、悲しさ、疲れ。良い悪いなしに受け止める。",
  },
  {
    number: "03",
    keyword: "気づく",
    title: "何を大切にしていたか",
    description: "その感情の奥にある、本当に大切なものを探す。",
  },
];

export function Step0Welcome() {
  const { dispatch } = useJourney();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-[100dvh] w-full bg-paper flex flex-col items-center justify-center px-5 py-12">
      <div className="w-full max-w-xl animate-fade-up flex flex-col gap-10">

        {/* ロゴ・タイトル */}
        <header className="space-y-6">
          <div className="flex items-center gap-2">
            {/* モスグリーンのハートアイコン */}
            <svg viewBox="0 0 28 28" className="w-7 h-7 flex-shrink-0" aria-hidden="true">
              <path
                d="M14 24 C6 17.5, 1.5 11, 1.5 6.5 C1.5 2.8, 4.8 0.5, 8.5 0.5 C11 0.5, 12.8 1.8, 14 4.2 C15.2 1.8, 17 0.5, 19.5 0.5 C23.2 0.5, 26.5 2.8, 26.5 6.5 C26.5 11, 22 17.5, 14 24 Z"
                fill="#5B7065"
              />
            </svg>
            <h1 className="text-[22px] font-display tracking-wide text-ink-soft">SelfEmpathy</h1>
          </div>

          <div className="space-y-2">
            <p className="text-[26px] sm:text-[28px] font-display leading-snug text-ink">
              なんかモヤモヤしている。
            </p>
            <p className="text-[16px] leading-relaxed text-ink-soft">
              そんな気持ちが、すこし楽になるかもしれません。
            </p>
          </div>
        </header>

        {/* 3ステップの概要カード */}
        <div className="rounded-xl2 border border-line bg-paper-soft shadow-soft overflow-hidden">
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className={`flex items-center gap-5 px-5 py-6 ${i !== STEPS.length - 1 ? "border-b border-line" : ""}`}
            >
              {/* 番号 */}
              <span className="text-[12px] font-display text-moss-300 tabular-nums flex-shrink-0 w-4">
                {step.number}
              </span>

              {/* キーワード（大きく・目立つ・折り返しなし） */}
              <span className="text-[22px] font-display text-moss-500 flex-shrink-0 whitespace-nowrap w-14 mr-1">
                {step.keyword}
              </span>

              {/* タイトル＋説明 */}
              <div className="min-w-0 space-y-1">
                <p className="text-[13.5px] font-medium text-ink leading-snug">{step.title}</p>
                <p className="text-[12.5px] text-ink-faint leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* セルフエンパシーとは（アコーディオン） */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-1.5 text-[13px] text-ink-faint hover:text-ink-soft transition-colors"
            aria-expanded={open}
          >
            <span
              className={`text-[10px] transition-transform duration-300 ${open ? "rotate-90" : ""}`}
            >
              ▶
            </span>
            セルフエンパシー（自己共感）とは
          </button>

          {open && (
            <div className="rounded-2xl border border-line bg-paper-soft px-5 py-4 space-y-3 animate-fade-in">
              <p className="text-[13.5px] leading-[1.9] text-ink-soft">
                自分自身の感情やニーズ（大切にしたいこと）に寄り添い、
                思いやりをもって自分の内面を理解する心理的アプローチです。
              </p>
              <p className="text-[13.5px] leading-[1.9] text-ink-soft">
                このノートは、マーシャル・B・ローゼンバーグ博士が提唱した
                <strong className="text-ink font-medium">
                  NVC（Nonviolent Communication / 非暴力コミュニケーション）
                </strong>
                の考え方をベースにしています。
              </p>
              <p className="text-[13.5px] leading-[1.9] text-ink-soft">
                答えを出すのではなく、自分でも気づいていなかった気持ちに
                気づくことを目的にしています。
              </p>
            </div>
          )}
        </div>

        {/* 注意書き */}
        <p className="text-[12.5px] text-ink-faint text-center leading-relaxed -mt-4">
          入力した内容は外部に送信されることがあります。
          <br />
          個人が特定できる情報の入力はお控えください。
        </p>

        {/* はじめるボタン */}
        <button
          type="button"
          onClick={() => dispatch({ type: "GO_TO_STEP", step: 1 })}
          className="w-full rounded-full bg-moss-500 text-paper-soft py-4 text-[16px] font-medium
            tracking-wide hover:bg-moss-600 active:bg-moss-700 transition-colors duration-200
            shadow-soft"
        >
          はじめる
        </button>

        <p className="text-[11.5px] text-ink-faint text-center -mt-6">
          by SISILLWARE
        </p>

      </div>
    </div>
  );
}
