"use client";
import { useState, useEffect, useRef } from "react";
import "./reviewForm.css";
import { postReview } from "@/app/actions/reviewPostAction";
import { useRouter, redirect } from "next/navigation";

/**
 * Component for posting a review for a specific movie.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.movie_id - ID of the movie for which the review is being posted.
 * @returns {JSX.Element} The rendered review form.
 */
export default function ReviewForm({ movie_id }) {
  const [reviewText, setReviewText] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState(null);
  const router = useRouter();
  useEffect(() => {
    // Retrieve the token from local storage on component mount
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      setError("You need to be logged in to post a review");
    }
  }, []);
  const ref = useRef(null);
  return (
    <div className="review-form">
      {/* Display error message if exists */}
      {error && <p className="error">{error}</p>}
      <form
        ref={ref}
        action={async (formData) => {
          if (!token) {
            setError("You must be logged in to post a review.");
            return;
          }
          await postReview(movie_id, formData, token); // Post the review
          setReviewText(""); // Clear the review text
          ref.current?.reset(); // Reset the form
          redirect(`/peliculas/${movie_id}`); // Redirect to the movie detail page
        }}
      >
        <textarea
          name="reviewText"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)} // Update review text state on change
          placeholder="Write your review..."
          required
        />
        {/* <Link href={`/peliculas/${movie_id}`}> */}
        <button type="submit">Post Review</button>
        {/* </Link> */}
      </form>
    </div>
  );
}
