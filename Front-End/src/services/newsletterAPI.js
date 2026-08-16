const API_BASE_URL = "http://localhost:8000";

export async function subscribeToNewsletter(email) {
  const response = await fetch(`${API_BASE_URL}/CreateNewsletterSubscriber.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to subscribe to newsletter");
  }

  return result;
}
