const API_BASE_URL = "http://localhost:8000";

export async function loginAdmin(email, password) {
  const adminEmail = "admin@bitecheck.com";
  const adminPassword = "bitecheck123";

  return email === adminEmail && password === adminPassword;
}

export async function createReview(formData) {
  const response = await fetch(`${API_BASE_URL}/CreateReview.php`, {
    method: "POST",
    body: formData,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to create review");
  }

  return result;
}

export async function updateReview(reviewId, reviewData) {
  const response = await fetch(`${API_BASE_URL}/UpdateReview.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: reviewId,
      ...reviewData,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to update review");
  }

  return result;
}

export async function deleteReview(reviewId) {
  const response = await fetch(`${API_BASE_URL}/DeleteReview.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: reviewId }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to delete review");
  }

  return result;
}
