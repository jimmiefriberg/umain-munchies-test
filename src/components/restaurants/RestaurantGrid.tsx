"use client";

import { Restaurant } from "@/lib/api/schema";
import { clearFilters } from "@/lib/filter-store";

import RestaurantCard from "./RestaurantCard";
import useRestaurants from "@/lib/use-restaurants";

export default function RestaurantGrid({
  restaurants,
}: {
  restaurants: Restaurant[];
}) {
  const filteredRestaurants = useRestaurants(restaurants);

  return (
    <div className="grid w-full grid-cols-1 gap-2.5 xl:pb-10 @2xl:grid-cols-2 @5xl:grid-cols-3">
      {filteredRestaurants.length === 0 && (
        <div className="col-span-full">
          <p className="mb-2">No restaurants found</p>
          <button
            className="border-xs hover:bg-green cursor-pointer rounded-lg border-black/10 px-3 py-2 text-xs hover:text-white"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </div>
      )}

      {filteredRestaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} data={restaurant} />
      ))}
    </div>
  );
}
