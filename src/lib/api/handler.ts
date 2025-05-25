import axios, { AxiosError } from "axios";
import z from "zod";

import {
  ExternalRestaurantSchema,
  Restaurant,
  Category,
  ExternalRestaurant,
  ExternalCategorySchema,
  OpenStatus,
  ExternalOpenStatusSchema,
  ExternalPriceRangeSchema,
  PriceRange,
} from "./schema";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("API_URL is not defined in the environment variables");
}

// Axios instance configuration
export const externalApi = axios.create({
  baseURL: `${API_URL}/api`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/**
 * Get the restaurants and their open status from the external API.
 */
export async function getFullRestaurantsData() {
  const restaurants = await getRestaurants();

  const openRequests = restaurants.map((restaurant) =>
    getOpenStatusForRestaurant(restaurant.id),
  );

  const openStatuses = await Promise.all(openRequests);

  const restaurantsWithOpenStatus = restaurants.map((restaurant) => {
    const openStatus = openStatuses.find(
      (status) => status.restaurant_id === restaurant.id,
    );
    const is_open = openStatus ? openStatus.is_open : false;
    return {
      ...restaurant,
      is_open,
    };
  });

  return restaurantsWithOpenStatus;
}

/**
 * Get the restaurants from the external API.
 */
export async function getRestaurants(): Promise<ExternalRestaurant[]> {
  try {
    const response = await externalApi.get("/restaurants");
    const restaurants = response.data.restaurants;

    if (!restaurants) {
      throw new ExternalApiError("No restaurants found in the response");
    }

    // Validate the response data
    const parsedData = parseIncomingData(restaurants, ExternalRestaurantSchema);

    return parsedData;
  } catch (error) {
    return handleError(error, [] as ExternalRestaurant[]);
  }
}

/**
 * Get the filter categories from the external API.
 */
export async function getCategories(): Promise<Category[]> {
  try {
    const response = await externalApi.get("/filter");
    const categories = response.data.filters;

    if (!categories) {
      throw new ExternalApiError("No categories found in the response");
    }

    // Validate the response data
    const parsedData = parseIncomingData(categories, ExternalCategorySchema);

    return parsedData;
  } catch (error) {
    return handleError(error, [] as Category[]);
  }
}

/**
 * Get the open status for a specific restaurant from the external API.
 */
export async function getOpenStatusForRestaurant(
  restaurantId: string,
): Promise<OpenStatus> {
  try {
    const response = await externalApi.get(`/open/${restaurantId}`);
    const data = response.data;

    if (!data) {
      throw new ExternalApiError("No opening time found in the response");
    }

    // Validate the response data
    const parsedData = parseIncomingData(data, ExternalOpenStatusSchema);

    return parsedData;
  } catch (error) {
    return handleError(error, {
      restaurant_id: restaurantId,
      is_open: false,
    } as OpenStatus);
  }
}

/**
 * Get a price range for a specific price range ID from the external API.
 */
export async function getPriceRange(priceRangeId: string) {
  try {
    const response = await externalApi.get(`/price-range/${priceRangeId}`);
    const data = response.data;

    if (!data) {
      throw new ExternalApiError("No price range found in the response");
    }

    // Validate the response data
    const parsedData = parseIncomingData(data, ExternalPriceRangeSchema);

    return parsedData;
  } catch (error) {
    return handleError(error, {
      id: priceRangeId,
      range: "",
    } as PriceRange);
  }
}

/**
 * Get all price ranges for the given restaurants.
 */
export async function getPriceRanges(
  restaurants: Restaurant[],
): Promise<PriceRange[]> {
  try {
    const priceRangeIds = new Set<string>();

    for (const restaurant of restaurants) {
      priceRangeIds.add(restaurant.price_range_id);
    }

    const requests = Array.from(priceRangeIds).map(getPriceRange);
    const data: PriceRange[] = await Promise.all(requests);

    const priceRanges = data
      .filter((priceRange) => priceRange.range !== "")
      .sort((a, b) => (a.range < b.range ? -1 : 1));

    return priceRanges;
  } catch (error) {
    return handleError(error, [] as PriceRange[]);
  }
}

// Helper functions
/**
 * Perse the incoming data to see that it matches the API Docs.
 */
function parseIncomingData<TData>(data: TData, schema: z.ZodSchema<TData>) {
  let parsedData;

  if (Array.isArray(data)) {
    parsedData = z.array(schema).safeParse(data);
  } else {
    parsedData = schema.safeParse(data);
  }

  if (!parsedData.success) {
    if (process.env.NODE_ENV === "development") {
      throw new ParseError("Response doesn't match API Docs", parsedData.error);
    }

    // ! This is a placeholder and tied in with the error handling
    // ! function below. In a real project we'd want to implement
    // ! some form of error handling here.
    return data as TData;
  }

  return parsedData.data as TData;
}

/**
 * Custom error class for parse errors.
 */
class ParseError extends Error {
  constructor(
    message: string,
    public cause: z.ZodError,
  ) {
    super(message);
    this.name = "ParseError";
  }
}

/**
 * Custom error class for external API errors.
 */
class ExternalApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ExternalApiError";
  }
}

/**
 * Handle the errors from the API calls.
 */
function handleError<TData>(
  error: AxiosError | ParseError | unknown,
  returnData: TData,
) {
  // ! This is a placeholder for error handling.
  // ! If this was a real project, I'd want to match the error to the API docs
  // ! and handle them accordingly. For now, I'll just log the error and
  // ! return empty data.

  if (error instanceof ParseError) {
    console.error("Parse error:", error.message);
    throw new Error(
      "Response doesn't match API Docs. Please check the API response.",
    );
  }

  if (axios.isAxiosError(error) && error.response?.status === 404) {
    // This should be updaed to handle more errors
    // Could be combimed with the ExternalApiError below
    console.error("API endpoint not found:", error.message);
    throw new Error("Not found");
  }

  if (error instanceof ExternalApiError) {
    console.error("External API error:", error.message);
    // Handle specific external API errors here
  } else {
    console.error("Unexpected error:", error);
  }

  return returnData as TData;
}
