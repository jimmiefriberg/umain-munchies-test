import Chip from "../shared/Chip";

export default function OpenChip({ isOpen }: { isOpen: boolean }) {
  const openText = isOpen ? "Open" : "Closed";

  return (
    <Chip>
      <div
        className={`flex items-center justify-center gap-1 pr-1 pl-0.5 before:h-2 before:w-2 before:rounded-full before:content-[''] ${isOpen ? "before:bg-green" : "before:bg-black"}`}
      >
        <span>{openText}</span>
      </div>
    </Chip>
  );
}
