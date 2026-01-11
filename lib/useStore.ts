import { Inquiry } from "@/types/inquiryTypes";
import { UsemodalTypes } from "@/types/useStoreTypes";
import { create } from "zustand";

export const useModalStore = create<UsemodalTypes>((set) => ({
  isOpen: false,
  closeModal: () => set({ isOpen: false }),
  openModal: () => set({ isOpen: true }),
}));

export const useInquiryStore = create<Inquiry[]>((set) => ({
  inquiries: [],
}));
