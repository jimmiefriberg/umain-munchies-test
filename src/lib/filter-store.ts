import { create } from "zustand";

import { Restaurant } from "./api/schema";

interface FilterStore {
  categories: string[];
  deliveryTimes: string[];
  priceRanges: string[];
}

export type FilterKeys = "categories" | "deliveryTimes" | "priceRanges";

export const deliveryTimes = [
  { label: "0-10 min", value: "0-10" },
  { label: "10-30 min", value: "10-30" },
  { label: "30-60 min", value: "30-60" },
  { label: "1 hour+", value: "60" },
];

export const useFilterStore = create<FilterStore>()(() => ({
  categories: [],
  deliveryTimes: [],
  priceRanges: [],
}));

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
      isFilterEmpty(categories) ||
      restaurant.filter_ids.some((filterId) => categories.includes(filterId));

    // Check if delivery time matches
    // And if the restaurant is open
    const deliveryTimeMatch =
      isFilterEmpty(deliveryTimes) ||
      (restaurant.is_open &&
        isTimeInRange(restaurant.delivery_time_minutes, deliveryTimes));

    // Check if price range matches
    const priceRangeMatch =
      isFilterEmpty(priceRanges) ||
      priceRanges.some(
        (priceRange) => restaurant.price_range_id === priceRange,
      );

    return categoryMatch && deliveryTimeMatch && priceRangeMatch;
  });

  return filteredRestaurants;
}

function isFilterEmpty(filter: string[]): boolean {
  return filter.length === 0;
}

/**
 * Check if delivery time is in the selected ranges.
 */
function isTimeInRange(time: number, ranges: string[]): boolean {
  const rangesCopy = [...ranges];

  if (ranges.length === 0) {
    return true;
  }

  while (rangesCopy.length > 0) {
    const range = rangesCopy.pop();
    if (range && isInRange(time, range)) {
      return true;
    }
  }
  return false;
}

/**
 * Check if a time is within a specific range.
 */
function isInRange(time: number, range: string): boolean {
  const [min, max] = range.split("-").map(Number);
  return time >= min && (max ? time <= max : true);
}
