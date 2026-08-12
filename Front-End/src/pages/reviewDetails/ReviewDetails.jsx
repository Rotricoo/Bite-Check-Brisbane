import { Link, useParams } from "react-router-dom";
import { mockReviews } from "../../data/mockReview.js";
import "./ReviewDetails.scss";

function ReviewDetails() {
  const { slug } = useParams();
  const review = mockReviews.find((item) => item.slug === slug);

  if (!review) {
    return (
      <section className="review-details review-details--empty">
        <p className="review-details__eyebrow">Review not found</p>
        <h1>We could not find this restaurant review.</h1>
        <Link to="/all-reviews" className="review-details__back-link">
          Back to all reviews
        </Link>
      </section>
    );
  }

  const averageRating = review.ratings ? ((review.ratings.henrique + review.ratings.rodrigo) / 2).toFixed(1) : review.rating;

  return (
    <article className="review-details">
      <Link to="/all-reviews" className="review-details__back-link">
        Back to all reviews
      </Link>

      <header className="review-details__hero">
        <div className="review-details__copy">
          <p className="review-details__eyebrow">{review.category}</p>
          <h1>{review.restaurantName}</h1>
          <p className="review-details__summary">{review.description}</p>

          <dl className="review-details__facts">
            <div>
              <dt>Location</dt>
              <dd>{review.location}</dd>
            </div>
            <div>
              <dt>Rating</dt>
              <dd>{averageRating}/10</dd>
            </div>
            <div>
              <dt>Price</dt>
              <dd>{review.priceRange}</dd>
            </div>
            <div>
              <dt>Cuisine</dt>
              <dd>{review.cuisine}</dd>
            </div>

            <div>
              <dt>Address</dt>
              <dd>{review.address || review.location}</dd>
            </div>

            <div>
              <dt>Links</dt>
              <dd className="review-details__links">
                {review.websiteUrl && (
                  <a href={review.websiteUrl} target="_blank" rel="noreferrer">
                    Website
                  </a>
                )}
                {review.instagramUrl && (
                  <a href={review.instagramUrl} target="_blank" rel="noreferrer">
                    Instagram
                  </a>
                )}
              </dd>
            </div>
          </dl>
        </div>

        <img
          src={review.image}
          alt={`${review.restaurantName} food`}
          className="review-details__image"
          style={{ "--review-image-position": review.imagePosition || "center" }}
        />
      </header>
      <section className="review-details__section">
        <p className="review-details__section-label">Overview</p>
        <h2>About {review.restaurantName}</h2>
        <p>{review.intro || review.description}</p>
      </section>

      {review.reviewers?.map((reviewer) => (
        <section className="review-details__section" key={reviewer.name}>
          <p className="review-details__section-label">{reviewer.name}'s review</p>
          <h2>{reviewer.reviewTitle}</h2>
          <p>{reviewer.reviewBody}</p>
        </section>
      ))}
    </article>
  );
}

export default ReviewDetails;
