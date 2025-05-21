import { FilterKeys, toggleFilter, useFilterStore } from "@/lib/filter-store";
import { cn } from "@/lib/utils";

import { FilterButtonProps } from "./FilterButton";

export default function FilterGroup({
  filterKey,
  title,
  options,
  direction = "row",
  ButtonComponent,
  className,
}: {
  filterKey: FilterKeys;
  title: string;
  direction?: "row" | "column";
  options: {
    label: string;
    value: string;
  }[];
  ButtonComponent: React.FC<FilterButtonProps>;
  className?: string;
}) {
  const selectedFilters = useFilterStore((state) => state[filterKey]);

  function handleFilterClick(value: string) {
    toggleFilter(filterKey, value);
  }

  return (
    <div className={cn("hidden flex-col gap-2.5 lg:flex lg:gap-4", className)}>
      <h4 className="text-xs font-semibold text-black/40 uppercase">{title}</h4>
      <div
        className={cn(
          "flex flex-wrap gap-2",
          direction === "column" ? "flex-col items-start" : "flex-row",
        )}
      >
        {options.map((option) => (
          <ButtonComponent
            key={option.value}
            onClick={() => handleFilterClick(option.value)}
            option={option}
            isActive={selectedFilters.includes(option.value)}
          />
        ))}
      </div>
    </div>
  );
}
