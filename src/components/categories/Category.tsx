import Image from "next/image";

export default function Category({
  image,
  title,
}: {
  image: string;
  title: string;
}) {
  return (
    <button className="border-xs relative h-20 flex-[0_0_10rem] overflow-hidden rounded-lg border-black/10 bg-white px-3 py-4 text-left">
      <p className="text-sm">{title}</p>
      <div className="absolute top-0 right-0 translate-x-[10px]">
        <Image alt={title} src={image} width={80} height={80} />
      </div>
    </button>
  );
}
