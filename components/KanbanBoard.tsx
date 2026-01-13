"use client";
import Header from "@/components/Header";
import { useInquiryStore } from "@/lib/useStore";
import { useEffect, useRef } from "react";
import { COLUMNS } from "../constants/constants";
import Column from "./ui/Column";
import InquiryModal from "./ui/InquiryModal";
export default function Home() {
  const fetchingInquiries = useInquiryStore((state) => state.fetchingInquiries);
  const isLoading = useInquiryStore((state) => state.isLoading);
  const inquiries = useInquiryStore((state) => state.inquiries);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      fetchingInquiries();
      hasFetched.current = true;
    }
  }, [fetchingInquiries]);
  return (
    <div className="w-full min-h-screen bg-gray-900 flex justify-center items-start ">
      <main className="min-w-3xl max-w-screen-3xl bg-gradient-to-r from-purple-700 to-pink-500 min-h-screen p-6 shadow-2xl flex flex-col">
        <header>
          <Header />
        </header>
        <section>
          <span> aq iqneba filtraciis funqciebi</span>
        </section>
        <section className="flex justify-between overflow-x-auto gap-4">{COLUMNS.map((column) => (
          <Column 
            key={column.id} 
            title={column.title} 
            inquiries={inquiries.filter((inquiry) => inquiry.phase === column.id)} 
            bgColor={column.bgColor}
          />
        ))}</section>
      </main>
      <InquiryModal />
    </div>
  );
}
