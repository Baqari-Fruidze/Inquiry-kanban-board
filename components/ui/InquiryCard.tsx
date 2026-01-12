import { Inquiry } from "@/types/inquiryTypes";
import { countDayDifference } from "@/lib/utils";
import { PHASE_COLORS } from "@/constants/constants";
import { Calendar, Users, TrendingUp } from "lucide-react";
import { InquiryProps } from "@/types/inquiryTypes";



export default function InquiryCard({ inquiry }: InquiryProps) {
  const daysSinceCreated = countDayDifference(inquiry.createdAt);
  const isHighValue = inquiry.potentialValue > 50000;
  const phaseColor = PHASE_COLORS[inquiry.phase] || "bg-gray-500";

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getPhaseLabel = (phase: string) => {
    const labels: Record<string, string> = {
      new: "New",
      sent_to_hotels: "Sent to Hotels",
      offers_received: "Offers Received",
      completed: "Completed",
    };
    return labels[phase] || phase;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-3 hover:shadow-lg transition-shadow cursor-pointer">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-gray-900 text-base flex-1">
          {inquiry.clientName}
        </h3>
        <span
          className={`${phaseColor} text-white text-xs px-3 py-1 rounded-full whitespace-nowrap ml-2`}
        >
          {getPhaseLabel(inquiry.phase)}
        </span>
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{formatDate(inquiry.eventDate)}</span>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <Users className="w-4 h-4 mr-2" />
          <span>
            {inquiry.guestCount} Guests • {inquiry.eventType}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-gray-900">
            {formatCurrency(inquiry.potentialValue)}
          </span>
          {isHighValue && (
            <TrendingUp className="w-5 h-5 ml-2 text-green-600" />
          )}
        </div>
        <span className="text-xs text-gray-500">
          Created {daysSinceCreated} {daysSinceCreated === 1 ? "day" : "days"}{" "}
          ago
        </span>
      </div>
    </div>
  );
}
