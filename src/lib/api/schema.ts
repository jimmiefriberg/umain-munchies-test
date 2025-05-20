import z from "zod";

export const ExternalRestaurantSchema = z.object({
  id: z.string(),
  name: z.string(),
  rating: z.number(),
  filter_ids: z.array(z.string()),
  image_url: z.string(),
  delivery_time_minutes: z.number(),
  price_range_id: z.string(),
});

export const ExternalCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  image_url: z.string(),
});

export const ExternalPriceRangeSchema = z.object({
  id: z.string(),
  range: z.string(),
});

export const ExternalOpenStatusSchema = z.object({
  id: z.string(),
  is_open: z.boolean(),
});

// TODO: Update to be the combined schema
export type Restaurant = z.infer<typeof ExternalRestaurantSchema>;
export type Category = z.infer<typeof ExternalCategorySchema>;
