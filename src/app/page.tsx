import {
  getCategories,
  getFullRestaurantsData,
  getPriceRanges,
} from "@/lib/api/handler";

import CategoryList from "@/components/categories/CategoryList";
import Sidebar from "@/components/layout/Sidebar";
import Logo from "@/components/Logo";
import RestaurantGrid from "@/components/restaurants/RestaurantGrid";

export default async function Home() {
  const restaurants = await getFullRestaurantsData();
  const categories = await getCategories();
  const priceRanges = await getPriceRanges(restaurants);

  return (
    <div className="bg-off-white flex w-screen flex-col gap-6 py-10 md:gap-8 lg:min-h-screen lg:px-10 lg:pt-14 lg:pb-0 xl:gap-12">
      <div className="px-5 lg:px-0">
        <Logo />
      </div>

      <div className="relative flex grow flex-col gap-6 lg:flex-row lg:gap-5">
        <Sidebar categories={categories} priceRanges={priceRanges} />

        <main className="flex min-w-0 grow flex-col gap-6 px-5 lg:px-0">
          <CategoryList categories={categories} />
          <section className="@container w-full">
            <h2 className="mb-5 text-xl md:text-2xl xl:text-3xl">
              Restaurants
            </h2>
            <RestaurantGrid restaurants={restaurants} />
          </section>
        </main>
      </div>
    </div>
  );
}
