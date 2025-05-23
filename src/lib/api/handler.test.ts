import { ExternalRestaurant, Category, PriceRange } from "./schema";

// Mock data
const mockRestaurants: ExternalRestaurant[] = [
  {
    id: "1",
    name: "Restaurant 1",
    rating: 4.5,
    filter_ids: ["category-1", "category-2"],
    image_url: "/image1.jpg",
    delivery_time_minutes: 15,
    price_range_id: "price-1",
  },
  {
    id: "2",
    name: "Restaurant 2",
    rating: 3.5,
    filter_ids: ["category-3"],
    image_url: "/image2.jpg",
    delivery_time_minutes: 45,
    price_range_id: "price-2",
  },
  {
    id: "3",
    name: "Restaurant 3",
    rating: 4.0,
    filter_ids: ["category-2"],
    image_url: "/image3.jpg",
    delivery_time_minutes: 65,
    price_range_id: "price-3",
  },
  {
    id: "4",
    name: "Closed Restaurant",
    rating: 4.0,
    filter_ids: ["category-1"],
    image_url: "/image4.jpg",
    delivery_time_minutes: 25,
    price_range_id: "price-1",
  },
];

const mockCategories: Category[] = [
  { id: "category-1", name: "Italian", image_url: "/italian.jpg" },
  { id: "category-2", name: "Asian", image_url: "/asian.jpg" },
  { id: "category-3", name: "Fast Food", image_url: "/fastfood.jpg" },
];

const mockPriceRanges: PriceRange[] = [
  { id: "price-1", range: "$" },
  { id: "price-2", range: "$$" },
  { id: "price-3", range: "$$$" },
];

let handler: any; // eslint-disable-line @typescript-eslint/no-explicit-any

async function getHandler() {
  if (!handler) {
    handler = await import("./handler");
  }
  return handler;
}

const mockGet = jest.fn();

jest.mock("axios", () => ({
  create: jest.fn(() => ({
    get: mockGet,
  })),
  isAxiosError: jest.requireActual("axios").isAxiosError,
}));

describe("API Handler", () => {
  beforeAll(async () => {
    getHandler();
  });

  beforeEach(() => {
    mockGet.mockClear();
  });

  afterAll(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  describe("getRestaurants", () => {
    it("fetches restaurants successfully", async () => {
      // Setup the mock response
      mockGet.mockResolvedValueOnce({
        data: {
          restaurants: mockRestaurants,
        },
      });

      // Call the function
      const result = await handler.getRestaurants();

      // Verify
      expect(mockGet).toHaveBeenCalledWith("/restaurants");
      expect(result).toEqual(mockRestaurants);
    });
  });

  describe("getCategories", () => {
    it("fetches categories successfully", async () => {
      mockGet.mockResolvedValueOnce({
        data: {
          filters: mockCategories,
        },
      });

      const result = await handler.getCategories();

      expect(mockGet).toHaveBeenCalledWith("/filter");
      expect(result).toEqual(mockCategories);
    });

    it("returns empty array on error", async () => {
      mockGet.mockRejectedValueOnce(new Error("Network error"));
      const result = await handler.getCategories();
      expect(result).toEqual([]);
    });
  });

  describe("getOpenStatusForRestaurant", () => {
    it("fetches open status correctly", async () => {
      const restaurantId = mockRestaurants[0].id;
      const mockStatus = { restaurant_id: restaurantId, is_open: true };

      mockGet.mockResolvedValueOnce({
        data: mockStatus,
      });

      const result = await handler.getOpenStatusForRestaurant(restaurantId);

      expect(mockGet).toHaveBeenCalledWith(`/open/${restaurantId}`);
      expect(result).toEqual(mockStatus);
    });

    it("returns default closed status on error", async () => {
      const restaurantId = mockRestaurants[0].id;
      mockGet.mockRejectedValueOnce(new Error("API error"));
      const result = await handler.getOpenStatusForRestaurant(restaurantId);
      expect(result).toEqual({ restaurant_id: restaurantId, is_open: false });
    });
  });

  describe("getPriceRange", () => {
    it("fetches price range correctly", async () => {
      mockGet.mockResolvedValueOnce({
        data: mockPriceRanges[0],
      });

      const result = await handler.getPriceRange("price-1");

      expect(mockGet).toHaveBeenCalledWith("/price-range/price-1");
      expect(result).toEqual(mockPriceRanges[0]);
    });

    it("returns empty range on error", async () => {
      mockGet.mockRejectedValueOnce(new Error("API error"));
      const result = await handler.getPriceRange("price-1");
      expect(result).toEqual({ id: "price-1", range: "" });
    });
  });

  describe("getPriceRanges", () => {
    it("fetches multiple price ranges for restaurants", async () => {
      const mockRestaurantsWithPrices = [
        mockRestaurants[0],
        mockRestaurants[1],
      ];

      mockGet.mockResolvedValueOnce({ data: mockPriceRanges[0] });
      mockGet.mockResolvedValueOnce({ data: mockPriceRanges[1] });

      const result = await handler.getPriceRanges(
        mockRestaurantsWithPrices as any, // eslint-disable-line @typescript-eslint/no-explicit-any
      );

      expect(mockGet).toHaveBeenCalledWith("/price-range/price-1");
      expect(mockGet).toHaveBeenCalledWith("/price-range/price-2");
      expect(result).toEqual([mockPriceRanges[0], mockPriceRanges[1]]);
    });

    it("returns only valid price ranges and sorts them", async () => {
      const mockRestaurantsWithPrices = [
        mockRestaurants[0],
        mockRestaurants[1],
        mockRestaurants[2],
      ];

      mockGet.mockResolvedValueOnce({ data: mockPriceRanges[0] });
      mockGet.mockResolvedValueOnce({ data: mockPriceRanges[1] });
      mockGet.mockResolvedValueOnce({ data: { id: "price-4", range: "" } });

      const result = await handler.getPriceRanges(
        mockRestaurantsWithPrices as any, // eslint-disable-line @typescript-eslint/no-explicit-any
      );

      expect(result).toEqual([mockPriceRanges[0], mockPriceRanges[1]]);
    });
  });

  describe("getFullRestaurantsData", () => {
    it("combines restaurants with their open status", async () => {
      mockGet.mockResolvedValueOnce({
        data: {
          restaurants: [mockRestaurants[0], mockRestaurants[1]],
        },
      });

      mockGet.mockResolvedValueOnce({
        data: { restaurant_id: "1", is_open: true },
      });
      mockGet.mockResolvedValueOnce({
        data: { restaurant_id: "2", is_open: false },
      });

      const result = await handler.getFullRestaurantsData();

      expect(result).toEqual([
        { ...mockRestaurants[0], is_open: true },
        { ...mockRestaurants[1], is_open: false },
      ]);

      // Check correct endpoints were called
      expect(mockGet).toHaveBeenCalledWith("/restaurants");
      expect(mockGet).toHaveBeenCalledWith("/open/1");
      expect(mockGet).toHaveBeenCalledWith("/open/2");
    });
  });
});
