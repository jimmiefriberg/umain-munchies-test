import Category from "./Category";

const categories = [
  {
    title: "Hamburger",
    image: "/images/hamburger.png",
  },
  {
    title: "Pizza",
    image: "/images/pizza.png",
  },
  {
    title: "Taco",
    image: "/images/taco.png",
  },
  {
    title: "Breakfast",
    image: "/images/breakfast.png",
  },
  {
    title: "Coffee",
    image: "/images/coffee.png",
  },
  {
    title: "Fries",
    image: "/images/fries.png",
  },
  {
    title: "Burrito",
    image: "/images/burrito.png",
  },
];

export default function CategoryList() {
  return (
    <div className="no-scrollbar overflow-x-scroll overflow-y-hidden">
      <div className="flex gap-2.5">
        {categories.map((category) => (
          <Category
            key={category.title}
            image={category.image}
            title={category.title}
          />
        ))}
      </div>
    </div>
  );
}
