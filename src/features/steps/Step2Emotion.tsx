import { useEffect, useState } from "react";
import { useJourney } from "../../state/JourneyContext";
import { aiService } from "../../services";
import {
  UNCOMFORTABLE_CATEGORIES,
  COMFORTABLE_CATEGORIES,
} from "../../data/emotions";
import type { EmotionOption } from "../../types";
import { ScreenContainer, StepHeader, NavRow } from "../../components/layout";
import { Button, Card, ProgressBar, SelectableChip, ThinkingIndicator } from "../../components/ui";

// ---- カテゴリ単位のアコーディオン ----
interface CategoryGroupProps {
  categoryName: string;
  emotions: EmotionOption[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  defaultOpen?: boolean;
}

function CategoryGroup({
  categoryName,
  emotions,
  selectedIds,
  onToggle,
  defaultOpen = false,
}: CategoryGroupProps) {
  const [open, setOpen] = useState(defaultOpen);
  const selectedCount = emotions.filter((e) => selectedIds.includes(e.id)).length;

  return (
    <div className="border border-line rounded-2xl overflow-hidden bg-paper-soft">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`w-full flex items-center justify-between px-4 py-3.5 transition-colors
          ${open ? "bg-moss-50" : "hover:bg-paper"}`}
      >
        <span className="flex items-center gap-2.5">
          <span className="text-[15px] font-medium text-ink">{categoryName}</span>
          {selectedCount > 0 && (
            <span className="rounded-full bg-moss-500 text-paper-soft text-[11px] px-2 py-0.5 leading-none">
              {selectedCount}
            </span>
          )}
        </span>
        <span
          className={`text-ink-faint text-[11px] transition-transform duration-200 ${open ? "rotate-90" : ""}`}
        >
          ▶
        </span>
      </button>

      {open && (
        <div className="px-4 pb-4 pt-2 flex flex-wrap gap-2 border-t border-line animate-fade-in">
          {emotions.map((emotion) => (
            <SelectableChip
              key={emotion.id}
              label={emotion.label}
              selected={selectedIds.includes(emotion.id)}
              onToggle={() => onToggle(emotion.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ---- Step2本体 ----
export function Step2Emotion() {
  const { state, dispatch } = useJourney();
  const { suggestions, matchedTone, selectedIds, status } = state.emotion;
  const [showComfortable, setShowComfortable] = useState(false);
  const [customDraft, setCustomDraft] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  useEffect(() => {
    if (status !== "idle") return;
    let cancelled = false;

    (async () => {
      dispatch({ type: "SET_EMOTION_STATUS", status: "loading" });
      const result = await aiService.suggestEmotions(state.observation.finalText);
      if (cancelled) return;
      dispatch({
        type: "SET_EMOTION_SUGGESTIONS",
        value: result.suggestions,
        matchedTone: result.matchedTone,
      });
      dispatch({ type: "SET_EMOTION_STATUS", status: "done" });
    })();

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddCustom = () => {
    if (!customDraft.trim()) return;
    dispatch({ type: "ADD_CUSTOM_EMOTION", label: customDraft.trim() });
    setCustomDraft("");
    setShowCustomInput(false);
  };

  // カテゴリ別にグループ化
  const byCategory = (cat: string) =>
    suggestions.filter((e) => e.category === cat);

  // 観察文のキーワードから事前展開するカテゴリを推定
  const text = state.observation.finalText;
  const preOpenCategories = new Set<string>();
  if (/(怒|腹|むか|イライラ|むしゃくしゃ)/.test(text)) preOpenCategories.add("怒り");
  if (/(悲|泣|つら|苦|傷)/.test(text)) preOpenCategories.add("悲しみ");
  if (/(不安|心配|怖|恐)/.test(text)) preOpenCategories.add("不安");
  if (/(疲れ|だるい|しんど|うんざり)/.test(text)) preOpenCategories.add("疲労");
  if (/(寂|孤独|一人|無視|既読)/.test(text)) preOpenCategories.add("寂しさ");
  if (/(恥|情けない|みじめ|小さく)/.test(text)) preOpenCategories.add("恥");
  if (/(モヤ|もどか|じれ|窮屈)/.test(text)) preOpenCategories.add("モヤモヤ");
  // デフォルトで何も引っかからなければ、悲しみ・モヤモヤを開く
  if (preOpenCategories.size === 0) {
    preOpenCategories.add("悲しみ");
    preOpenCategories.add("モヤモヤ");
  }

  const primaryCategories = matchedTone === "comfortable"
    ? COMFORTABLE_CATEGORIES
    : UNCOMFORTABLE_CATEGORIES;
  const secondaryCategories = matchedTone === "comfortable"
    ? UNCOMFORTABLE_CATEGORIES
    : COMFORTABLE_CATEGORIES;
  const secondaryLabel = matchedTone === "comfortable"
    ? "不快の気持ちも見てみる"
    : "快の気持ちも見てみる";

  return (
    <ScreenContainer>
      <ProgressBar current={2} />
      <StepHeader
        eyebrow="Step 2 ・ 感じる"
        title="どんな気持ちになりましたか？"
        description={
          <>
            「悲しい」「イライラする」「疲れた」のような、
            自分の中で起きていることを選んでみましょう。
            <br />
            いくつ選んでも、選ばなくても大丈夫です。
          </>
        }
      />

      {status === "loading" && (
        <Card>
          <ThinkingIndicator label="気持ちの候補をさがしています" />
        </Card>
      )}

      {status === "done" && (
        <div className="space-y-2 animate-fade-in">
          {primaryCategories.map((cat) => {
            const emotions = byCategory(cat);
            if (emotions.length === 0) return null;
            return (
              <CategoryGroup
                key={cat}
                categoryName={cat}
                emotions={emotions}
                selectedIds={selectedIds}
                onToggle={(id) => dispatch({ type: "TOGGLE_EMOTION", id })}
                defaultOpen={preOpenCategories.has(cat)}
              />
            );
          })}

          {/* カスタム入力 */}
          <div className="px-1 pt-1">
            {showCustomInput ? (
              <div className="flex items-center gap-2">
                <input
                  autoFocus
                  value={customDraft}
                  onChange={(e) => setCustomDraft(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddCustom()}
                  placeholder="ことばを入力"
                  className="rounded-full border border-line bg-paper-soft px-4 py-2.5 text-[14px]
                    focus:border-moss-300 focus:outline-none focus:ring-2 focus:ring-moss-100 w-36"
                />
                <button
                  type="button"
                  onClick={handleAddCustom}
                  className="text-[13px] text-moss-600 hover:underline"
                >
                  追加
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowCustomInput(true)}
                className="rounded-full border border-dashed border-line px-4 py-2.5
                  text-[14px] text-ink-faint hover:text-ink-soft hover:border-ink-faint transition-colors"
              >
                ＋ ことばを追加する
              </button>
            )}
          </div>

          {/* もう一方のトーンのカテゴリ */}
          <div className="pt-2">
            {!showComfortable ? (
              <button
                type="button"
                onClick={() => setShowComfortable(true)}
                className="text-[13px] text-ink-faint hover:text-moss-600 transition-colors
                  underline-offset-4 hover:underline"
              >
                {secondaryLabel}
              </button>
            ) : (
              <div className="space-y-2 animate-fade-in">
                <p className="text-[12.5px] text-ink-faint px-1">こちらの気持ちかもしれません</p>
                {secondaryCategories.map((cat) => {
                  const emotions = byCategory(cat);
                  if (emotions.length === 0) return null;
                  return (
                    <CategoryGroup
                      key={cat}
                      categoryName={cat}
                      emotions={emotions}
                      selectedIds={selectedIds}
                      onToggle={(id) => dispatch({ type: "TOGGLE_EMOTION", id })}
                      defaultOpen={false}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      <NavRow onBack={() => dispatch({ type: "GO_TO_STEP", step: 1 })}>
        <Button onClick={() => dispatch({ type: "GO_TO_STEP", step: 3 })}>
          次へ
        </Button>
      </NavRow>
    </ScreenContainer>
  );
}
