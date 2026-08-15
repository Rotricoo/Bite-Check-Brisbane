// Later this file will connect the admin tools to the PHP/MySQL backend.
// For now, these functions are placeholders so the admin UI can be built
// without mixing backend fetch logic inside React components.

// Expected future backend actions:
// - Login admin user
// - Create a new review post
// - Update an existing review post
// - Delete a review post

export async function loginAdmin(email, password) {
  const adminEmail = "admin@bitecheck.com";
  const adminPassword = "bitecheck123";

  return email === adminEmail && password === adminPassword;
}

export async function createReview(reviewData) {
  console.log("Create review placeholder:", reviewData);
  return {
    success: true,
    message: "Review create placeholder completed.",
  };
}

export async function updateReview(reviewId, reviewData) {
  console.log("Update review placeholder:", reviewId, reviewData);
  return {
    success: true,
    message: "Review update placeholder completed.",
  };
}

export async function deleteReview(reviewId) {
  console.log("Delete review placeholder:", reviewId);
  return {
    success: true,
    message: "Review delete placeholder completed.",
  };
}

// Future PHP/MySQL examples:
//
// export async function loginAdmin(email, password) {
//   const response = await fetch("/api/admin-login.php", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email, password }),
//   });
//
//   if (!response.ok) {
//     throw new Error("Failed to login admin user");
//   }
//
//   return response.json();
// }
