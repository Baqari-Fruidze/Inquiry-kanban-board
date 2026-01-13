"use client";
import { useFilterStore } from "@/lib/useStore";
import { Search, X, Calendar, DollarSign } from "lucide-react";
import { useState, useEffect } from "react";

export default function FilterBar() {
  const searchQuery = useFilterStore((state) => state.searchQuery);
  const dateFrom = useFilterStore((state) => state.dateFrom);
  const dateTo = useFilterStore((state) => state.dateTo);
  const minValue = useFilterStore((state) => state.minValue);
  const setSearchQuery = useFilterStore((state) => state.setSearchQuery);
  const setDateFrom = useFilterStore((state) => state.setDateFrom);
  const setDateTo = useFilterStore((state) => state.setDateTo);
  const setMinValue = useFilterStore((state) => state.setMinValue);
  const clearFilters = useFilterStore((state) => state.clearFilters);
 const count = useFilterStore((state) => state.count);

  const [localSearch, setLocalSearch] = useState(searchQuery);
 

  // Sync localSearch when searchQuery changes externally (from URL)
  // useEffect(() => {
  //   setLocalSearch(searchQuery);
  // }, [searchQuery]);

  //   useEffect(() => {
  //   if (localSearch === searchQuery) return;
  //   setTimeout(() => {
  //     setSearchQuery(localSearch);
  //   }, 300);
   
  // }, [localSearch, searchQuery, setSearchQuery]);

  // const handleClearFilters = () => {
  //   setLocalSearch("");
  //   clearFilters();
  // };  

 //    works because of timer reset  

 //    
  useEffect(() => {
    if (localSearch === searchQuery) return;
    const timer = setTimeout(() => {
      setSearchQuery(localSearch);
    }, 300);
    return () => clearTimeout(timer);
  }, [localSearch, searchQuery, setSearchQuery]);

  const handleClearFilters = () => {
    setLocalSearch("");
    clearFilters();
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg mb-4">
      <div className="flex flex-wrap items-center gap-4">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search by client name..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Date Range */}
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <input
            type="date"
            value={dateFrom || ""}
            onChange={(e) => setDateFrom(e.target.value || null)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
          />
          <span className="text-gray-500">to</span>
          <input
            type="date"
            value={dateTo || ""}
            onChange={(e) => setDateTo(e.target.value || null)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
          />
        </div>

        {/* Min Value Input */}
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-gray-500" />
          <input
            type="number"
            value={minValue || ""}
            onChange={(e) => setMinValue(Number(e.target.value) || 0)}
            placeholder="Min value"
            className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
          />
        </div>

        {/* Clear Filters Button */}
        <button
          onClick={handleClearFilters}
          disabled={count  === 0}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
          Clear
          {count > 0 && (
            <span className="bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full">
              {count}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
