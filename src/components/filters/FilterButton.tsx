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
        "border-xs hover:outline-green/50 focus-visible:outline-green/50 cursor-pointer rounded-lg border-black/10 bg-white px-3 py-2 text-xs leading-none outline-2 -outline-offset-2 outline-transparent duration-120 select-none",
        isActive &&
          "bg-green text-white hover:opacity-70 hover:outline-transparent focus-visible:opacity-70 focus-visible:outline-transparent",
        className,
      )}
    >
      {option.label}
    </button>
  );
}
