import { useState } from "react";
import { mockReviews } from "../../../../data/mockReview.js";
import { deleteReview } from "../../../../services/adminAPI.js";
import "./DeleteReviewTool.scss";

function DeleteReviewTool({ onBack }) {
  const [selectedReviewSlug, setSelectedReviewSlug] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");

  const selectedReview = mockReviews.find((review) => review.slug === selectedReviewSlug);

  async function handleDeleteReview() {
    if (!selectedReview) {
      return;
    }

    const result = await deleteReview(selectedReview.id);
    setDeleteMessage(result.message);
    setIsConfirming(false);
    setSelectedReviewSlug("");
  }

  function handleSelectReview(event) {
    setSelectedReviewSlug(event.target.value);
    setIsConfirming(false);
    setDeleteMessage("");
  }

  return (
    <section className="delete-review-tool">
      <button className="delete-review-tool__back-button" type="button" onClick={onBack}>
        Back to admin options
      </button>

      <p className="delete-review-tool__eyebrow">Delete</p>
      <h2 className="delete-review-tool__title">Delete a review post</h2>
      <p className="delete-review-tool__text">Choose a review from the current mock database. Later, this action will call the PHP/MySQL backend.</p>

      <label className="delete-review-tool__field">
        <span className="delete-review-tool__label">Review post</span>
        <select className="delete-review-tool__select" value={selectedReviewSlug} onChange={handleSelectReview}>
          <option value="">Select a review</option>

          {mockReviews.map((review) => (
            <option value={review.slug} key={review.id}>
              {review.restaurantName}
            </option>
          ))}
        </select>
      </label>

      {selectedReview && (
        <article className="delete-review-tool__preview">
          <p className="delete-review-tool__preview-label">Selected review</p>
          <h3 className="delete-review-tool__preview-title">{selectedReview.restaurantName}</h3>
          <p className="delete-review-tool__preview-text">{selectedReview.description}</p>

          {!isConfirming && (
            <button className="delete-review-tool__button" type="button" onClick={() => setIsConfirming(true)}>
              Prepare delete
            </button>
          )}

          {isConfirming && (
            <div className="delete-review-tool__confirm">
              <p className="delete-review-tool__confirm-text">Are you sure you want to delete this review?</p>

              <div className="delete-review-tool__confirm-actions">
                <button className="delete-review-tool__button delete-review-tool__button--danger" type="button" onClick={handleDeleteReview}>
                  Confirm delete placeholder
                </button>

                <button className="delete-review-tool__button delete-review-tool__button--secondary" type="button" onClick={() => setIsConfirming(false)}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </article>
      )}

      {deleteMessage && <p className="delete-review-tool__message">{deleteMessage}</p>}
    </section>
  );
}

export default DeleteReviewTool;
