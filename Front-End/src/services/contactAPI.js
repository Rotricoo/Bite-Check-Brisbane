const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export async function createContactMessage(contactData) {
  const response = await fetch(`${API_BASE_URL}/CreateContact.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contactData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to send message");
  }

  return result;
}
