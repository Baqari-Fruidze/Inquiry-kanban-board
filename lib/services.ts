export async function getInquiries() {
  const res = await fetch("/api/inquiries");
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

export async function updateInquiryPhase(id: string, phase: string) {
  const res = await fetch(`/api/inquiries/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phase }),
  });
  if (!res.ok) throw new Error("Failed to update inquiry");
  return res.json();
}

export async function updateInquiryNotes(id: string, notes: string) {
  const res = await fetch(`/api/inquiries/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ notes }),
  });
  if (!res.ok) throw new Error("Failed to update notes");
  return res.json();
}
