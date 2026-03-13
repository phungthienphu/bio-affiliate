interface FooterProps {
  displayName: string;
}

export default function Footer({ displayName }: FooterProps) {
  return (
    <footer className="text-center py-8 text-sm t-text-muted t-border-b border-t">
      <p>&copy; {new Date().getFullYear()} {displayName}</p>
    </footer>
  );
}
