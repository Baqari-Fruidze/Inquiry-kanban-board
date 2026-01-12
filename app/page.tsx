"use client";
import Header from "@/components/Header";
import KanbanBoard from "@/components/KanbanBoard";
import { useInquiryStore } from "@/lib/useStore";
import { useEffect } from "react";

export default function Home() {
  return <KanbanBoard />;
}
