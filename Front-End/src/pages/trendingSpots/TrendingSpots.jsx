import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getReviews } from "../../services/reviewAPI.js";
import ReviewCard from "../allReviews/reviewCard/ReviewCard.jsx";
import "./TrendingSpots.scss";

function TrendingSpots() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadReviews() {
      const loadedReviews = await getReviews();
      setReviews(loadedReviews);
      setIsLoading(false);
    }

    loadReviews();
  }, []);

  const trendingReviews = reviews.filter((review) => review.tags?.includes("trending"));
  return (
    <main className="trending-spots">
      <section className="trending-spots__hero">
        <p className="trending-spots__eyebrow">Trending spots</p>
        <h1 className="trending-spots__title">Places people are talking about</h1>
        <p className="trending-spots__intro">A quick collection of Bite Check reviews tagged as trending around Brisbane.</p>
      </section>

      <section className="trending-spots__reviews">
        {isLoading && <p className="trending-spots__status">Loading trending spots...</p>}

        {!isLoading && trendingReviews.length === 0 && <p className="trending-spots__status">No trending spots have been added yet.</p>}

        {trendingReviews.map((review) => (
          <ReviewCard key={review.id} review={review} variant="grid" />
        ))}
      </section>

      <section className="trending-spots__cta">
        <div className="trending-spots__cta-copy">
          <p className="trending-spots__cta-eyebrow">Keep exploring</p>
          <h2 className="trending-spots__cta-title">Looking for something more budget-friendly?</h2>
        </div>

        <div className="trending-spots__cta-actions">
          <Link className="trending-spots__cta-link trending-spots__cta-link--primary" to="/student-picks">
            View student picks
          </Link>

          <Link className="trending-spots__cta-link" to="/all-reviews">
            View all reviews
          </Link>
        </div>
      </section>
    </main>
  );
}

export default TrendingSpots;
