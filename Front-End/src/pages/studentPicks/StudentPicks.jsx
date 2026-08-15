import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getReviews } from "../../services/reviewAPI.js";
import ReviewCard from "../allReviews/reviewCard/ReviewCard.jsx";
import "./StudentPicks.scss";

function StudentPicks() {
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

  const studentPickReviews = reviews.filter((review) => review.tags?.includes("student pick"));

  return (
    <main className="student-picks">
      <section className="student-picks__hero">
        <p className="student-picks__eyebrow">Student picks</p>
        <h1 className="student-picks__title">Places people are talking about</h1>
        <p className="student-picks__intro">A quick collection of Bite Check reviews tagged as student picks around Brisbane.</p>
      </section>

      <section className="student-picks__reviews">
        {isLoading && <p className="student-picks__status">Loading student picks...</p>}

        {!isLoading && studentPickReviews.length === 0 && <p className="student-picks__status">No student picks have been added yet.</p>}

        {studentPickReviews.map((review) => (
          <ReviewCard key={review.id} review={review} variant="grid" />
        ))}
      </section>

      <section className="student-picks__cta">
        <div className="student-picks__cta-copy">
          <p className="student-picks__cta-eyebrow">Keep exploring</p>
          <h2 className="student-picks__cta-title">Want to see what is trending right now?</h2>
        </div>

        <div className="student-picks__cta-actions">
          <Link className="student-picks__cta-link student-picks__cta-link--primary" to="/trending-spots">
            View trending spots
          </Link>

          <Link className="student-picks__cta-link" to="/all-reviews">
            View all reviews
          </Link>
        </div>
      </section>
    </main>
  );
}

export default StudentPicks;
