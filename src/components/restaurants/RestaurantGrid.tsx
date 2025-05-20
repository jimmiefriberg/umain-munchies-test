"use client";

import { Restaurant } from "@/lib/api/schema";

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
      {filteredRestaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} data={restaurant} />
      ))}
    </div>
  );
}
