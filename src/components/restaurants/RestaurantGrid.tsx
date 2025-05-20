import { RestaurantList } from "@/lib/api/schema";
import RestaurantCard from "./RestaurantCard";

export default function RestaurantGrid({
  restaurants,
}: {
  restaurants: RestaurantList;
}) {
  return (
    <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2 lg:grid-cols-3">
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} data={restaurant} />
      ))}
    </div>
  );
}
