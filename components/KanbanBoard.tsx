"use client";
import Header from "@/components/Header";
import { useInquiryStore, useFilterStore } from "@/lib/useStore";
import { useEffect, useRef, useMemo } from "react";
import { COLUMNS } from "../constants/constants";
import Column from "./ui/Column";
import InquiryModal from "./ui/InquiryModal";
import FilterBar from "./ui/FilterBar";
import { useSearchParams, useRouter } from "next/navigation";

export default function Home() {
  const fetchingInquiries = useInquiryStore((state) => state.fetchingInquiries);
  const isLoading = useInquiryStore((state) => state.isLoading);
  const inquiries = useInquiryStore((state) => state.inquiries);
  const hasFetched = useRef(false);

  const searchQuery = useFilterStore((state) => state.searchQuery);
  const dateFrom = useFilterStore((state) => state.dateFrom);
  const dateTo = useFilterStore((state) => state.dateTo);
  const minValue = useFilterStore((state) => state.minValue);
  const setSearchQuery = useFilterStore((state) => state.setSearchQuery);
  const setDateFrom = useFilterStore((state) => state.setDateFrom);
  const setDateTo = useFilterStore((state) => state.setDateTo);
  const setMinValue = useFilterStore((state) => state.setMinValue);

  const searchParams = useSearchParams();
  const router = useRouter();
  const initializedFromUrl = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      fetchingInquiries();
      hasFetched.current = true;
    }
  }, [fetchingInquiries]);

  // Initialize filters from URL on mount
  useEffect(() => {
    if (!initializedFromUrl.current) {
      const search = searchParams.get("search");
      const from = searchParams.get("from");
      const to = searchParams.get("to");
      const min = searchParams.get("min");

      if (search) setSearchQuery(search);
      if (from) setDateFrom(from);
      if (to) setDateTo(to);
      if (min) setMinValue(Number(min));

      initializedFromUrl.current = true;
    }
  }, [searchParams, setSearchQuery, setDateFrom, setDateTo, setMinValue]);

  // Sync filters to URL
  useEffect(() => {
    if (!initializedFromUrl.current) return;

    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (dateFrom) params.set("from", dateFrom);
    if (dateTo) params.set("to", dateTo);
    if (minValue > 0) params.set("min", String(minValue));

    const queryString = params.toString();
    const newUrl = queryString ? `?${queryString}` : window.location.pathname;
    router.replace(newUrl, { scroll: false });
  }, [searchQuery, dateFrom, dateTo, minValue, router]);

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inquiry) => {
      // Search by client name (case-insensitive)
      if (searchQuery && !inquiry.clientName.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      // Date range filter (by event date)
      if (dateFrom && inquiry.eventDate < dateFrom) {
        return false;
      }
      if (dateTo && inquiry.eventDate > dateTo) {
        return false;
      }
      // Minimum value filter
      if (minValue > 0 && inquiry.potentialValue < minValue) {
        return false;
      }
      return true;
    });
  }, [inquiries, searchQuery, dateFrom, dateTo, minValue]);

  return (
    <div className="w-full min-h-screen bg-gray-900 flex justify-center items-start ">
      <main className="min-w-3xl max-w-screen-3xl bg-gradient-to-r from-purple-700 to-pink-500 min-h-screen p-6 shadow-2xl flex flex-col">
        <header>
          <Header />
        </header>
        <section>
          <FilterBar />
        </section>
        <section className="flex justify-between overflow-x-auto gap-4">{COLUMNS.map((column) => (
          <Column 
            key={column.id} 
            title={column.title} 
            inquiries={filteredInquiries.filter((inquiry) => inquiry.phase === column.id)} 
            bgColor={column.bgColor}
          />
        ))}</section>
      </main>
      <InquiryModal />
    </div>
  );
}
