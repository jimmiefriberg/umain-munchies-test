import { Restaurant } from "./api/schema";

import { useFilterStore } from "./filter-store";

export default function useRestaurants(restaurants: Restaurant[]) {
  const { categories, deliveryTimes, priceRanges } = useFilterStore();

  const filteredRestaurants = restaurants.filter((restaurant) => {
    // Check if category matches
    const categoryMatch =
      categories.length === 0 ||
      restaurant.filter_ids.some((filterId) => categories.includes(filterId));

    // Check if delivery time matches
    // TODO: Should we hide it if not open
    const deliveryTimeMatch = deliveryTimes.length === 0 || true; // temp

    // Check if price range matches
    const priceRangeMatch =
      priceRanges.length === 0 ||
      priceRanges.some(
        (priceRange) => restaurant.price_range_id === priceRange,
      );

    return categoryMatch && deliveryTimeMatch && priceRangeMatch;
  });

  return filteredRestaurants;
}
