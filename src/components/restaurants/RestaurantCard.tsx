import Image from "next/image";

import { Restaurant } from "@/lib/api/schema";

import OpenChip from "./OpenChip";
import DeliveryChip from "./DeliveryChip";

export default function RestaurantCard({ data }: { data: Restaurant }) {
  return (
    <div className="relative flex h-[202px] flex-col justify-between overflow-hidden rounded-lg border border-black/10 bg-white p-4">
      <div className="flex gap-2.5">
        <OpenChip isOpen={true} />
        <DeliveryChip deliveryTime={data.delivery_time_minutes} />
      </div>

      <div className="absolute top-0 right-0 translate-x-[30px] -translate-y-[30px]">
        <Image
          src={data.image_url}
          alt={data.name}
          width={140}
          height={140}
          className="h-[8.75rem] w-[8.75rem] object-cover"
        />
      </div>

      <div className="flex items-end justify-between gap-3">
        <h3 className="text-2xl">{data.name}</h3>

        <button>Arrow</button>
      </div>
    </div>
  );
}
