export type InquiryPhase =
  | "new"
  | "sent_to_hotels"
  | "offers_received"
  | "completed";

export interface Inquiry {
  id: string;
  clientName: string;
  contactPerson: string;
  eventType: string;
  eventDate: string;
  guestCount: number;
  potentialValue: number;
  phase: InquiryPhase;
  hotels: string[];
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface UseInquiryStore {
  isLoading: boolean;
  inquiries: Inquiry[];
  fetchingInquiries: () => Promise<void>;
}


export interface InquiryProps {
  inquiry: Inquiry;
}