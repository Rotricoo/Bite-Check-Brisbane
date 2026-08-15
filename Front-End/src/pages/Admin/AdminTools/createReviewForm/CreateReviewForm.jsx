import { useState } from "react";
import { createReview } from "../../../../services/adminAPI.js";

import "./CreateReviewForm.scss";

function CreateReviewForm({ onBack }) {
  const [formMessage, setFormMessage] = useState("");

  async function handleCreateReview(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const reviewData = {
      restaurantName: formData.get("restaurantName"),
      category: formData.get("category"),
      cuisine: formData.get("cuisine"),
      location: formData.get("location"),
      address: formData.get("address"),
      priceRange: formData.get("priceRange"),
      description: formData.get("description"),
      intro: formData.get("intro"),
      image: formData.get("image"),
      imagePosition: formData.get("imagePosition") || "center",
      galleryImages: (formData.get("galleryImages") || "")
        .split("\n")
        .map((image) => image.trim())
        .filter(Boolean),
      keywords: (formData.get("keywords") || "")
        .split(",")
        .map((keyword) => keyword.trim())
        .filter(Boolean),

      tags: (formData.get("tags") || "")
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      ratings: {
        henrique: Number(formData.get("henriqueRating")),
        rodrigo: Number(formData.get("rodrigoRating")),
      },
      reviewers: [
        {
          name: "Henrique",
          rating: Number(formData.get("henriqueRating")),
          amountSpent: formData.get("henriqueAmountSpent"),
          spentDetails: formData.get("henriqueSpentDetails"),
          reviewTitle: formData.get("henriqueReviewTitle"),
          reviewBody: formData.get("henriqueReviewBody"),
          orderedItems: [
            {
              name: formData.get("henriqueOrderedItem"),
              price: formData.get("henriqueOrderedItemPrice"),
              image: formData.get("henriqueOrderedItemImage"),
              description: formData.get("henriqueOrderedItemDescription"),
            },
          ],
        },
        {
          name: "Rodrigo",
          rating: Number(formData.get("rodrigoRating")),
          amountSpent: formData.get("rodrigoAmountSpent"),
          spentDetails: formData.get("rodrigoSpentDetails"),
          reviewTitle: formData.get("rodrigoReviewTitle"),
          reviewBody: formData.get("rodrigoReviewBody"),
          orderedItems: [
            {
              name: formData.get("rodrigoOrderedItem"),
              price: formData.get("rodrigoOrderedItemPrice"),
              image: formData.get("rodrigoOrderedItemImage"),
              description: formData.get("rodrigoOrderedItemDescription"),
            },
          ],
        },
      ],
    };

    const result = await createReview(reviewData);

    setFormMessage(result.message);
  }

  return (
    <section className="create-review-form">
      <button className="create-review-form__back-button" type="button" onClick={onBack}>
        Back to admin options
      </button>
      <p className="create-review-form__eyebrow">Create</p>
      <h2 className="create-review-form__title">Create a new review post</h2>

      <form className="create-review-form__form" onSubmit={handleCreateReview}>
        {" "}
        <div className="create-review-form__grid">
          <label className="create-review-form__field">
            <span className="create-review-form__label">Restaurant name</span>
            <input className="create-review-form__input" name="restaurantName" type="text" placeholder="Honto" />{" "}
          </label>

          <label className="create-review-form__field">
            <span className="create-review-form__label">Category</span>
            <input className="create-review-form__input" name="category" type="text" placeholder="Japanese" />
          </label>

          <label className="create-review-form__field">
            <span className="create-review-form__label">Cuisine</span>
            <input className="create-review-form__input" name="cuisine" type="text" placeholder="Japanese" />
          </label>

          <label className="create-review-form__field">
            <span className="create-review-form__label">Location</span>
            <input className="create-review-form__input" name="location" type="text" placeholder="Fortitude Valley" />
          </label>

          <label className="create-review-form__field">
            <span className="create-review-form__label">Address</span>
            <input className="create-review-form__input" name="address" type="text" placeholder="Alden Street, Fortitude Valley QLD" />
          </label>

          <label className="create-review-form__field">
            <span className="create-review-form__label">Price range</span>
            <select className="create-review-form__input" name="priceRange" defaultValue="">
              <option value="" disabled>
                Select price
              </option>
              <option value="$">$</option>
              <option value="$$">$$</option>
              <option value="$$$">$$$</option>
            </select>
          </label>
        </div>
        <label className="create-review-form__field">
          <span className="create-review-form__label">Short description</span>
          <textarea className="create-review-form__textarea" name="description" placeholder="Short card description..." rows="3" />
        </label>
        <label className="create-review-form__field">
          <span className="create-review-form__label">Overview</span>
          <textarea className="create-review-form__textarea" name="intro" placeholder="General restaurant overview..." rows="5" />
        </label>
        <div className="create-review-form__section">
          <p className="create-review-form__section-title">Images</p>

          <div className="create-review-form__grid">
            <label className="create-review-form__field">
              <span className="create-review-form__label">Main image URL</span>
              <input className="create-review-form__input" name="image" type="text" placeholder="/src/assets/img/reviews/honto.jpg" />
            </label>

            <label className="create-review-form__field">
              <span className="create-review-form__label">Image position</span>
              <input className="create-review-form__input" name="imagePosition" type="text" placeholder="center" />
            </label>
          </div>

          <label className="create-review-form__field">
            <span className="create-review-form__label">Gallery image URLs</span>
            <textarea className="create-review-form__textarea" name="galleryImages" placeholder="One image URL per line..." rows="4" />
          </label>
        </div>
        <div className="create-review-form__section">
          <p className="create-review-form__section-title">Search data</p>

          <div className="create-review-form__grid">
            <label className="create-review-form__field">
              <span className="create-review-form__label">Keywords</span>
              <input className="create-review-form__input" name="keywords" type="text" placeholder="sushi, japanese, date night" />
            </label>

            <label className="create-review-form__field">
              <span className="create-review-form__label">Tags</span>
              <input className="create-review-form__input" name="tags" type="text" placeholder="student pick, casual, dinner" />
            </label>
          </div>
        </div>
        <div className="create-review-form__section">
          <p className="create-review-form__section-title">Henrique review</p>

          <div className="create-review-form__grid">
            <label className="create-review-form__field">
              <span className="create-review-form__label">Review title</span>
              <input className="create-review-form__input" name="henriqueReviewTitle" type="text" placeholder="A moody Japanese dinner spot" />
            </label>

            <label className="create-review-form__field">
              <span className="create-review-form__label">Personal rating</span>
              <input className="create-review-form__input" name="henriqueRating" type="number" min="1" max="10" step="0.1" placeholder="8.7" />
            </label>

            <label className="create-review-form__field">
              <span className="create-review-form__label">Amount spent</span>
              <input className="create-review-form__input" name="henriqueAmountSpent" type="text" placeholder="$40" />
            </label>

            <label className="create-review-form__field">
              <span className="create-review-form__label">Spent details</span>
              <input className="create-review-form__input" name="henriqueSpentDetails" type="text" placeholder="Sushi $28 + drink $12" />
            </label>
          </div>

          <label className="create-review-form__field">
            <span className="create-review-form__label">Review text</span>
            <textarea className="create-review-form__textarea" name="henriqueReviewBody" placeholder="Henrique's full review..." rows="5" />
          </label>

          <div className="create-review-form__grid">
            <label className="create-review-form__field">
              <span className="create-review-form__label">Ordered item</span>
              <input className="create-review-form__input" name="henriqueOrderedItem" type="text" placeholder="Chef selection sushi" />
            </label>

            <label className="create-review-form__field">
              <span className="create-review-form__label">Item price</span>
              <input className="create-review-form__input" name="henriqueOrderedItemPrice" type="text" placeholder="$28" />
            </label>

            <label className="create-review-form__field">
              <span className="create-review-form__label">Item image URL</span>
              <input className="create-review-form__input" name="henriqueOrderedItemImage" type="text" placeholder="/src/assets/img/reviews/sushi.jpg" />
            </label>
          </div>

          <label className="create-review-form__field">
            <span className="create-review-form__label">Item description</span>
            <textarea
              className="create-review-form__textarea"
              name="henriqueOrderedItemDescription"
              placeholder="Short description of what Henrique ordered..."
              rows="3"
            />
          </label>
        </div>
        <div className="create-review-form__section">
          <p className="create-review-form__section-title">Rodrigo review</p>

          <div className="create-review-form__grid">
            <label className="create-review-form__field">
              <span className="create-review-form__label">Review title</span>
              <input className="create-review-form__input" name="rodrigoReviewTitle" type="text" placeholder="A moody Japanese dinner spot" />
            </label>

            <label className="create-review-form__field">
              <span className="create-review-form__label">Personal rating</span>
              <input className="create-review-form__input" name="rodrigoPersonalRating" type="number" min="1" max="10" step="0.1" placeholder="8.7" />
            </label>

            <label className="create-review-form__field">
              <span className="create-review-form__label">Amount spent</span>
              <input className="create-review-form__input" name="rodrigoAmountSpent" type="text" placeholder="$40" />
            </label>

            <label className="create-review-form__field">
              <span className="create-review-form__label">Spent details</span>
              <input className="create-review-form__input" name="rodrigoSpentDetails" type="text" placeholder="Sushi $28 + drink $12" />
            </label>
          </div>

          <label className="create-review-form__field">
            <span className="create-review-form__label">Review text</span>
            <textarea className="create-review-form__textarea" name="rodrigoReviewBody" placeholder="Rodrigo's full review..." rows="5" />
          </label>

          <div className="create-review-form__grid">
            <label className="create-review-form__field">
              <span className="create-review-form__label">Ordered item</span>
              <input className="create-review-form__input" name="rodrigoOrderedItem" type="text" placeholder="Chef selection sushi" />
            </label>

            <label className="create-review-form__field">
              <span className="create-review-form__label">Item price</span>
              <input className="create-review-form__input" name="rodrigoOrderedItemPrice" type="text" placeholder="$28" />
            </label>

            <label className="create-review-form__field">
              <span className="create-review-form__label">Item image URL</span>
              <input className="create-review-form__input" name="rodrigoOrderedItemImage" type="text" placeholder="/src/assets/img/reviews/sushi.jpg" />
            </label>
          </div>

          <label className="create-review-form__field">
            <span className="create-review-form__label">Item description</span>
            <textarea
              className="create-review-form__textarea"
              name="rodrigoOrderedItemDescription"
              placeholder="Short description of what Rodrigo ordered..."
              rows="3"
            />
          </label>
        </div>
        <button className="create-review-form__button" type="submit">
          Save draft preview
        </button>
        {formMessage && <p className="create-review-form__message">{formMessage}</p>}
      </form>
    </section>
  );
}

export default CreateReviewForm;
