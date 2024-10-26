"use client";
import { useState, useEffect, useRef } from "react";
import "./reviewForm.css";
import { postReview } from "@/app/actions/reviewPostAction";
import { useRouter } from "next/navigation";
export default function ReviewForm({ movie_id }) {
  const [reviewText, setReviewText] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState(null);
  const router = useRouter();
  useEffect(() => {
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
      {error && <p className="error">{error}</p>}
      <form
        ref={ref}
        action={async (formData) => {
          if (!token) {
            setError("You must be logged in to post a review.");
            return;
          }
          ref.current?.reset();
          await postReview(movie_id, formData, token);
          router.push(`/peliculas/${movie_id}`);
        }}
      >
        <textarea
          name="reviewText"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
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
