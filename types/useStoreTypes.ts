export interface UsemodalTypes {
  isOpen: boolean;
  selectedInquiryId: string | null;
  closeModal: () => void;
  openModal: (inquiryId: string) => void;
}

export interface UseNoteStore {
  note: string;
  setNote: (note: string) => void;
}

