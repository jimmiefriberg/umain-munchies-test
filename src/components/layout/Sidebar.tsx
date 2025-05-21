"use client";

import { Category, PriceRange } from "@/lib/api/schema";
import { deliveryTimes, FILTER_KEYS } from "@/lib/filter-store";

import FilterGroup from "../filters/FilterGroup";
import FilterButton from "../filters/FilterButton";

export default function Sidebar({
  categories,
  priceRanges,
}: {
  categories: Category[];
  priceRanges: PriceRange[];
}) {
  const categoryOptions = categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const priceRangeOptions = priceRanges.map((priceRange) => ({
    label: priceRange.range,
    value: priceRange.id,
  }));

  return (
    <aside className="border-xs flex flex-col rounded-t-lg border-transparent px-5 lg:shrink-0 lg:basis-[max(15rem,_18vw)] lg:gap-8 lg:border-black/10 lg:bg-white lg:p-6">
      <h3 className="hidden text-2xl lg:block">Filter</h3>

      <FilterGroup
        filterKey={FILTER_KEYS.CATEGORIES}
        title="Food Category"
        direction="column"
        options={categoryOptions}
        ButtonComponent={FilterButton}
      />

      <FilterGroup
        filterKey={FILTER_KEYS.DELIVERY_TIMES}
        title="Delivery Time"
        direction="row"
        options={deliveryTimes}
        ButtonComponent={FilterButton}
        className="flex"
      />

      <FilterGroup
        filterKey={FILTER_KEYS.PRICE_RANGES}
        title="Price Range"
        direction="row"
        options={priceRangeOptions}
        ButtonComponent={(props) => (
          <FilterButton {...props} className="px-2" />
        )}
      />
    </aside>
  );
}
