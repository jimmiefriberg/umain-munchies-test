import { Restaurant } from "./api/schema";

import { useFilterStore } from "./filter-store";

export default function useRestaurants(restaurants: Restaurant[]) {
  // ! TEMP
  return restaurants;

  const filters = useFilterStore();
}
