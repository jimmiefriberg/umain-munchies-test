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
        "border-xs relative mr-2.5 inline-block h-20 w-40 overflow-hidden rounded-lg border-black/10 bg-white px-3 py-4 text-left last:mr-0",
        isActive && "outline-green outline-2 -outline-offset-2",
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
