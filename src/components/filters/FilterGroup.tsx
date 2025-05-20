import { twMerge } from "tailwind-merge";

import { FilterKeys, toggleFilter } from "@/lib/filter-store";
import { FilterButtonProps } from "./FilterButton";

export default function FilterGroup({
  filterKey,
  title,
  options,
  direction = "row",
  ButtonComponent,
}: {
  filterKey: FilterKeys;
  title: string;
  direction?: "row" | "column";
  options: {
    label: string;
    value: string;
  }[];
  ButtonComponent: React.FC<FilterButtonProps>;
}) {
  function handleFilterClick(value: string) {
    toggleFilter(filterKey, value);
  }

  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-xs font-semibold text-black/40 uppercase">{title}</h4>
      <div
        className={twMerge(
          "flex flex-wrap gap-2",
          direction === "column" ? "flex-col items-start" : "flex-row",
        )}
      >
        {options.map((option) => (
          <ButtonComponent
            key={option.value}
            onClick={() => handleFilterClick(option.value)}
            option={option}
            isActive={false} // Replace with actual active state logic
          />
        ))}
      </div>
    </div>
  );
}
