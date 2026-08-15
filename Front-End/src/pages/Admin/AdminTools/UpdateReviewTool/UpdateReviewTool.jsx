import { useEffect, useState } from "react";
import { getReviews } from "../../../../services/reviewAPI.js";
import { updateReview } from "../../../../services/adminAPI.js";

// Import styles
import "./UpdateReviewTool.scss";

function UpdateReviewTool({ onBack }) {
  const [selectedReviewSlug, setSelectedReviewSlug] = useState("");

  const [reviews, setReviews] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");

  const selectedReview = reviews.find((review) => review.slug === selectedReviewSlug);

  function handleSelectReview(event) {
    setSelectedReviewSlug(event.target.value);
    setIsEditing(false);
    setUpdateMessage("");
  }

  useEffect(() => {
    async function loadReviews() {
      const loadedReviews = await getReviews();
      setReviews(loadedReviews);
    }

    loadReviews();
  }, []);

  async function handleUpdateReview(event) {
    event.preventDefault();

    if (!selectedReview) {
      return;
    }

    const formData = new FormData(event.currentTarget);

    const reviewData = {
      restaurantName: formData.get("restaurantName"),
      category: formData.get("category"),
      cuisine: formData.get("cuisine"),
      location: formData.get("location"),
      rating: Number(formData.get("rating")),
      priceRange: formData.get("priceRange"),
      description: formData.get("description"),
      address: formData.get("address"),
      websiteUrl: formData.get("websiteUrl"),
      instagramUrl: formData.get("instagramUrl"),
      tags: formData.get("tags"),
      keywords: formData.get("keywords"),
    };

    const result = await updateReview(selectedReview.id, reviewData);
    setUpdateMessage(result.message);
  }

  return (
    <section className="update-review-tool">
      <button className="update-review-tool__back-button" type="button" onClick={onBack}>
        Back to admin options
      </button>

      <p className="update-review-tool__eyebrow">Update</p>
      <h2 className="update-review-tool__title">Update an existing review</h2>
      <p className="update-review-tool__text">Choose a review to update</p>

      <label className="update-review-tool__field">
        <span className="update-review-tool__label">Review post</span>
        <select className="update-review-tool__select" value={selectedReviewSlug} onChange={handleSelectReview}>
          <option value="">Select a review</option>

          {reviews.map((review) => (
            <option value={review.slug} key={review.id}>
              {review.restaurantName}
            </option>
          ))}
        </select>
      </label>

      {selectedReview && (
        <>
          <article className="update-review-tool__preview">
            <p className="update-review-tool__preview-label">Selected review</p>
            <h3 className="update-review-tool__preview-title">{selectedReview.restaurantName}</h3>
            <p className="update-review-tool__preview-text">{selectedReview.description}</p>

            <button className="update-review-tool__button" type="button" onClick={() => setIsEditing(true)}>
              Load review for editing
            </button>
          </article>

          {isEditing && (
            <form className="update-review-tool__form" onSubmit={handleUpdateReview}>
              <div className="update-review-tool__grid">
                <label className="update-review-tool__field">
                  <span className="update-review-tool__label">Restaurant name</span>
                  <input className="update-review-tool__input" name="restaurantName" type="text" defaultValue={selectedReview.restaurantName} />
                </label>

                <label className="update-review-tool__field">
                  <span className="update-review-tool__label">Category</span>
                  <input className="update-review-tool__input" name="category" type="text" defaultValue={selectedReview.category} />
                </label>

                <label className="update-review-tool__field">
                  <span className="update-review-tool__label">Cuisine</span>
                  <input className="update-review-tool__input" name="cuisine" type="text" defaultValue={selectedReview.cuisine} />
                </label>

                <label className="update-review-tool__field">
                  <span className="update-review-tool__label">Location</span>
                  <input className="update-review-tool__input" name="location" type="text" defaultValue={selectedReview.location} />
                </label>

                <label className="update-review-tool__field">
                  <span className="update-review-tool__label">Rating</span>
                  <input className="update-review-tool__input" name="rating" type="number" min="1" max="10" step="0.1" defaultValue={selectedReview.rating} />
                </label>
              </div>

              <label className="update-review-tool__field">
                <span className="update-review-tool__label">Short description</span>
                <textarea className="update-review-tool__textarea" name="description" rows="4" defaultValue={selectedReview.description} />
              </label>

              <button className="update-review-tool__button" type="submit">
                Save update
              </button>

              {updateMessage && <p className="update-review-tool__message">{updateMessage}</p>}
            </form>
          )}
        </>
      )}
    </section>
  );
}

export default UpdateReviewTool;
