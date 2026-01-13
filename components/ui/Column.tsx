import { Inquiry } from "@/types/inquiryTypes";
import { sum } from "@/lib/utils";
import InquiryCard from "./InquiryCard";
import { Droppable } from "@hello-pangea/dnd";

export default function Column({ 
  columnId,
  title, 
  inquiries, 
  bgColor 
}: { 
  columnId: string;
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
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="min-h-[200px]"
          >
            {inquiries.map((inquiry, index) => (
              <InquiryCard key={inquiry.id} inquiry={inquiry} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
