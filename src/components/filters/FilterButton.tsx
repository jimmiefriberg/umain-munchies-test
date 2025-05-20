import { cn } from "@/lib/utils";

export interface FilterButtonProps {
  isActive?: boolean;
  onClick: () => void;
  option: { label: string; value: string };
  className?: string;
}

export default function FilterButton({
  onClick,
  option,
  isActive,
  className,
}: FilterButtonProps) {
  return (
    <button
      key={option.value}
      onClick={onClick}
      type="button"
      className={cn(
        "border-xs rounded-lg border-black/10 px-3 py-2 text-xs leading-none",
        isActive && "bg-green text-white",
        className,
      )}
    >
      {option.label}
    </button>
  );
}
