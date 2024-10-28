import { apiFetch } from "./fetch_function";


/**
 * Fetches reviews for a specific movie by its ID.
 *
 * @param {string|number} id - The ID of the movie for which to fetch reviews.
 * @param {number} [currentPage=1] - The current page number for pagination.
 * @param {number} [pageSize] - The number of reviews to fetch per page.
 * @returns {Promise<Object>} A promise that resolves to the response containing the movie reviews.
 */
export async function fetchReviewsByMovieId(id, currentPage, pageSize) {
  if (!currentPage) currentPage = 1;
  return(apiFetch(`/api/reviews/${id}?pageSize=${pageSize}&page=${
        currentPage - 1
      }`));
}

/**
 * Fetches reviews made by a specific user.
 *
 * @param {string} userName - The username of the user whose reviews are to be fetched.
 * @param {number} [currentPage=1] - The current page number for pagination.
 * @param {number} [pageSize] - The number of reviews to fetch per page.
 * @returns {Promise<Object>} A promise that resolves to the response containing the user's reviews.
 */
export async function fetchReviewsByUser(userName, currentPage, pageSize) {
  if (!currentPage) currentPage = 1;
  return( await apiFetch(`/api/reviews/user/${userName}?pageSize=${pageSize}&page=${
        currentPage - 1
      }`));
}

/**
 * Fetches the total number of reviews made by a specific user.
 *
 * @param {string} userName - The username of the user.
 * @returns {Promise<number>} A promise that resolves to the total count of reviews made by the user.
 */
export async function fetchTotalReviewsByUser(userName) {
  return( apiFetch(`/api/reviews/user/count/${userName}`));
}

/**
 * Fetches the total number of reviews for a specific movie by its ID.
 *
 * @param {string|number} id - The ID of the movie for which to count reviews.
 * @returns {Promise<number>} A promise that resolves to the total count of reviews for the movie.
 */
export async function fetchTotalReviewsByMovieId(id) {
  return(apiFetch(`/api/reviews/count/${id}`));
}
