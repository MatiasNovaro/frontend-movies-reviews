"use server";
import { apiFetch } from "../data/fetch_function";
import { revalidatePath } from "next/cache";

/**
 * Sends a POST request to submit a new review for a movie.
 * This function also revalidates the relevant cache paths to ensure
 * that updated reviews are displayed.
 *
 * @param {string} movie_id - The ID of the movie being reviewed.
 * @param {FormData} formData - The form data containing the review text.
 * @param {string} token - The JWT token for user authorization.
 * @returns {Promise<void>} Resolves when the review is successfully posted and paths are revalidated.
 */
export async function postReview(movie_id, formData, token) {

    // Retrieve the review text from the form data
    const reviewText = formData.get("reviewText");

     // Send a POST request with the review data
    const res = await apiFetch(`/api/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        movie_id,
        reviewText, 
      }),
    });

    // Revalidate paths to update review displays for both the movie and user pages
    revalidatePath(`/peliculas/${movie_id}`);
    revalidatePath("/users");
  }