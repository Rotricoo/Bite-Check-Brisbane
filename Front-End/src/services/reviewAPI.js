const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
const ALL_REVIEWS_ENDPOINT = `${API_BASE_URL}/AllReviews.php`;

export async function getReviews() {
  const response = await fetch(ALL_REVIEWS_ENDPOINT);

  if (!response.ok) {
    throw new Error("Failed to load reviews from backend");
  }

  const apiReviews = await response.json();
  return apiReviews.map(mapApiReviewToReview);
}

function createSlug(text, id) {
  return `${text || "review"}-${id}`
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
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

function getImageUrl(imagePath) {
  if (!imagePath) {
    return "";
  }

  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  if (imagePath.startsWith("/")) {
    return `${API_BASE_URL}${imagePath}`;
  }

  return `${API_BASE_URL}/uploads/reviews/${imagePath}`;
}

function mapApiReviewToReview(apiReview) {
  const restaurantName = apiReview.restaurantName || apiReview.restaurant_name || apiReview.title || "Untitled review";

  return {
    id: Number(apiReview.id || apiReview.id_review),
    restaurantName,
    category: apiReview.category || "Restaurant",
    cuisine: apiReview.cuisine || "General",
    location: apiReview.location || "Brisbane",
    rating: Number(apiReview.rating || 0),
    priceRange: apiReview.priceRange || apiReview.price_range || "$$",
    description: apiReview.description || apiReview.summary || apiReview.review || "",
    intro: apiReview.intro || apiReview.summary || apiReview.review || "",
    createdAt: apiReview.createdAt || apiReview.created_at || new Date().toISOString().slice(0, 10),
    keywords: parseList(apiReview.keywords),
    tags: parseList(apiReview.tags),
    slug: apiReview.slug || createSlug(restaurantName, apiReview.id || apiReview.id_review),
    image: getImageUrl(apiReview.photo || apiReview.image || apiReview.image_url),
    imagePosition: apiReview.imagePosition || apiReview.image_position || "center",
    address: apiReview.address || "",
    websiteUrl: apiReview.websiteUrl || apiReview.website_url || "",
    instagramUrl: apiReview.instagramUrl || apiReview.instagram_url || "",
    reviewers: [
      {
        name: "Henrique",
        rating: Number(apiReview.henrique_rating || 0),
        amountSpent: apiReview.henrique_amount_spent,
        spentDetails: apiReview.henrique_spent_details,
        reviewTitle: apiReview.henrique_review_title,
        reviewBody: apiReview.henrique_review_body,
      },
      {
        name: "Rodrigo",
        rating: Number(apiReview.rodrigo_rating || 0),
        amountSpent: apiReview.rodrigo_amount_spent,
        spentDetails: apiReview.rodrigo_spent_details,
        reviewTitle: apiReview.rodrigo_review_title,
        reviewBody: apiReview.rodrigo_review_body,
      },
    ].filter((reviewer) => reviewer.reviewTitle || reviewer.reviewBody),
  };
}
