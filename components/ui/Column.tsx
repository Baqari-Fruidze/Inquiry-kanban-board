import { Inquiry } from "@/types/inquiryTypes";

export default function Column({ title, inquiries }: { title: string; inquiries: Inquiry[] }) {
  return (
    <div className="w-40 rounded-b-lg overflow-y-scroll px-2 pt-2 pb-6 bg-white ">
      <div className="flex justify-between items-center">
        <h3>{title}</h3>
        <span>{inquiries.length}</span>
      </div>
      <div> </div>
    </div>
  );
}
