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
    <div className="bg-off-white w-screen py-10 lg:h-screen lg:px-10 lg:pt-14 lg:pb-0">
      <div className="mb-6 px-5 md:mb-8 xl:mb-12">
        <Logo />
      </div>

      <div className="relative flex flex-col gap-6 lg:flex-row lg:gap-5">
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
