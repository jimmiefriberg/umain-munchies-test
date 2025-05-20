"use client";

import { Category } from "@/lib/api/schema";

import CategoryItem from "./CategoryItem";

export default function CategoryList({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <div className="">
      <div className="no-scrollbar w-full overflow-x-scroll whitespace-nowrap">
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            image={category.image_url}
            title={category.name}
          />
        ))}
      </div>
    </div>
  );
}
