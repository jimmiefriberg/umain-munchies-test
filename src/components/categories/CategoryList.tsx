"use client";

import { Category } from "@/lib/api/schema";
import { useFilterStore } from "@/lib/filter-store";

import CategoryItem from "./CategoryItem";

export default function CategoryList({
  categories,
}: {
  categories: Category[];
}) {
  const activeCategories = useFilterStore((state) => state.categories);

  return (
    <div className="no-scrollbar category-slider w-full overflow-x-scroll whitespace-nowrap">
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          image={category.image_url}
          title={category.name}
          id={category.id}
          isActive={activeCategories.includes(category.id)}
        />
      ))}
    </div>
  );
}
