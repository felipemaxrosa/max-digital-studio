"use client";

/**
 * Dropdown custom (combobox + listbox) no tema escuro — substitui o <select>
 * nativo. Acessível: roving com ArrowUp/Down/Home/End, Enter/Espaço seleciona,
 * Escape fecha, Tab fecha, typeahead por letra, clique-fora fecha, ARIA completa.
 */
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import type { Option } from "@/lib/briefing/types";

function buttonCls(error?: string, open?: boolean) {
  const border = error
    ? "border-[#FB7185]"
    : open
      ? "border-[var(--color-accent)]"
      : "border-[var(--color-border-glass)]";
  return `flex w-full items-center justify-between gap-2 rounded-xl border bg-[var(--color-slate)] px-4 py-3 text-left text-sm text-[var(--color-ink)] transition-colors focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-cyan)] focus-visible:outline-offset-2 ${border}`;
}

export function SelectField({
  id,
  value,
  options,
  placeholder = "Selecione…",
  error,
  describedBy,
  onChange,
}: {
  id: string;
  value: string;
  options: readonly Option[];
  placeholder?: string;
  error?: string;
  describedBy?: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const typeahead = useRef("");
  const typeaheadTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const listboxId = useId();

  const selectedIndex = options.findIndex((o) => o.value === value);
  const selectedLabel = selectedIndex >= 0 ? options[selectedIndex].label : "";

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  useEffect(() => {
    if (open) listRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (open && active >= 0) {
      const el = listRef.current?.children[active] as HTMLElement | undefined;
      el?.scrollIntoView?.({ block: "nearest" });
    }
  }, [open, active]);

  function openMenu() {
    setActive(selectedIndex >= 0 ? selectedIndex : 0);
    setOpen(true);
  }
  function close(focusButton = true) {
    setOpen(false);
    if (focusButton) btnRef.current?.focus();
  }
  function choose(i: number) {
    onChange(options[i].value);
    close();
  }

  function onButtonKeyDown(e: React.KeyboardEvent) {
    if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
      e.preventDefault();
      openMenu();
    }
  }

  function onListKeyDown(e: React.KeyboardEvent) {
    switch (e.key) {
      case "Escape":
        e.preventDefault();
        close();
        break;
      case "Tab":
        close(false);
        break;
      case "ArrowDown":
        e.preventDefault();
        setActive((a) => Math.min(options.length - 1, a + 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActive((a) => Math.max(0, a - 1));
        break;
      case "Home":
        e.preventDefault();
        setActive(0);
        break;
      case "End":
        e.preventDefault();
        setActive(options.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (active >= 0) choose(active);
        break;
      default:
        if (e.key.length === 1 && /\S/.test(e.key)) {
          typeahead.current += e.key;
          if (typeaheadTimer.current) clearTimeout(typeaheadTimer.current);
          typeaheadTimer.current = setTimeout(() => {
            typeahead.current = "";
          }, 700);
          const q = typeahead.current.toLowerCase();
          const idx = options.findIndex((o) => o.label.toLowerCase().startsWith(q));
          if (idx >= 0) setActive(idx);
        }
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={btnRef}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={buttonCls(error, open)}
        onClick={() => (open ? close() : openMenu())}
        onKeyDown={onButtonKeyDown}
      >
        <span className={selectedLabel ? "" : "text-[var(--color-muted)]/50"}>
          {selectedLabel || placeholder}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-[var(--color-muted)] transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      {open && (
        <ul
          ref={listRef}
          id={listboxId}
          role="listbox"
          tabIndex={-1}
          aria-activedescendant={active >= 0 ? `${listboxId}-opt-${active}` : undefined}
          onKeyDown={onListKeyDown}
          className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-xl border border-[var(--color-border-glass)] bg-[var(--color-slate-2)] p-1 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.65)] focus:outline-none"
        >
          {options.map((o, i) => {
            const selected = o.value === value;
            const isActive = i === active;
            return (
              <li
                key={o.value}
                id={`${listboxId}-opt-${i}`}
                role="option"
                aria-selected={selected}
                onMouseEnter={() => setActive(i)}
                onClick={() => choose(i)}
                className={`flex cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "bg-[color:color-mix(in_srgb,var(--color-accent)_22%,transparent)] text-[var(--color-ink)]"
                    : "text-[var(--color-muted)]"
                }`}
              >
                <span className={selected ? "font-medium text-[var(--color-ink)]" : ""}>{o.label}</span>
                {selected && <Check className="h-4 w-4 shrink-0 text-[var(--color-accent-alt)]" aria-hidden />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
