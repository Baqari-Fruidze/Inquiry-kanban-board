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
  updateInquiryPhase: (id: string, phase: InquiryPhase) => Promise<void>;
  updateInquiryNotes: (id: string, notes: string) => Promise<void>;
}

export interface InquiryProps {
  inquiry: Inquiry;
}