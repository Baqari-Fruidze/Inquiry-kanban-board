"use client";
import { useModalStore, useInquiryStore, useNoteStore } from "@/lib/useStore";
import { X, Calendar, Users, DollarSign, Building2, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { COLUMNS } from "@/constants/constants";
import { useEffect } from "react";
import { countDayDifference } from "@/lib/utils";
import { InquiryPhase } from "@/types/inquiryTypes";

export default function InquiryModal() {
  const isOpen = useModalStore((state) => state.isOpen);
  const selectedInquiryId = useModalStore((state) => state.selectedInquiryId);
  const closeModal = useModalStore((state) => state.closeModal);
  const selectedInquiry = useInquiryStore((state) => 
    state.inquiries.find((inq) => inq.id === selectedInquiryId)
  );
  const updateInquiryPhase = useInquiryStore((state) => state.updateInquiryPhase);
  const updateInquiryNotes = useInquiryStore((state) => state.updateInquiryNotes);
  const note = useNoteStore((state) => state.note);
  const setNote = useNoteStore((state) => state.setNote);

  const handlePhaseChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (selectedInquiry) {
      await updateInquiryPhase(selectedInquiry.id, e.target.value as InquiryPhase);
    }
  };

  const handleNoteBlur = async () => {
    if (selectedInquiry && note !== selectedInquiry.notes) {
      await updateInquiryNotes(selectedInquiry.id, note);
    }
  };

  useEffect(() => {
    if (selectedInquiry) {
      setNote(selectedInquiry.notes);
    }
  }, [selectedInquiry, setNote]);

  if (!isOpen || !selectedInquiry) return null;

  return (
    <>
      <div className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedInquiry.clientName}
          </h2>
          <button
            onClick={closeModal}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Phase
            </label>
            <select
              value={selectedInquiry.phase}
              onChange={handlePhaseChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {COLUMNS.map((column) => (
                <option key={column.id} value={column.id}>
                  {column.title}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Event Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <Calendar className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Event Date</p>
                  <p className="font-medium text-gray-900">
                    {formatDate(selectedInquiry.eventDate)}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Users className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Guest Count</p>
                  <p className="font-medium text-gray-900">
                    {selectedInquiry.guestCount.toLocaleString()} guests
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <DollarSign className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Potential Value</p>
                  <p className="font-medium text-gray-900">
                    ${selectedInquiry.potentialValue.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Building2 className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Event Type</p>
                  <p className="font-medium text-gray-900">
                    {selectedInquiry.eventType}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-sm text-gray-500">Contact Person</p>
              <p className="font-medium text-gray-900">
                {selectedInquiry.contactPerson}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">
              Associated Hotels
            </h3>
            {selectedInquiry.hotels.length > 0 ? (
              <ul className="space-y-2">
                {selectedInquiry.hotels.map((hotel, index) => (
                  <li
                    key={index}
                    className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg"
                  >
                    <Building2 className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-900">{hotel}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No hotels assigned yet</p>
            )}
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Notes</h3>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              onBlur={handleNoteBlur}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={6}
              placeholder="Add notes about this inquiry..."
            />
          </div>

          <div className="border-t border-gray-200 pt-4 space-y-2">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>
                Created: {formatDate(selectedInquiry.createdAt)}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>
                Last Updated: {countDayDifference(selectedInquiry.updatedAt)} days ago
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
