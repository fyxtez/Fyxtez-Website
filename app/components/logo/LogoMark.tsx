type LogoMarkProps = {
  className?: string;
};

export default function LogoMark({ className = "" }: LogoMarkProps) {
  return (
    <span
      className={["brand-mark", className].filter(Boolean).join(" ")}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" focusable="false">
        <path d="M8.7 3.5h11l-.86 3.7h-6.9l-.67 2.94h6.05l-.84 3.66h-6.04l-1.5 6.7H4.7l4-17Z" />
      </svg>
    </span>
  );
}
