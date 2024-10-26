export async function fetchReviewsByMovieId(id, currentPage, pageSize) {
  try {
    if (!currentPage) currentPage = 1;
    const res = await fetch(
      `http://localhost:1234/api/reviews/${id}?pageSize=${pageSize}&page=${
        currentPage - 1
      }`,{
        headers: {
          "Cache-Control": "no-cache",
        }
      }
    );
    if (!res.ok) throw new Error("Problema de conexion");
    const data = await res.json();
    if (!data || !Array.isArray(data)) {
      throw new Error("No data found or invalid data");
    }
    return data;
  } catch (error) {
    console.error("failed to fetch data", error.message);
    return []; // Return an empty array if there's an error to avoid undefined issue
  }
}
export async function fetchReviewsByUser(userName, currentPage, pageSize) {
  try {
    if (!currentPage) currentPage = 1;
    const res = await fetch(
      `http://localhost:1234/api/reviews/user/${userName}?pageSize=${pageSize}&page=${
        currentPage - 1
      }`
    );
    if (!res.ok) throw new Error("Problema de conexion");
    const data = await res.json();
    if (!data || !Array.isArray(data)) {
      throw new Error("No data found or invalid data");
    }
    return data;
  } catch (error) {
    console.error("failed to fetch data", error.message);
    return []; // Return an empty array if there's an error to avoid undefined issue
  }
}

export async function fetchTotalReviewsByUser(userName) {
  try {
    const res = await fetch(
      `http://localhost:1234/api/reviews/user/count/${userName}`
    );
    if (!res.ok) throw new Error("Problema de conexion");

    const data = await res.json();

    if (typeof data !== "number") {
      throw new Error("Unexpected data format, expected a number");
    }

    return data;
  } catch (error) {
    console.error("failed to fetch data", error.message);
    return 0;
  }
}
export async function fetchTotalReviewsByMovieId(id) {
  try {
    const res = await fetch(`http://localhost:1234/api/reviews/count/${id}`, {
      headers: {
        "Cache-Control": "no-cache",
      },
    });

    if (!res.ok) throw new Error("Problema de conexion");

    const data = await res.json();

    if (typeof data !== "number") {
      throw new Error("Unexpected data format, expected a number");
    }

    return data;
  } catch (error) {
    console.error("failed to fetch data", error.message);
    return 0;
  }
}
// export async function postReview(movie_id, reviewText, token) {
//   const res = await fetch(`http://localhost:1234/api/reviews/`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({
//       movie_id,
//       reviewText,
//     }),
//   });
// }
