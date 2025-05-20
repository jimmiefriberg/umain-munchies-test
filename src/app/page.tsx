import CategoryList from "@/components/categories/CategoryList";
import Sidebar from "@/components/layout/Sidebar";
import Logo from "@/components/Logo";
import RestaurantGrid from "@/components/restaurants/RestaurantGrid";
import { getRestaurants } from "@/lib/api";

export default async function Home() {
  // TODO: Replace with function that fetches all data from the API
  const restaurants = await getRestaurants();
  console.log("Restaurants:", restaurants);

  return (
    <div className="bg-off-white w-full py-10 lg:px-10 lg:pt-14 lg:pb-0">
      <div className="mb-6 px-5">
        <Logo />
      </div>

      <div className="flex flex-col gap-6">
        <Sidebar />
        <main className="flex flex-col gap-6 px-5">
          <CategoryList />
          <section>
            <h2 className="mb-5 text-xl">Restaurant’s</h2>
            <RestaurantGrid restaurants={restaurants} />
          </section>
        </main>
      </div>
    </div>
  );
}
