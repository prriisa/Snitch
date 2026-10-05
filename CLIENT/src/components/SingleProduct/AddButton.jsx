import { Plus } from "lucide-react";

export default function AddButton() {
  return (
    <button className="flex w-full items-center justify-center gap-2 bg-black py-3 text-base uppercase text-white">
      Add <Plus size={14} />
    </button>
  );
}