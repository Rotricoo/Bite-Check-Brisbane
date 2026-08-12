import { Link } from "react-router-dom";
import "./ReviewCard.scss";

function ReviewCard({ review, variant = "hero" }) {
  return (
    <Link to={`/reviews/${review.slug}`} className={`review-card review-card--${variant}`} aria-label={`Read the full review for ${review.restaurantName}`}>
      <img
        src={review.image}
        alt={`${review.restaurantName} food`}
        className="review-card__image"
        style={{ "--review-image-position": review.imagePosition || "center" }}
      />
      <div className="review-card__content">
        <p className="review-card__category">{review.category}</p>
        <h3 className="review-card__title">{review.restaurantName}</h3>
        <p className="review-card__description">{review.description}</p>

        <div className="review-card__details">
          <p>{review.location}</p>
          <p className="review-card__rating">{review.rating}/10</p>
        </div>
      </div>
    </Link>
  );
}

export default ReviewCard;
