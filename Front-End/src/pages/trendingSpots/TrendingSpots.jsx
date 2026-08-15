import { Link } from "react-router-dom";
import { mockReviews } from "../../data/mockReview.js";
import ReviewCard from "../allReviews/reviewCard/ReviewCard.jsx";
import "./TrendingSpots.scss";

function TrendingSpots() {
  const trendingReviews = mockReviews.filter((review) => review.tags?.includes("trending"));

  return (
    <main className="trending-spots">
      <section className="trending-spots__hero">
        <p className="trending-spots__eyebrow">Trending spots</p>
        <h1 className="trending-spots__title">Places people are talking about</h1>
        <p className="trending-spots__intro">A quick collection of Bite Check reviews tagged as trending around Brisbane.</p>
      </section>

      <section className="trending-spots__reviews">
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
