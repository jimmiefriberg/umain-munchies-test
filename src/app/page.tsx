import RestaurantGrid from "@/components/restaurants/RestaurantGrid";
import { getRestaurants } from "@/lib/api";

export default async function Home() {
  // TODO: Replace with function that fetches all data from the API
  const restaurants = await getRestaurants();
  console.log("Restaurants:", restaurants);

  return (
    <div className="p-4">
      <RestaurantGrid restaurants={restaurants} />
    </div>
  );
}
