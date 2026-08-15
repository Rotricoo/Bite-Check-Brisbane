import { mockReviews } from "../data/mockReview.js";

const API_BASE_URL = "http://localhost:8000";
const ALL_REVIEWS_ENDPOINT = `${API_BASE_URL}/AllReviews.php`;

export async function getReviews() {
  try {
    const response = await fetch(ALL_REVIEWS_ENDPOINT);

    if (!response.ok) {
      throw new Error("Failed to load reviews from backend");
    }

    const apiReviews = await response.json();

    return apiReviews.map(mapApiReviewToReview);
  } catch (error) {
    console.warn("Using mock reviews because the backend is not available yet.", error);
    return mockReviews;
  }
}

function createSlug(text, id) {
  return `${text || "review"}-${id}`
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function findMockFallback(apiReview) {
  return mockReviews.find((review) => {
    return review.restaurantName.toLowerCase() === apiReview.title?.toLowerCase();
  });
}

function parseList(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function getImageUrl(imagePath, fallbackImage) {
  if (!imagePath) {
    return fallbackImage;
  }

  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  if (imagePath.startsWith("/")) {
    return `${API_BASE_URL}${imagePath}`;
  }

  return fallbackImage;
}

function mapApiReviewToReview(apiReview) {
  const mockFallback = findMockFallback(apiReview);
  const restaurantName = apiReview.restaurantName || apiReview.restaurant_name || apiReview.title || mockFallback?.restaurantName || "Untitled review";

  return {
    id: Number(apiReview.id || apiReview.id_review || mockFallback?.id),
    restaurantName,
    category: apiReview.category || mockFallback?.category || "Restaurant",
    cuisine: apiReview.cuisine || mockFallback?.cuisine || "General",
    location: apiReview.location || mockFallback?.location || "Brisbane",
    rating: Number(apiReview.rating || mockFallback?.rating || 0),
    priceRange: apiReview.priceRange || apiReview.price_range || mockFallback?.priceRange || "$$",
    description: apiReview.description || apiReview.summary || apiReview.review || mockFallback?.description || "",
    createdAt: apiReview.createdAt || apiReview.created_at || mockFallback?.createdAt || new Date().toISOString().slice(0, 10),
    keywords: parseList(apiReview.keywords || mockFallback?.keywords),
    tags: parseList(apiReview.tags || mockFallback?.tags),
    slug: apiReview.slug || mockFallback?.slug || createSlug(restaurantName, apiReview.id || apiReview.id_review),
    image: getImageUrl(apiReview.photo || apiReview.image || apiReview.image_url, mockFallback?.image || mockReviews[0].image),
    imagePosition: apiReview.imagePosition || apiReview.image_position || mockFallback?.imagePosition || "center",
  };
}
