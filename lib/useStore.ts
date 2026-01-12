import { Inquiry, UseInquiryStore } from "@/types/inquiryTypes";
import { UsemodalTypes } from "@/types/useStoreTypes";
import { create } from "zustand";
import { getInquiries } from "./services";

export const useModalStore = create<UsemodalTypes>((set) => ({
  isOpen: false,
  closeModal: () => set({ isOpen: false }),
  openModal: () => set({ isOpen: true }),
}));

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
}));
