import { UseInquiryStore, InquiryPhase } from "@/types/inquiryTypes";
import { UsemodalTypes } from "@/types/useStoreTypes";
import { create } from "zustand";
import { getInquiries, updateInquiryPhase, updateInquiryNotes } from "./services";
import { UseNoteStore } from "@/types/useStoreTypes";

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
} ))

