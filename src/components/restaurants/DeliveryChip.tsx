import Chip from "../shared/Chip";

export default function DeliveryChip({
  deliveryTime,
}: {
  deliveryTime: number;
}) {
  return (
    <Chip>
      <span className="px-1">{convertTimeToReadable(deliveryTime)}</span>
    </Chip>
  );
}

/**
 * Converts the estimated delivery time exceeding 60 min to hours.
 */
function convertTimeToReadable(estimatedDeliveryTime: number): string {
  let suffix = "min";
  let time = estimatedDeliveryTime;

  if (time >= 60) {
    time = Math.floor(time / 60);
    suffix = "hour";
  }

  return `${time} ${suffix}`;
}
