"use server";

import { revalidatePath } from "next/cache";

export async function postReview(movie_id, formData, token) {
    const reviewText = formData.get("reviewText");
    const res = await fetch(`http://localhost:1234/api/reviews/`, {
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
    revalidatePath("/peliculas");
    revalidatePath("/users");
  }