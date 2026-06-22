import { useEffect, useState } from "react";
import { useJourney } from "../../state/JourneyContext";
import { aiService } from "../../services";
import { findEmotionById } from "../../data/emotions";
import { NEED_CATEGORIES_ORDERED } from "../../data/needs";
import type { NeedOption } from "../../types";
import { ScreenContainer, NavRow } from "../../components/layout";
import { Button, ProgressBar, RelevanceDots, ThinkingIndicator } from "../../components/ui";

// ---- カテゴリ単位のアコーディオン ----
interface NeedCategoryGroupProps {
  categoryName: string;
  needs: NeedOption[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  defaultOpen?: boolean;
}

function NeedCategoryGroup({
  categoryName,
  needs,
  selectedIds,
  onToggle,
  defaultOpen = false,
}: NeedCategoryGroupProps) {
  const [open, setOpen] = useState(defaultOpen);
  const selectedCount = needs.filter((n) => selectedIds.includes(n.id)).length;

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
        <div className="divide-y divide-line border-t border-line animate-fade-in">
          {needs.map((need) => {
            const selected = selectedIds.includes(need.id);
            return (
              <button
                key={need.id}
                type="button"
                onClick={() => onToggle(need.id)}
                aria-pressed={selected}
                className={`w-full text-left px-4 py-3.5 transition-colors duration-150
                  ${selected ? "bg-moss-50" : "hover:bg-paper"}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className={`text-[14.5px] font-medium ${selected ? "text-moss-700" : "text-ink"}`}>
                    {need.label}
                  </span>
                  <RelevanceDots value={need.relevance} />
                </div>
                <p className="mt-0.5 text-[12.5px] text-ink-soft leading-relaxed">
                  {need.description}
                </p>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ---- Step3本体 ----
export function Step3Needs() {
  const { state, dispatch } = useJourney();
  const { suggestions, selectedIds, status } = state.need;

  const emotionLabels = state.emotion.selectedIds.map(
    (id) => findEmotionById(id)?.label ?? id.replace("custom-", "")
  );
  const emotionCategories = state.emotion.selectedIds
    .map((id) => findEmotionById(id)?.category ?? "")
    .filter(Boolean);

  useEffect(() => {
    if (status !== "idle") return;
    let cancelled = false;

    (async () => {
      dispatch({ type: "SET_NEED_STATUS", status: "loading" });
      const result = await aiService.suggestNeeds({
        observationText: state.observation.finalText,
        emotionLabels,
        needLabels: [],
      });
      if (cancelled) return;
      dispatch({ type: "SET_NEED_SUGGESTIONS", value: result });
      dispatch({ type: "SET_NEED_STATUS", status: "done" });
    })();

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 選択した感情のカテゴリから、事前展開するニーズカテゴリを推定
  const preOpenNeeds = new Set<string>();
  if (emotionCategories.some((c) => ["怒り", "反感"].includes(c))) {
    preOpenNeeds.add("理解"); preOpenNeeds.add("思いやり");
  }
  if (emotionCategories.some((c) => ["悲しみ", "寂しさ"].includes(c))) {
    preOpenNeeds.add("つながり"); preOpenNeeds.add("理解");
  }
  if (emotionCategories.some((c) => ["不安", "恐れ"].includes(c))) {
    preOpenNeeds.add("平和"); preOpenNeeds.add("休息");
  }
  if (emotionCategories.some((c) => ["疲労"].includes(c))) {
    preOpenNeeds.add("休息");
  }
  if (emotionCategories.some((c) => ["モヤモヤ", "揺れ動く"].includes(c))) {
    preOpenNeeds.add("理解"); preOpenNeeds.add("自主性");
  }
  if (emotionCategories.some((c) => ["恥", "妬み"].includes(c))) {
    preOpenNeeds.add("思いやり"); preOpenNeeds.add("意味");
  }
  // デフォルト
  if (preOpenNeeds.size === 0) {
    preOpenNeeds.add("つながり"); preOpenNeeds.add("理解");
  }

  const byCategory = (cat: string) =>
    suggestions.filter((n) => n.category === cat);

  return (
    <ScreenContainer>
      <ProgressBar current={3} />

      {/* Step3専用ヘッダー */}
      <header className="mb-8 space-y-5">
        <p className="text-[13px] tracking-[0.2em] text-moss-500 uppercase">Step 3 ・ 気づく</p>
        <h1 className="text-[22px] sm:text-[25px] font-display leading-snug text-ink">
          何を大切にしていましたか？
        </h1>

        {/* ニーズとは？の橋渡し */}
        <div className="rounded-2xl bg-moss-50 border border-moss-100 px-5 py-4 space-y-2">
          <p className="text-[14px] font-medium text-moss-700">
            感情の奥には、必ず「大切にしていること」があります。
          </p>
          <p className="text-[13.5px] leading-[1.85] text-ink-soft">
            怒りや悲しみは、あなたの中の大切なものが脅かされたサインです。
            その「大切なもの」のことを、NVCでは
            <strong className="text-ink font-medium">ニーズ</strong>と呼びます。
          </p>
          <p className="text-[13.5px] leading-[1.85] text-ink-soft">
            正解はありません。「なんとなくしっくりくる」ものを選んでみましょう。
          </p>
        </div>
      </header>

      {status === "loading" && (
        <div className="rounded-xl2 border border-line bg-paper-soft shadow-soft p-6">
          <ThinkingIndicator label="大切にしていることをさがしています" />
        </div>
      )}

      {status === "done" && (
        <div className="space-y-2 animate-fade-in">
          {NEED_CATEGORIES_ORDERED.map((cat) => {
            const needs = byCategory(cat);
            if (needs.length === 0) return null;
            return (
              <NeedCategoryGroup
                key={cat}
                categoryName={cat}
                needs={needs}
                selectedIds={selectedIds}
                onToggle={(id) => dispatch({ type: "TOGGLE_NEED", id })}
                defaultOpen={preOpenNeeds.has(cat)}
              />
            );
          })}
        </div>
      )}

      <NavRow onBack={() => dispatch({ type: "GO_TO_STEP", step: 2 })}>
        <Button
          onClick={() => dispatch({ type: "GO_TO_STEP", step: 4 })}
          disabled={selectedIds.length === 0}
        >
          次へ
        </Button>
      </NavRow>
    </ScreenContainer>
  );
}
