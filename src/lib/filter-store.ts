import { create } from "zustand";

import { Restaurant } from "./api/schema";

// Delivery Times Options
export const DELIVERY_TIMES = {
  FASTEST: "0-10",
  FAST: "10-30",
  MEDIUM: "30-60",
  SLOW: "60",
} as const;

export const deliveryTimes = [
  { label: "0-10 min", value: DELIVERY_TIMES.FASTEST },
  { label: "10-30 min", value: DELIVERY_TIMES.FAST },
  { label: "30-60 min", value: DELIVERY_TIMES.MEDIUM },
  { label: "1 hour+", value: DELIVERY_TIMES.SLOW },
];

// Filter Store Keys
export const FILTER_KEYS = {
  CATEGORIES: "categories",
  DELIVERY_TIMES: "deliveryTimes",
  PRICE_RANGES: "priceRanges",
} as const;

export type FilterKeys = (typeof FILTER_KEYS)[keyof typeof FILTER_KEYS];

// Filter Store
interface FilterStore {
  [FILTER_KEYS.CATEGORIES]: string[];
  [FILTER_KEYS.DELIVERY_TIMES]: string[];
  [FILTER_KEYS.PRICE_RANGES]: string[];
}

export const useFilterStore = create<FilterStore>()(() => ({
  [FILTER_KEYS.CATEGORIES]: [],
  [FILTER_KEYS.DELIVERY_TIMES]: [],
  [FILTER_KEYS.PRICE_RANGES]: [],
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
    [FILTER_KEYS.CATEGORIES]: [],
    [FILTER_KEYS.DELIVERY_TIMES]: [],
    [FILTER_KEYS.PRICE_RANGES]: [],
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

/**
 * Check if a filter is empty.
 */
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
