"use client";

interface ToggleProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function Toggle({ label, checked, onChange }: ToggleProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 cursor-pointer"
        style={{
          backgroundColor: checked
            ? "var(--color-primary)"
            : "var(--color-border)",
        }}
      >
        <span
          className="inline-block h-4 w-4 rounded-full bg-white transition-transform duration-200 shadow-sm"
          style={{
            transform: checked ? "translateX(24px)" : "translateX(4px)",
          }}
        />
      </button>
      {label && (
        <span
          className="text-sm font-medium"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {label}
        </span>
      )}
    </label>
  );
}
