export async function getInquiries() {
  const res = await fetch("/api/inquiries");
  if (!res.ok) throw new Error("Failed to fetch");
  res.json();
}
