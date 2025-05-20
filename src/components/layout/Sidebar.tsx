"use client";

import { Category } from "@/lib/api/schema";

import FilterGroup from "../filters/FilterGroup";
import FilterButton from "../filters/FilterButton";

export default function Sidebar({ categories }: { categories: Category[] }) {
  const categoryOptions = categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  return (
    <aside className="border-xs flex flex-col rounded-t-lg border-black/10 px-5 lg:shrink-0 lg:basis-[max(15rem,_18vw)] lg:gap-8 lg:bg-white lg:p-6">
      <h3 className="text-2xl">Filter</h3>

      <FilterGroup
        filterKey="categories"
        title="Food Category"
        direction="column"
        options={categoryOptions}
        ButtonComponent={FilterButton}
      />

      <FilterGroup
        filterKey="deliveryTimes"
        title="Delivery Time"
        direction="row"
        options={[
          { label: "0-10 min", value: "10" },
          { label: "10-30 min", value: "30" },
          { label: "30-60 min", value: "60" },
          { label: "1 hour+", value: "1" },
        ]}
        ButtonComponent={FilterButton}
      />

      <FilterGroup
        filterKey="priceRanges"
        title="Price Range"
        direction="row"
        options={[
          { label: "$", value: "1" },
          { label: "$$", value: "2" },
          { label: "$$$", value: "3" },
          { label: "$$$$", value: "4" },
        ]}
        ButtonComponent={(props) => (
          <FilterButton {...props} className="px-2" />
        )}
      />
    </aside>
  );
}
