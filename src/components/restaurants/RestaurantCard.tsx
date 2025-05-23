import Image from "next/image";

import { Restaurant } from "@/lib/api/schema";
import { cn } from "@/lib/utils";

import OpenChip from "./OpenChip";
import DeliveryChip from "./DeliveryChip";

// Static Copy
const NOT_OPEN_TEXT = "Opens tomorrow at 12 pm";

export default function RestaurantCard({ data }: { data: Restaurant }) {
  function handleClick() {
    // Placeholder function for the button click
    console.log(`Clicked on ${data.name}`);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={!data.is_open}
      className={cn(
        "group relative flex h-[202px] flex-col justify-between overflow-hidden rounded-lg border border-black/10 bg-white p-4 outline-2 -outline-offset-1 outline-transparent",
        data.is_open &&
          "hover:outline-green/50 focus-visible:outline-green/50 cursor-pointer duration-120",
      )}
    >
      <div className="flex gap-2.5">
        <OpenChip isOpen={data.is_open} />

        {data.is_open && (
          <DeliveryChip deliveryTime={data.delivery_time_minutes} />
        )}
      </div>

      {!data.is_open && (
        <div className="border-xs bg-off-white absolute top-1/2 left-1/2 -translate-1/2 rounded-lg border-black/10 px-3 py-2 text-xs leading-none">
          <span>{NOT_OPEN_TEXT}</span>
        </div>
      )}

      <div
        className={cn(
          "absolute top-0 right-0 translate-x-[30px] -translate-y-[30px]",
          !data.is_open && "opacity-20",
        )}
      >
        <Image
          src={data.image_url}
          alt={data.name}
          width={140}
          height={140}
          className="h-[8.75rem] w-[8.75rem] object-cover"
        />
      </div>

      <div
        className={cn(
          "flex items-end justify-between gap-3",
          !data.is_open && "opacity-20",
        )}
      >
        <h3 className="text-2xl">{data.name}</h3>

        <Arrow disabled={!data.is_open} />
      </div>
    </button>
  );
}

function Arrow({ disabled = false }: { disabled?: boolean }) {
  return (
    <div
      className={cn(
        "bg-green grid h-8 w-8 place-items-center rounded-full duration-120",
        !disabled && "group-hover:animate-wiggle",
      )}
    >
      <svg
        className="h-2.5 w-3"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 12 10"
      >
        <path
          d="M11.856 5a.623.623 0 0 1-.219.469L7.606 9.492a.648.648 0 0 1-.461.195.61.61 0 0 1-.437-.171.593.593 0 0 1-.172-.438.76.76 0 0 1 .039-.242.52.52 0 0 1 .133-.195l1.078-1.118 2.64-2.375.14.336-2.077.149H1.114a.598.598 0 0 1-.453-.18A.63.63 0 0 1 .489 5a.63.63 0 0 1 .172-.453.598.598 0 0 1 .453-.18h7.375l2.078.149-.14.343-2.641-2.382-1.078-1.118a.52.52 0 0 1-.133-.195.76.76 0 0 1-.04-.242c0-.177.058-.323.173-.438a.61.61 0 0 1 .437-.171c.172 0 .326.065.461.195l4.031 4.023a.623.623 0 0 1 .219.469Z"
          fill="#fff"
        />
      </svg>
    </div>
  );
}
