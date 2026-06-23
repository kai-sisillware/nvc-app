import { useState } from "react";
import { useJourney } from "../../state/JourneyContext";

/** 表示するキャッチフレーズの候補（マウント時にランダムに1つ選ぶ） */
const CATCHPHRASES = [
  "なんかモヤモヤしている。",
  "心のどこかが、ざわついている。",
  "少し、自分の気持ちを整理したい。",
  "自分のことを、もう少し知りたい。",
  "あのことが、まだ引っかかっている。",
  "うまく言葉にできないけど、なんかある。",
  "何かを感じているけど、名前がわからない。",
];

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
  // マウント時にランダムで1つ選ぶ。セッション中は変わらない。
  const [phrase] = useState(
    () => CATCHPHRASES[Math.floor(Math.random() * CATCHPHRASES.length)]
  );

  return (
    <div className="min-h-[100dvh] w-full bg-paper flex flex-col items-center justify-center px-5 py-12">
      <div className="w-full max-w-xl animate-fade-up flex flex-col gap-10">

        {/* ロゴ・タイトル */}
        <header className="space-y-6">
          {/* 海藻ロゴ（SVGインライン） */}
          <svg
            viewBox="0 0 300 64"
            width="260"
            role="img"
            aria-label="SelfEmpathy"
            xmlns="http://www.w3.org/2000/svg"
            style={{ fontFamily: "'Zen Old Mincho', serif" }}
          >
            <title>SelfEmpathy</title>

            {/* 海藻1：左の茎（S字） */}
            <path fill="none" stroke="#5B7065" strokeWidth="2.2" strokeLinecap="round"
              d="M 18 60 C 14 50, 26 42, 18 30 C 10 18, 24 10, 18 2"/>
            {/* 葉 */}
            <path fill="none" stroke="#5B7065" strokeWidth="1.6" strokeLinecap="round"
              d="M 18 38 C 30 32, 36 24, 30 16"/>
            <path fill="none" stroke="#5B7065" strokeWidth="1.6" strokeLinecap="round"
              d="M 16 22 C 4 16, 0 8, 6 2"/>
            <path fill="none" stroke="#5B7065" strokeWidth="1.2" strokeLinecap="round"
              d="M 18 50 C 8 46, 4 40, 8 34"/>

            {/* 海藻2：逆S字 */}
            <path fill="none" stroke="#5B7065" strokeWidth="1.6" strokeLinecap="round"
              d="M 34 60 C 40 48, 28 38, 36 26 C 44 14, 34 6, 40 0"/>
            <path fill="none" stroke="#5B7065" strokeWidth="1.4" strokeLinecap="round"
              d="M 36 44 C 26 40, 20 34, 24 28"/>
            <path fill="none" stroke="#5B7065" strokeWidth="1.2" strokeLinecap="round"
              d="M 36 28 C 48 22, 52 14, 46 8"/>

            {/* 海藻3：細い茎 */}
            <path fill="none" stroke="#5B7065" strokeWidth="1.2" strokeLinecap="round"
              d="M 50 60 C 48 50, 56 42, 50 30 C 46 20, 52 12, 50 4"/>
            <path fill="none" stroke="#5B7065" strokeWidth="1.0" strokeLinecap="round"
              d="M 50 36 C 60 30, 64 22, 58 16"/>

            {/* 気泡 */}
            <circle fill="none" stroke="#5B7065" strokeWidth="1.2" cx="68" cy="50" r="3.5"/>
            <circle fill="none" stroke="#5B7065" strokeWidth="1.0" cx="76" cy="38" r="2.5"/>
            <circle fill="none" stroke="#5B7065" strokeWidth="1.2" cx="72" cy="24" r="3"/>
            <circle fill="none" stroke="#5B7065" strokeWidth="0.9" cx="80" cy="14" r="2"/>
            <circle fill="none" stroke="#5B7065" strokeWidth="1.0" cx="66" cy="10" r="2.5"/>
            <circle fill="none" stroke="#5B7065" strokeWidth="0.8" cx="78" cy="4"  r="1.5"/>
            <circle fill="none" stroke="#5B7065" strokeWidth="0.8" cx="64" cy="30" r="1.2"/>

            {/* テキスト */}
            <text
              x="90" y="42"
              fontSize="28"
              fontWeight="400"
              fill="#2E2B27"
              letterSpacing="2"
              fontFamily="'Zen Old Mincho', serif"
            >
              SelfEmpathy
            </text>
          </svg>

          <div className="space-y-3">
            <p className="text-[26px] sm:text-[28px] font-display leading-snug text-ink">
              {phrase}
            </p>
            <p className="text-[15px] leading-relaxed text-ink-soft">
              どうすればいいか、その前に。
            </p>
            <p className="text-[14px] leading-[1.85] text-ink-faint">
              まず自分の気持ちを整理するところから始めてみましょう。
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

        {/* ツールの目的の一言 */}
        <p className="text-[13px] text-ink-faint leading-[1.85] -mt-4">
          このノートは「答えを出す」ためではなく、
          自分が何を感じていたかに気づくためのものです。
        </p>

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
          <span className="inline-flex items-center gap-1.5">
            <span>by</span>
            <img
              src="/sisillware-logo.png"
              alt="Sisillware"
              style={{ height: "13px", mixBlendMode: "multiply", opacity: 0.45 }}
            />
          </span>
        </p>

      </div>
    </div>
  );
}
