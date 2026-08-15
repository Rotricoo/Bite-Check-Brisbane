import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { mockReviews } from "../../data/mockReview.js";

// Import images and videos
import henriqueProfile from "../../assets/img/personal-pics/henrique-profile.jpg";
import rodrigoProfile from "../../assets/img/personal-pics/rodrigo-profile.jpg";

// Import styles
import "./ReviewDetails.scss";

const reviewerProfiles = {
  Henrique: henriqueProfile,
  Rodrigo: rodrigoProfile,
};

function ReviewDetails() {
  const { slug } = useParams();
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(null);
  const review = mockReviews.find((item) => item.slug === slug);

  useEffect(() => {
    if (!selectedGalleryImage) {
      return;
    }

    function handleEscapeKey(event) {
      if (event.key === "Escape") {
        setSelectedGalleryImage(null);
      }
    }

    window.addEventListener("keydown", handleEscapeKey);

    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [selectedGalleryImage]);

  if (!review) {
    return (
      <section className="review-details review-details--empty">
        <p className="review-details__eyebrow">Review not found</p>
        <h1 className="review-details__title">We could not find this restaurant review.</h1>
        <Link to="/all-reviews" className="review-details__back-link">
          ← Back to all reviews
        </Link>
      </section>
    );
  }

  const averageRating = review.ratings ? ((review.ratings.henrique + review.ratings.rodrigo) / 2).toFixed(1) : review.rating;

  return (
    <article className="review-details">
      <Link to="/all-reviews" className="review-details__back-link">
        ← Back to all reviews
      </Link>

      <header className="review-details__hero">
        <div className="review-details__copy">
          <p className="review-details__eyebrow">{review.category}</p>
          <h1 className="review-details__title">{review.restaurantName}</h1>
          <p className="review-details__summary">{review.description}</p>

          <dl className="review-details__facts">
            <div className="review-details__fact">
              <dt className="review-details__fact-label">Location</dt>
              <dd className="review-details__fact-value">{review.location}</dd>
            </div>
            <div className="review-details__fact">
              <dt className="review-details__fact-label">Rating</dt>
              <dd className="review-details__fact-value">{averageRating}/10</dd>
            </div>
            <div className="review-details__fact">
              <dt className="review-details__fact-label">Price</dt>
              <dd className="review-details__fact-value">{review.priceRange}</dd>
            </div>
            <div className="review-details__fact">
              <dt className="review-details__fact-label">Cuisine</dt>
              <dd className="review-details__fact-value">{review.cuisine}</dd>
            </div>

            <div className="review-details__fact">
              <dt className="review-details__fact-label">Address</dt>
              <dd className="review-details__fact-value">{review.address || review.location}</dd>
            </div>

            <div className="review-details__fact">
              <dt className="review-details__fact-label">Links</dt>
              <dd className="review-details__fact-value review-details__fact-links">
                {review.websiteUrl && (
                  <a className="review-details__fact-link" href={review.websiteUrl} target="_blank" rel="noreferrer">
                    Website
                  </a>
                )}
                {review.instagramUrl && (
                  <a className="review-details__fact-link" href={review.instagramUrl} target="_blank" rel="noreferrer">
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
        <p className="review-details__section-text">{review.intro || review.description}</p>
      </section>

      {review.galleryImages?.length > 0 && (
        <section className="review-details__gallery">
          <div className="review-details__gallery-header">
            <p className="review-details__section-label">Gallery</p>
            <h2 className="review-details__gallery-title">Inside {review.restaurantName}</h2>
          </div>

          <div className="review-details__gallery-grid">
            {review.galleryImages.slice(0, 4).map((image, index) => (
              <button className="review-details__gallery-button" key={`${image}-${index}`} type="button" onClick={() => setSelectedGalleryImage(image)}>
                <img className="review-details__gallery-image" src={image} alt={`${review.restaurantName} gallery ${index + 1}`} />
              </button>
            ))}
          </div>
        </section>
      )}

      {review.reviewers?.map((reviewer) => {
        const profileImage = reviewerProfiles[reviewer.name];

        return (
          <section className="review-details__review-section" key={reviewer.name}>
            <div className="review-details__review-layout">
              <div className="review-details__review-copy">
                <div className="review-details__review-header">
                  {profileImage && <img className="review-details__reviewer-image" src={profileImage} alt={`${reviewer.name} profile`} />}

                  <div className="review-details__review-heading">
                    <p className="review-details__section-label">{reviewer.name}'s review</p>
                    <h2 className="review-details__section-title">{reviewer.reviewTitle}</h2>
                  </div>
                </div>

                <p className="review-details__section-text">{reviewer.reviewBody}</p>

                <dl className="review-details__review-facts">
                  <div className="review-details__review-fact">
                    <dt className="review-details__review-fact-label">Personal rating</dt>
                    <dd className="review-details__review-fact-value">{reviewer.rating}/10</dd>
                  </div>

                  {reviewer.amountSpent && (
                    <div className="review-details__review-fact">
                      <dt className="review-details__review-fact-label">Spent</dt>
                      <dd className="review-details__review-fact-value">
                        <span className="review-details__review-spent" title={reviewer.spentDetails || "Total spent"}>
                          {reviewer.amountSpent}
                        </span>
                      </dd>
                    </div>
                  )}
                </dl>
              </div>

              {reviewer.orderedItems?.[0] && (
                <figure className="review-details__review-dish">
                  <button className="review-details__review-dish-button" type="button" onClick={() => setSelectedGalleryImage(reviewer.orderedItems[0].image)}>
                    <img className="review-details__review-dish-image" src={reviewer.orderedItems[0].image} alt={reviewer.orderedItems[0].name} />
                  </button>

                  <figcaption className="review-details__review-dish-caption">
                    <span className="review-details__review-dish-name">{reviewer.orderedItems[0].name}</span>
                    <span className="review-details__review-dish-price">{reviewer.orderedItems[0].price}</span>
                    <span className="review-details__review-dish-description">{reviewer.orderedItems[0].description}</span>
                  </figcaption>
                </figure>
              )}
            </div>
          </section>
        );
      })}

      {selectedGalleryImage && (
        <div className="review-details__lightbox" role="dialog" aria-modal="true">
          <button className="review-details__lightbox-backdrop" type="button" aria-label="Close gallery image" onClick={() => setSelectedGalleryImage(null)} />

          <div className="review-details__lightbox-content">
            <button className="review-details__lightbox-close" type="button" onClick={() => setSelectedGalleryImage(null)} aria-label="Close gallery image">
              ×
            </button>

            <img className="review-details__lightbox-image" src={selectedGalleryImage} alt={`${review.restaurantName} selected gallery`} />
          </div>
        </div>
      )}
    </article>
  );
}

export default ReviewDetails;
