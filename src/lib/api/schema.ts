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
