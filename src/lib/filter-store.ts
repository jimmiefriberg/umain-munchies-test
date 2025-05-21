import { create } from "zustand";

import { Restaurant } from "./api/schema";

interface FilterStore {
  categories: string[];
  deliveryTimes: string[];
  priceRanges: string[];
}

export type FilterKeys = "categories" | "deliveryTimes" | "priceRanges";

export const useFilterStore = create<FilterStore>()(() => ({
  categories: [],
  deliveryTimes: [],
  priceRanges: [],
}));

useFilterStore.subscribe(console.log);

/**
 * Toggle a specific filter.
 */
export function toggleFilter(key: FilterKeys, filter: string) {
  useFilterStore.setState((state) => {
    const updateFilters = state[key].includes(filter)
      ? state[key].filter((filt) => filt !== filter)
      : [...state[key], filter];
    return { [key]: updateFilters };
  });
}

/**
 * Clear all filters in the filter store.
 */
export function clearFilters() {
  useFilterStore.setState({
    categories: [],
    deliveryTimes: [],
    priceRanges: [],
  });
}

/**
 * Custom hook to view restaurants based on the selected filters.
 */
export function useRestaurants(restaurants: Restaurant[]) {
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
