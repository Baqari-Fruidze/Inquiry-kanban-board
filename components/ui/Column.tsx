import { Inquiry } from "@/types/inquiryTypes";
import { sum } from "@/lib/utils";
import InquiryCard from "./InquiryCard";

export default function Column({ 
  title, 
  inquiries, 
  bgColor 
}: { 
  title: string; 
  inquiries: Inquiry[]; 
  bgColor: string;
}) {
  return (
    <div className={`w-80 rounded-lg overflow-y-auto px-3 pt-3 pb-6 ${bgColor}`}>
      <h1 className="font-semibold text-gray-800 mb-2">{title}</h1>
      <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
        <h3>{inquiries.length} inquiries</h3>
        <span>${sum(inquiries).toLocaleString()}</span>
      </div>
      <div>
        {inquiries.map((inquiry) => (
          <InquiryCard key={inquiry.id} inquiry={inquiry} />
        ))}
      </div>
    </div>
  );
}
