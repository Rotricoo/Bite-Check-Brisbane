import "./AllReviews.scss";
import { useMemo, useState } from "react";

// Import components
import ReviewCard from "./reviewCard/ReviewCard";
import { mockReviews } from "../../data/mockReview.js";
import { getFilteredReviews, getTopRatedSearchResults } from "../../services/reviewSearch.js";
import FilterGroup from "./filterGroup/FilterGroup";

// Import images and videos
import allreviewsHeroBackground from "../../assets/img/allreviews-bg--header.jpg";

function AllReviews() {
  const [draftSearch, setDraftSearch] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(3);
  const [viewMode, setViewMode] = useState("list");
  const [sortMode, setSortMode] = useState("newest");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [cuisineFilter, setCuisineFilter] = useState("all");

  function handleSearchSubmit(event) {
    event.preventDefault();
    setActiveSearch(draftSearch.trim());
    setVisibleCount(3);
  }

  function handleClearSearch() {
    setDraftSearch("");
    setActiveSearch("");
    setVisibleCount(3);
  }

  function handleCategoryFilterChange(category) {
    setCategoryFilter(category);
    setVisibleCount(3);
  }

  function handlePriceFilterChange(priceRange) {
    setPriceFilter(priceRange);
    setVisibleCount(3);
  }

  function handleCuisineFilterChange(cuisine) {
    setCuisineFilter(cuisine);
    setVisibleCount(3);
  }

  function handleClearFilters() {
    setCategoryFilter("all");
    setPriceFilter("all");
    setCuisineFilter("all");
    setVisibleCount(3);
  }

  function handleClearAll() {
    setDraftSearch("");
    setActiveSearch("");
    setCategoryFilter("all");
    setCuisineFilter("all");
    setPriceFilter("all");
    setVisibleCount(3);
  }

  //Frontend-only filtering for now.
  // Later this can be replaced by a PHP API call that returns reviews from MySQL.
  const filteredReviews = useMemo(() => {
    return getFilteredReviews(mockReviews, activeSearch, sortMode, categoryFilter, priceFilter, cuisineFilter);
  }, [activeSearch, sortMode, categoryFilter, priceFilter, cuisineFilter]);

  const heroSearch = useMemo(() => {
    return getTopRatedSearchResults(mockReviews, activeSearch, 3);
  }, [activeSearch]);

  const heroResults = heroSearch.results;
  const heroSearchMessage = heroSearch.message;

  const visibleReviews = filteredReviews.slice(0, visibleCount);
  const hasMoreReviews = visibleCount < filteredReviews.length;
  const hasVisibleReviews = visibleReviews.length > 0;
  const hasActiveFilters = categoryFilter !== "all" || priceFilter !== "all" || cuisineFilter !== "all";
  const hasActiveSearchOrFilters = activeSearch || hasActiveFilters;

  const categoryOptions = useMemo(() => {
    const categories = mockReviews.map((review) => review.category);
    return ["all", ...new Set(categories)];
  }, []);

  const priceOptions = useMemo(() => {
    const prices = mockReviews.map((review) => review.priceRange);
    return ["all", ...new Set(prices)];
  }, []);

  const cuisineOptions = useMemo(() => {
    const cuisines = mockReviews.map((review) => review.cuisine);
    return ["all", ...new Set(cuisines)];
  }, []);

  return (
    <div className="all-reviews">
      <div className="all-reviews__hero">
        <div className="all-reviews__hero--container">
          <div className="all-reviews__hero--background">
            <img src={allreviewsHeroBackground} alt="Background" className="all-reviews__hero--background--image" />
          </div>

          <div className="all-reviews__hero--search--container">
            <form className="all-reviews__hero--search--content" onSubmit={handleSearchSubmit}>
              <h2 className="all-reviews__hero--search--title">Search by restaurant, suburb, cuisine, or tag...</h2>
              <div className="all-reviews__hero--search--input-container">
                <div className="all-reviews__hero--search--input-wrapper">
                  <input
                    type="text"
                    value={draftSearch}
                    onChange={(event) => setDraftSearch(event.target.value)}
                    placeholder="Search reviews..."
                    className="all-reviews__hero--search--input"
                  />

                  {draftSearch && (
                    <button type="button" className="all-reviews__hero--search--clear-button" onClick={handleClearSearch} aria-label="Clear search">
                      ×
                    </button>
                  )}
                </div>

                <button type="submit" className="all-reviews__hero--search--button">
                  Search
                </button>
              </div>
              <p className="all-reviews__hero--search--feedback">{heroSearchMessage}</p>
            </form>
            <div className="all-reviews__hero--search--cards-container">
              {heroResults.map((review) => (
                <ReviewCard key={review.id} review={review} variant="hero" />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="all-reviews__content">
        <div className="all-reviews__content--cards">
          <div className="all-reviews__content--cards--filters">
            <label htmlFor="sort-select" className="all-reviews__content--cards--label">
              <select id="sort-select" className="all-reviews__content--cards--select" value={sortMode} onChange={(event) => setSortMode(event.target.value)}>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="highest-rated">Highest Rated</option>
                <option value="lowest-rated">Lowest Rated</option>
              </select>
            </label>
            <label htmlFor="view-select" className="all-reviews__content--cards--label">
              <select id="view-select" className="all-reviews__content--cards--select" value={viewMode} onChange={(event) => setViewMode(event.target.value)}>
                <option value="list">List</option>
                <option value="grid">Grid</option>
              </select>
            </label>
          </div>
          {hasVisibleReviews ? (
            <div className={`all-reviews__content--cards-container is-${viewMode}`}>
              {visibleReviews.map((review) => (
                <ReviewCard key={review.id} review={review} variant={viewMode} />
              ))}
            </div>
          ) : (
            <div className="all-reviews__content--cards--empty">
              <p>No reviews match these filters yet.</p>
              {hasActiveSearchOrFilters && (
                <button type="button" className="all-reviews__content--cards--empty-button" onClick={handleClearAll}>
                  Clear all
                </button>
              )}
            </div>
          )}
          {hasMoreReviews && (
            <div className="all-reviews__content--cards--load-more-container">
              <button className="all-reviews__content--cards--button" onClick={() => setVisibleCount((currentCount) => currentCount + 3)}>
                Load more
              </button>
            </div>
          )}
        </div>

        <div className="all-reviews__content--sidebar">
          <div className="all-reviews__content--sidebar--filter">
            <div className="all-reviews__content--sidebar--filter--header">
              <div>
                <p className="all-reviews__content--sidebar--filter--title">Filters</p>
                <p className="all-reviews__content--sidebar--filter--count">{filteredReviews.length} results</p>
              </div>

              {hasActiveFilters && (
                <button className="all-reviews__content--sidebar--filter--clear" onClick={handleClearFilters}>
                  Clear
                </button>
              )}
            </div>
            <FilterGroup
              title="Category"
              options={categoryOptions}
              activeOption={categoryFilter}
              getLabel={(category) => (category === "all" ? "All" : category)}
              onChange={handleCategoryFilterChange}
            />

            <FilterGroup
              title="Cuisine"
              options={cuisineOptions}
              activeOption={cuisineFilter}
              getLabel={(cuisine) => (cuisine === "all" ? "All cuisines" : cuisine)}
              onChange={handleCuisineFilterChange}
            />
            <FilterGroup
              title="Price"
              options={priceOptions}
              activeOption={priceFilter}
              getLabel={(priceRange) => (priceRange === "all" ? "All prices" : priceRange)}
              onChange={handlePriceFilterChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllReviews;
