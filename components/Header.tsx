import { Plus } from "lucide-react";

export default function Header() {
  return (
    <div className="flex items-center justify-between p-3  ">
      <h2 className="text-[26px] font-bold text-white">kanban board</h2>
      <div className="flex items-center gap-[12px]  bg-white rounded-4xl p-4 ">
        <Plus size={20} className="text-gray-600" />
        <span className="text-[16px] font-normal">Add New</span>
      </div>
    </div>
  );
}
