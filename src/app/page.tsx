import { getRestaurants } from "@/lib/api";

export default async function Home() {
  // TODO: Replace with function that fetches all data from the API
  const restaurants = await getRestaurants();
  console.log("Restaurants:", restaurants);

  return (
    <div>{restaurants.length > 0 && JSON.stringify(restaurants, null, 2)}</div>
  );
}
