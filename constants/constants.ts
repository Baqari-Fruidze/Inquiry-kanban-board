// The 4 columns exactly as required
export const COLUMNS = [
  { id: "new", title: "New", bgColor: "bg-purple-100" },
  { id: "sent_to_hotels", title: "Sent to Hotels", bgColor: "bg-yellow-100" },
  { id: "offers_received", title: "Offers Received", bgColor: "bg-green-100" },
  { id: "completed", title: "Completed", bgColor: "bg-blue-100" },
];

export const PHASE_COLORS: Record<string, string> = {
  new: "bg-purple-500",
  sent_to_hotels: "bg-yellow-500",
  offers_received: "bg-green-500",
  completed: "bg-blue-500",
};
