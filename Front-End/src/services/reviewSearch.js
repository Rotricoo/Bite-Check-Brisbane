function normalizeText(text) {
  return text.toString().trim().toLowerCase();
}

function getSearchableText(review) {
  return [
    review.restaurantName,
    review.category,
    review.cuisine,
    review.location,
    review.priceRange,
    review.description,
    ...(review.keywords || []),
    ...(review.tags || []),
  ]
    .join(" ")
    .toLowerCase();
}

function sortByRating(reviews) {
  return [...reviews].sort((a, b) => b.rating - a.rating);
}

function sortByDateNewest(reviews) {
  return [...reviews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function sortByDateOldest(reviews) {
  return [...reviews].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
}

function sortReviews(reviews, sortMode) {
  if (sortMode === "oldest") {
    return sortByDateOldest(reviews);
  }

  if (sortMode === "highest-rated") {
    return sortByRating(reviews);
  }

  if (sortMode === "lowest-rated") {
    return [...reviews].sort((a, b) => a.rating - b.rating);
  }

  return sortByDateNewest(reviews);
}

function excludeExistingReviews(reviews, existingReviews) {
  const existingIds = existingReviews.map((review) => review.id);

  return reviews.filter((review) => {
    return !existingIds.includes(review.id);
  });
}

function getSimilarReviews(reviews, directMatches) {
  const relatedCategories = directMatches.map((review) => review.category);
  const relatedCuisines = directMatches.map((review) => review.cuisine);

  const reviewsNotAlreadyUsed = excludeExistingReviews(reviews, directMatches);

  return reviewsNotAlreadyUsed.filter((review) => {
    return relatedCategories.includes(review.category) || relatedCuisines.includes(review.cuisine);
  });
}

export function getTopRatedSearchResults(reviews, searchTerm, limit = 3) {
  const query = normalizeText(searchTerm);

  if (!query) {
    return {
      results: getLatestReviews(reviews, limit),
      message: "Latest reviews from our blog",
      hasFallback: false,
    };
  }

  const directMatches = reviews.filter((review) => {
    return getSearchableText(review).includes(query);
  });

  const sortedDirectMatches = sortByRating(directMatches);

  const similarMatches = getSimilarReviews(reviews, directMatches);
  const sortedSimilarMatches = sortByRating(similarMatches);
  const combinedResults = [...sortedDirectMatches, ...sortedSimilarMatches].slice(0, limit);
  const hasFallback = sortedDirectMatches.length < combinedResults.length;

  if (combinedResults.length === 0) {
    return {
      results: getLatestReviews(reviews, limit),
      message: `No exact results for "${searchTerm}" yet. Here are our latest reviews instead.`,
      hasFallback: true,
    };
  }

  return {
    results: combinedResults,
    message: hasFallback
      ? `Top rated results for "${searchTerm}", with similar ${sortedDirectMatches[0]?.category || "food"} picks`
      : `Top rated results for "${searchTerm}"`,
    hasFallback,
  };
}

export function getLatestReviews(reviews, limit = 3) {
  return [...reviews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, limit);
}

export function getFilteredReviews(reviews, searchTerm, sortMode = "newest", categoryFilter = "all", priceFilter = "all", cuisineFilter = "all") {
  const query = normalizeText(searchTerm);

  const matchingReviews = reviews.filter((review) => {
    const matchesSearch = !query || getSearchableText(review).includes(query);
    const matchesCategory = categoryFilter === "all" || review.category === categoryFilter;
    const matchesPrice = priceFilter === "all" || review.priceRange === priceFilter;
    const matchesCuisine = cuisineFilter === "all" || review.cuisine === cuisineFilter;

    return matchesSearch && matchesCategory && matchesPrice && matchesCuisine;
  });

  return sortReviews(matchingReviews, sortMode);
}
