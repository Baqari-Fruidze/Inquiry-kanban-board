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

export interface UseFilterStore {
  searchQuery: string;
  dateFrom: string | null;
  dateTo: string | null;
  minValue: number;
  count: number;
  setSearchQuery: (query: string) => void;
  setDateFrom: (date: string | null) => void;
  setDateTo: (date: string | null) => void;
  setMinValue: (value: number) => void;
  clearFilters: () => void;
  setCount: (count: number) => void;
}
