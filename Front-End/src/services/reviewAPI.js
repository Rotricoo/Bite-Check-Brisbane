// Later this file will fetch reviews from the PHP/MySQL backend.
// For now, AllReviews uses mockReviews from src/data/mockReview.js.
// The backend should return reviews using the same field names expected by the frontend,
// or this file should map API fields into the frontend review shape.

import { mockReviews } from "../data/mockReview.js";

// Expected frontend review shape:
// {
//   id: number,
//   restaurantName: string,
//   category: string,
//   cuisine: string,
//   location: string,
//   rating: number,
//   priceRange: string,
//   description: string,
//   createdAt: string, // ISO format: YYYY-MM-DD
//   keywords: string[],
//   tags: string[],
//   slug: string,
//   image: string,
//   imagePosition: string,
// }

// This file is the future access point for review data.
// For now, it returns mockReviews so the frontend can keep working before the PHP/MySQL backend is ready.
//
// Later, Henrique can replace this mock return with a fetch call to the backend API.
// Keeping that logic here prevents pages like AllReviews.jsx from needing to know
// whether the data came from mock data, PHP, MySQL, or another source.

export async function getReviews() {
  return mockReviews;
}

// Future example:
//
// export async function getReviews() {
//   const response = await fetch("/api/reviews.php");
//
//   if (!response.ok) {
//     throw new Error("Failed to load reviews");
//   }
//
//   const apiReviews = await response.json();
//   return apiReviews.map(mapApiReviewToReview);
// }

// This adapter can be used if the backend returns snake_case fields.
// function mapApiReviewToReview(apiReview) {
//   return {
//     id: apiReview.id,
//     restaurantName: apiReview.restaurant_name,
//     category: apiReview.category,
//     cuisine: apiReview.cuisine,
//     location: apiReview.location,
//     rating: Number(apiReview.rating),
//     priceRange: apiReview.price_range,
//     description: apiReview.description,
//     createdAt: apiReview.created_at,
//     keywords: apiReview.keywords || [],
//     tags: apiReview.tags || [],
//     slug: apiReview.slug,
//     image: apiReview.image_url,
//     imagePosition: apiReview.image_position || "center",
//   };
// }
