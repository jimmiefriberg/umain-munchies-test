import { toggleFilter } from "@/lib/filter-store";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function CategoryItem({
  image,
  title,
  id,
  isActive,
}: {
  image: string;
  title: string;
  id: string;
  isActive?: boolean;
}) {
  function handleClick() {
    toggleFilter("categories", id);
  }

  return (
    <button
      className={cn(
        "border-xs hover:outline-green/50 focus-visible:outline-green/50 relative mr-2.5 inline-flex h-20 w-40 cursor-pointer overflow-hidden rounded-lg border-black/10 bg-white px-3 py-4 text-left outline-2 -outline-offset-2 outline-transparent duration-120 last:mr-0",
        isActive &&
          "outline-green outline-2 hover:opacity-70 focus-visible:opacity-70",
      )}
      onClick={handleClick}
    >
      <p className="text-sm">{title}</p>
      <div className="absolute top-0 right-0 translate-x-[10px]">
        <Image alt={title} src={image} width={80} height={80} />
      </div>
    </button>
  );
}
