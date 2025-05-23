import { Restaurant } from "./api/schema";
import {
  DELIVERY_TIMES,
  FILTER_KEYS,
  FilterStore,
  clearFilters,
  filterRestaurants,
  toggleFilter,
  useFilterStore,
} from "./filter-store";

// Mock data
const mockRestaurants: Restaurant[] = [
  {
    id: "1",
    name: "Restaurant 1",
    rating: 4.5,
    filter_ids: ["category-1", "category-2"],
    image_url: "/image1.jpg",
    delivery_time_minutes: 15,
    price_range_id: "price-1",
    is_open: true,
  },
  {
    id: "2",
    name: "Restaurant 2",
    rating: 3.5,
    filter_ids: ["category-3"],
    image_url: "/image2.jpg",
    delivery_time_minutes: 45,
    price_range_id: "price-2",
    is_open: true,
  },
  {
    id: "3",
    name: "Restaurant 3",
    rating: 4.0,
    filter_ids: ["category-2"],
    image_url: "/image3.jpg",
    delivery_time_minutes: 65,
    price_range_id: "price-3",
    is_open: true,
  },
  {
    id: "4",
    name: "Closed Restaurant",
    rating: 4.0,
    filter_ids: ["category-1"],
    image_url: "/image4.jpg",
    delivery_time_minutes: 25,
    price_range_id: "price-1",
    is_open: false,
  },
];
const TOTAL_RESTAURANTS = mockRestaurants.length;

const mockStore: FilterStore = {
  [FILTER_KEYS.CATEGORIES]: [],
  [FILTER_KEYS.DELIVERY_TIMES]: [],
  [FILTER_KEYS.PRICE_RANGES]: [],
};

// Can't test the Hook directly, but we can test the store
// and the filter function
describe("Filter Store", () => {
  beforeEach(() => {
    clearFilters();
  });

  afterAll(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  // Test initial state
  describe("Initial State", () => {
    it("should initialize with empty filters", () => {
      const state = useFilterStore.getState();

      expect(state[FILTER_KEYS.CATEGORIES]).toEqual([]);
      expect(state[FILTER_KEYS.DELIVERY_TIMES]).toEqual([]);
      expect(state[FILTER_KEYS.PRICE_RANGES]).toEqual([]);
    });
  });

  // Test toggleFilter function
  describe("toggleFilter", () => {
    it("should add a filter when it does not exist", () => {
      toggleFilter(FILTER_KEYS.CATEGORIES, "category-1");

      const state = useFilterStore.getState();
      expect(state[FILTER_KEYS.CATEGORIES]).toContain("category-1");
    });
  });

  // Test so clearFilter works
  describe("clearFilters", () => {
    it("should clear all filters", () => {
      toggleFilter(FILTER_KEYS.CATEGORIES, "category-1");
      toggleFilter(FILTER_KEYS.DELIVERY_TIMES, DELIVERY_TIMES.FAST);
      toggleFilter(FILTER_KEYS.PRICE_RANGES, "price-1");
      clearFilters();

      const state = useFilterStore.getState();
      expect(state[FILTER_KEYS.CATEGORIES]).toEqual([]);
      expect(state[FILTER_KEYS.DELIVERY_TIMES]).toEqual([]);
      expect(state[FILTER_KEYS.PRICE_RANGES]).toEqual([]);
    });

    const state = useFilterStore.getState();
    expect(state[FILTER_KEYS.CATEGORIES]).toEqual([]);
  });

  // Test so that all the filter funtions work
  describe("filterRestaurants", () => {
    it("should return all restaurants when no filters are applied", () => {
      clearFilters();

      const filteredRestaurants = filterRestaurants({
        restaurants: mockRestaurants,
        ...mockStore,
      });

      expect(filteredRestaurants.length).toBe(TOTAL_RESTAURANTS);
    });

    it("should filter restaurants by category", () => {
      toggleFilter(FILTER_KEYS.CATEGORIES, "category-1");

      const filteredRestaurants = filterRestaurants({
        restaurants: mockRestaurants,
        ...useFilterStore.getState(),
      });
      expect(filteredRestaurants.length).toBe(2);
      expect(filteredRestaurants.map((r) => r.id)).toEqual(["1", "4"]);
    });

    it("should filter restaurants by delivery time", () => {
      toggleFilter(FILTER_KEYS.DELIVERY_TIMES, DELIVERY_TIMES.FAST);

      const filteredRestaurants = filterRestaurants({
        restaurants: mockRestaurants,
        ...useFilterStore.getState(),
      });

      // Only restaurants with delivery time 10-30 and that are open
      expect(filteredRestaurants.length).toBe(1);
      expect(filteredRestaurants[0].id).toBe("1");
    });

    it("should filter restaurants by price range", () => {
      toggleFilter(FILTER_KEYS.PRICE_RANGES, "price-1");

      const filteredRestaurants = filterRestaurants({
        restaurants: mockRestaurants,
        ...useFilterStore.getState(),
      });
      expect(filteredRestaurants.length).toBe(2);
      expect(filteredRestaurants.map((r) => r.id)).toContain("1");
      expect(filteredRestaurants.map((r) => r.id)).toContain("4");
    });

    it("should combine multiple filter types", () => {
      toggleFilter(FILTER_KEYS.CATEGORIES, "category-1");
      toggleFilter(FILTER_KEYS.PRICE_RANGES, "price-1");

      const filteredRestaurants = filterRestaurants({
        restaurants: mockRestaurants,
        ...useFilterStore.getState(),
      });
      expect(filteredRestaurants.length).toBe(2);
      expect(filteredRestaurants.map((r) => r.id)).toEqual(["1", "4"]);
    });

    it("should not show closed restaurants when filtering by delivery time", () => {
      toggleFilter(FILTER_KEYS.DELIVERY_TIMES, DELIVERY_TIMES.FAST);

      const filteredRestaurants = filterRestaurants({
        restaurants: mockRestaurants,
        ...useFilterStore.getState(),
      });
      // The closed restaurant (id: 4) has a delivery time in the FAST range,
      // but it shouldn't be included because it's closed
      expect(filteredRestaurants.map((r) => r.id)).not.toContain("4");
    });

    it('should handle the "1 hour+" special case correctly', () => {
      toggleFilter(FILTER_KEYS.DELIVERY_TIMES, DELIVERY_TIMES.SLOW);

      const filteredRestaurants = filterRestaurants({
        restaurants: mockRestaurants,
        ...useFilterStore.getState(),
      });
      expect(filteredRestaurants.length).toBe(1);
      expect(filteredRestaurants[0].id).toBe("3");
    });

    it("should return empty array when no restaurants match filters", () => {
      toggleFilter(FILTER_KEYS.CATEGORIES, "non-existent-category");

      const filteredRestaurants = filterRestaurants({
        restaurants: mockRestaurants,
        ...useFilterStore.getState(),
      });
      expect(filteredRestaurants.length).toBe(0);
    });
  });
});
