import axios from "axios";
import z from "zod";

import { ExternalRestaurantSchema } from "./schema";

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
  },
});

externalApi.interceptors.request.use((config) => {
  console.log("Sending request to:", config.url);

  return config;
});

export async function getRestaurants() {
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
    console.log("Error fetching restaurants:", error);
    // TODO: Returning an empty array for now. Might be worth throwing.
    return [];
  }
}

function parseIncomingData<TData>(data: TData, schema: z.ZodSchema<TData>) {
  let parsedData;

  if (Array.isArray(data)) {
    parsedData = z.array(schema).safeParse(data);
  } else {
    parsedData = schema.safeParse(data);
  }

  if (!parsedData.success) {
    console.error("Validation error:", parsedData.error);
    // TODO: Handle gracefully in production. Throw for now.
    throw new Error("External API response doesn't match API Docs");
  }

  return parsedData.data as TData;
}
