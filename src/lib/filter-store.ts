import { create } from "zustand";

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

export function toggleFilter(key: FilterKeys, filter: string) {
  useFilterStore.setState((state) => {
    const updateFilters = state[key].includes(filter)
      ? state[key].filter((filt) => filt !== filter)
      : [...state[key], filter];
    return { [key]: updateFilters };
  });
}

export function clearFilters() {
  useFilterStore.setState({
    categories: [],
    deliveryTimes: [],
    priceRanges: [],
  });
}
