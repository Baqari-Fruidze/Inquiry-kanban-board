import { UseInquiryStore, InquiryPhase } from "@/types/inquiryTypes";
import { UsemodalTypes, UseNoteStore, UseFilterStore } from "@/types/useStoreTypes";
import { create } from "zustand";
import { getInquiries, updateInquiryPhase, updateInquiryNotes } from "./services";

// modal store
export const useModalStore = create<UsemodalTypes>((set) => ({
  isOpen: false,
  selectedInquiryId: null,
  closeModal: () => set({ isOpen: false, selectedInquiryId: null }),
  openModal: (inquiryId: string) => set({ isOpen: true, selectedInquiryId: inquiryId }),
}));


//inquiries fetching,loading state
export const useInquiryStore = create<UseInquiryStore>((set) => ({
  inquiries: [],
  isLoading: false,

  fetchingInquiries: async () => {
    set({ isLoading: true });
    try {
      const data = await getInquiries();
      set({ inquiries: data, isLoading: false });
    } catch (err) {
      console.log(err);
    } finally {
      set({ isLoading: false });
    }
  },

  updateInquiryPhase: async (id: string, phase: InquiryPhase) => {
    const previousInquiries = useInquiryStore.getState().inquiries;
    
    set((state) => ({
      inquiries: state.inquiries.map((inquiry) =>
        inquiry.id === id
          ? { ...inquiry, phase, updatedAt: new Date().toISOString() }
          : inquiry
      ),
    }));

    try {
      await updateInquiryPhase(id, phase);
    } catch (err) {
      console.log(err);
      set({ inquiries: previousInquiries });
    }
  },

  updateInquiryNotes: async (id: string, notes: string) => {
    const previousInquiries = useInquiryStore.getState().inquiries;
    
    set((state) => ({
      inquiries: state.inquiries.map((inquiry) =>
        inquiry.id === id
          ? { ...inquiry, notes, updatedAt: new Date().toISOString() }
          : inquiry
      ),
    }));

    try {
      await updateInquiryNotes(id, notes);
     //   set({ inquiries: previousInquiries });
    } catch (err) {
      console.log(err);
      set({ inquiries: previousInquiries });
    }
  },
}));

// note update text area

export const useNoteStore = create<UseNoteStore>((set)=>({
  note:"",
  setNote:(note:string)=>set({note})
}));

// filter store
export const useFilterStore = create<UseFilterStore>((set, get) => ({
  searchQuery: "",
  dateFrom: null,
  dateTo: null,
  minValue: 0,
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  setDateFrom: (date: string | null) => set({ dateFrom: date }),
  setDateTo: (date: string | null) => set({ dateTo: date }),
  setMinValue: (value: number) => set({ minValue: value }),
  clearFilters: () => set({ searchQuery: "", dateFrom: null, dateTo: null, minValue: 0 }),
  getActiveFilterCount: () => {
    const state = get();
    let count = 0;
    if (state.searchQuery) count++;
    if (state.dateFrom || state.dateTo) count++;
    if (state.minValue > 0) count++;
    return count;
  },
}));
