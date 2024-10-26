"use server";
import { apiFetch } from "../data/fetch_function";
import { revalidatePath } from "next/cache";

export async function postReview(movie_id, formData, token) {
    const reviewText = formData.get("reviewText");
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
    // revalidatePath("/peliculas");
    revalidatePath(`/peliculas/${movie_id}`);
    revalidatePath("/users");
  }