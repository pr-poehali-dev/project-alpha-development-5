import Icon from "@/components/ui/icon";

interface ScrollToTopProps {
  className?: string;
  dark?: boolean;
}

export default function ScrollToTop({ className = "", dark = false }: ScrollToTopProps) {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Наверх"
      className={`flex items-center gap-2 uppercase text-xs tracking-widest transition-opacity duration-300 hover:opacity-60 ${dark ? "text-neutral-400 hover:text-white" : "text-neutral-400 hover:text-neutral-900"} ${className}`}
    >
      <Icon name="ArrowUp" size={14} />
      Наверх
    </button>
  );
}
