import Image from "next/image";

export default function CategoryItem({
  image,
  title,
}: {
  image: string;
  title: string;
}) {
  return (
    <button className="border-xs relative mr-2.5 inline-block h-20 w-40 overflow-hidden rounded-lg border-black/10 bg-white px-3 py-4 text-left last:mr-0">
      <p className="text-sm">{title}</p>
      <div className="absolute top-0 right-0 translate-x-[10px]">
        <Image alt={title} src={image} width={80} height={80} />
      </div>
    </button>
  );
}
