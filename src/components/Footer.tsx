interface FooterProps {
  displayName: string;
}

export default function Footer({ displayName }: FooterProps) {
  return (
    <footer className="pt-8 pb-10 text-center">
      <div
        className="inline-flex items-center gap-1.5 text-xs px-4 py-2 rounded-full"
        style={{
          color: "var(--color-text-muted)",
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
        }}
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
        <span>{displayName}</span>
        <span className="opacity-40">&middot;</span>
        <span>{new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
