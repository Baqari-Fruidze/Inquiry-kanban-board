"use client";
import Header from "@/components/Header";
import { useInquiryStore } from "@/lib/useStore";
import { useEffect } from "react";
import { COLUMNS } from "../constants/constants";
import Column from "./ui/Column";

export default function Home() {
  const fetchingInquiries = useInquiryStore((state) => state.fetchingInquiries);
  const isLoading = useInquiryStore((state) => state.isLoading);
  const inquiries = useInquiryStore((state) => state.inquiries);
  useEffect(() => {
    fetchingInquiries();
  }, []);
  return (
    <div className="w-full min-h-screen bg-gray-900 flex justify-center items-start ">
      <main className="min-w-3xl max-w-screen-2xl bg-gradient-to-r from-purple-700 to-pink-500 min-h-screen p-6 shadow-2xl flex flex-col">
        <header>
          <Header />
        </header>
        <section>
          <span> aq iqneba filtraciis funqciebi</span>
        </section>
        <section>{COLUMNS.map((column) => (
          <Column key={column.id} title={column.title} inquiries={inquiries.filter((inquiry) => inquiry.phase === column.id)} />
        ))}</section>
      </main>
    </div>
  );
}
