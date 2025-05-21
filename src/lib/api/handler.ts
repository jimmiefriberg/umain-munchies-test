import axios from "axios";
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
const externalApi = axios.create({
  baseURL: `${API_URL}/api`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

externalApi.interceptors.request.use((config) => {
  console.log("Sending request to:", config.url);

  return config;
});

export async function getFullRestaurantsData() {
  let restaurants = await getRestaurants();

  const openRequests = restaurants.map((restaurant) =>
    getOpenStatusForRestaurant(restaurant.id),
  );

  const openStatuses = await Promise.all(openRequests);

  restaurants = restaurants.map((restaurant) => {
    const openStatus = openStatuses.find(
      (status) => status.restaurant_id === restaurant.id,
    );
    const is_open = openStatus ? openStatus.is_open : false;
    return {
      ...restaurant,
      is_open,
    };
  });

  // TEMP
  return restaurants as Restaurant[];
}

export async function getRestaurants(): Promise<ExternalRestaurant[]> {
  try {
    const response = await externalApi.get("/restaurants");
    const restaurants = response.data.restaurants;

    if (!restaurants) {
      throw new Error("No restaurants found in the response");
    }

    // Validate the response data
    const parsedData = parseIncomingData(restaurants, ExternalRestaurantSchema);

    return parsedData;
  } catch (error) {
    return handleError(error, [] as ExternalRestaurant[]);
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await externalApi.get("/filter");
    const categories = response.data.filters;

    if (!categories) {
      throw new Error("No categories found in the response");
    }

    // Validate the response data
    const parsedData = parseIncomingData(categories, ExternalCategorySchema);

    return parsedData;
  } catch (error) {
    return handleError(error, [] as Category[]);
  }
}

export async function getOpenStatusForRestaurant(
  restaurantId: string,
): Promise<OpenStatus> {
  try {
    const response = await externalApi.get(`/open/${restaurantId}`);
    const data = response.data;

    if (!data) {
      throw new Error("No opening time found in the response");
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

export async function getPriceRage(priceRangeId: string) {
  try {
    const response = await externalApi.get(`/price-range/${priceRangeId}`);
    const data = response.data;

    if (!data) {
      throw new Error("No price range found in the response");
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

export async function getPriceRanges(
  restaurants: Restaurant[],
): Promise<PriceRange[]> {
  try {
    const priceRangeIds = new Set<string>();

    for (const restaurant of restaurants) {
      priceRangeIds.add(restaurant.price_range_id);
    }

    const requests = Array.from(priceRangeIds).map(getPriceRage);
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
function parseIncomingData<TData>(data: TData, schema: z.ZodSchema<TData>) {
  let parsedData;

  if (Array.isArray(data)) {
    parsedData = z.array(schema).safeParse(data);
  } else {
    parsedData = schema.safeParse(data);
  }

  if (!parsedData.success) {
    console.error("Validation error:", parsedData.error);

    if (process.env.NODE_ENV === "development") {
      throw new Error("External API response doesn't match API Docs");
    }

    // TODO: Handle gracefully in production.
  }

  return parsedData.data as TData;
}

function handleError<TData>(error: unknown, returnData: TData) {
  // ! This is a placeholder for error handling.
  // ! If this was a real project, I'd want to match the error to the API docs
  // ! and handle them accordingly. For now, I'll just log the error and
  // ! return empty data.

  console.log("Error:", error);

  // TODO: Should update to match some form off fallback. This should be
  // TODO: the same across the entire app but requires a design.

  return returnData as TData;
}
