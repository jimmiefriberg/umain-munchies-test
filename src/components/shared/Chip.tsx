export default function Chip({ children }: { children: React.ReactElement }) {
  return (
    <div className="border-xs rounded-full border-black/10 p-2 text-xs leading-none">
      {children}
    </div>
  );
}
