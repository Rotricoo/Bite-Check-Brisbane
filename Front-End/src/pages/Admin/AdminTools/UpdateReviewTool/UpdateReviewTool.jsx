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
  const henriqueReview = selectedReview?.reviewers?.find((reviewer) => reviewer.name === "Henrique");
  const rodrigoReview = selectedReview?.reviewers?.find((reviewer) => reviewer.name === "Rodrigo");

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
      priceRange: formData.get("priceRange"),
      description: formData.get("description"),
      address: formData.get("address"),
      websiteUrl: formData.get("websiteUrl"),
      instagramUrl: formData.get("instagramUrl"),
      tags: formData.get("tags"),
      keywords: formData.get("keywords"),
      imagePosition: formData.get("imagePosition"),
      henriqueReviewTitle: formData.get("henriqueReviewTitle"),
      henriqueRating: Number(formData.get("henriqueRating")),
      henriqueAmountSpent: formData.get("henriqueAmountSpent"),
      henriqueSpentDetails: formData.get("henriqueSpentDetails"),
      henriqueReviewBody: formData.get("henriqueReviewBody"),
      rodrigoReviewTitle: formData.get("rodrigoReviewTitle"),
      rodrigoRating: Number(formData.get("rodrigoRating")),
      rodrigoAmountSpent: formData.get("rodrigoAmountSpent"),
      rodrigoSpentDetails: formData.get("rodrigoSpentDetails"),
      rodrigoReviewBody: formData.get("rodrigoReviewBody"),
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
              <p className="update-review-tool__required-note">Fields marked with * are required.</p>

              <div className="update-review-tool__grid">
                <label className="update-review-tool__field">
                  <span className="update-review-tool__label">Restaurant name</span>
                  <input className="update-review-tool__input" name="restaurantName" type="text" defaultValue={selectedReview.restaurantName} required />
                </label>

                <label className="update-review-tool__field">
                  <span className="update-review-tool__label">Category</span>
                  <input className="update-review-tool__input" name="category" type="text" defaultValue={selectedReview.category} required />
                </label>

                <label className="update-review-tool__field">
                  <span className="update-review-tool__label">Cuisine</span>
                  <input className="update-review-tool__input" name="cuisine" type="text" defaultValue={selectedReview.cuisine} required />
                </label>

                <label className="update-review-tool__field">
                  <span className="update-review-tool__label">Location</span>
                  <input className="update-review-tool__input" name="location" type="text" defaultValue={selectedReview.location} required />
                </label>

                <label className="update-review-tool__field">
                  <span className="update-review-tool__label">Address</span>
                  <input className="update-review-tool__input" name="address" type="text" defaultValue={selectedReview.address} />
                </label>

                <label className="update-review-tool__field">
                  <span className="update-review-tool__label">Price range</span>
                  <select className="update-review-tool__input" name="priceRange" defaultValue={selectedReview.priceRange} required>
                    <option value="$">$</option>
                    <option value="$$">$$</option>
                    <option value="$$$">$$$</option>
                  </select>
                </label>
              </div>

              <label className="update-review-tool__field">
                <span className="update-review-tool__label">Short description</span>
                <textarea className="update-review-tool__textarea" name="description" rows="4" defaultValue={selectedReview.description} required />
              </label>

              <div className="update-review-tool__section">
                <p className="update-review-tool__section-title">Links and search data</p>

                <div className="update-review-tool__grid">
                  <label className="update-review-tool__field">
                    <span className="update-review-tool__label">Website URL</span>
                    <input className="update-review-tool__input" name="websiteUrl" type="url" defaultValue={selectedReview.websiteUrl} />
                  </label>

                  <label className="update-review-tool__field">
                    <span className="update-review-tool__label">Instagram URL</span>
                    <input className="update-review-tool__input" name="instagramUrl" type="url" defaultValue={selectedReview.instagramUrl} />
                  </label>

                  <label className="update-review-tool__field">
                    <span className="update-review-tool__label">Image position</span>
                    <input className="update-review-tool__input" name="imagePosition" type="text" defaultValue={selectedReview.imagePosition} />
                  </label>

                  <label className="update-review-tool__field">
                    <span className="update-review-tool__label">Keywords</span>
                    <input className="update-review-tool__input" name="keywords" type="text" defaultValue={selectedReview.keywords?.join(", ")} required />
                  </label>

                  <label className="update-review-tool__field">
                    <span className="update-review-tool__label">Tags</span>
                    <input className="update-review-tool__input" name="tags" type="text" defaultValue={selectedReview.tags?.join(", ")} required />
                  </label>
                </div>
              </div>

              <div className="update-review-tool__section">
                <p className="update-review-tool__section-title">Henrique review</p>

                <div className="update-review-tool__grid">
                  <label className="update-review-tool__field">
                    <span className="update-review-tool__label">Review title</span>
                    <input className="update-review-tool__input" name="henriqueReviewTitle" type="text" defaultValue={henriqueReview?.reviewTitle} required />
                  </label>

                  <label className="update-review-tool__field">
                    <span className="update-review-tool__label">Personal rating</span>
                    <input
                      className="update-review-tool__input"
                      name="henriqueRating"
                      type="number"
                      min="1"
                      max="10"
                      step="0.1"
                      defaultValue={henriqueReview?.rating}
                      required
                    />
                  </label>

                  <label className="update-review-tool__field">
                    <span className="update-review-tool__label">Amount spent</span>
                    <input className="update-review-tool__input" name="henriqueAmountSpent" type="text" defaultValue={henriqueReview?.amountSpent} />
                  </label>

                  <label className="update-review-tool__field">
                    <span className="update-review-tool__label">Spent details</span>
                    <input className="update-review-tool__input" name="henriqueSpentDetails" type="text" defaultValue={henriqueReview?.spentDetails} />
                  </label>
                </div>

                <label className="update-review-tool__field">
                  <span className="update-review-tool__label">Review text</span>
                  <textarea className="update-review-tool__textarea" name="henriqueReviewBody" rows="5" defaultValue={henriqueReview?.reviewBody} required />
                </label>
              </div>

              <div className="update-review-tool__section">
                <p className="update-review-tool__section-title">Rodrigo review</p>

                <div className="update-review-tool__grid">
                  <label className="update-review-tool__field">
                    <span className="update-review-tool__label">Review title</span>
                    <input className="update-review-tool__input" name="rodrigoReviewTitle" type="text" defaultValue={rodrigoReview?.reviewTitle} required />
                  </label>

                  <label className="update-review-tool__field">
                    <span className="update-review-tool__label">Personal rating</span>
                    <input
                      className="update-review-tool__input"
                      name="rodrigoRating"
                      type="number"
                      min="1"
                      max="10"
                      step="0.1"
                      defaultValue={rodrigoReview?.rating}
                      required
                    />
                  </label>

                  <label className="update-review-tool__field">
                    <span className="update-review-tool__label">Amount spent</span>
                    <input className="update-review-tool__input" name="rodrigoAmountSpent" type="text" defaultValue={rodrigoReview?.amountSpent} />
                  </label>

                  <label className="update-review-tool__field">
                    <span className="update-review-tool__label">Spent details</span>
                    <input className="update-review-tool__input" name="rodrigoSpentDetails" type="text" defaultValue={rodrigoReview?.spentDetails} />
                  </label>
                </div>

                <label className="update-review-tool__field">
                  <span className="update-review-tool__label">Review text</span>
                  <textarea className="update-review-tool__textarea" name="rodrigoReviewBody" rows="5" defaultValue={rodrigoReview?.reviewBody} required />
                </label>
              </div>

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
