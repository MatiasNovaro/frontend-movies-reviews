import { apiFetch } from "./fetch_function";

/**
 * Fetches all movies with a default page size and page number.
 *
 * @returns {Promise<Object>} A promise that resolves to the response containing the movies.
 */
export async function fetchPeliculas() {
  return( apiFetch('/api/peliculas/?pageSize=30&page=1'));

}

/**
 * Fetches filtered movies based on title or genre.
 *
 * @param {string} query - The title or genre to filter movies by.
 * @param {number} [currentPage=1] - The current page number for pagination.
 * @param {number} [pageSize=0] - The number of movies to fetch per page.
 * @returns {Promise<Object>} A promise that resolves to the response containing the filtered movies.
 */
export async function fetchFilteredPeliculas(query, currentPage, pageSize) {
  if(!currentPage) currentPage=1;
  if(!pageSize) pageSize=0;
  return( apiFetch(`/api/peliculas/filter?title=${query}&pageSize=${pageSize}&page=${currentPage - 1
      }`));
}

/**
 * Fetches the total number of movies that match the provided filter for pagination purposes.
 *
 * @param {string} query - The title to filter movies by.
 * @returns {Promise<number>} A promise that resolves to the total count of filtered movies.
 */
export async function fetchTotalFilteredPeliculas(query) {
  return( apiFetch(`/api/peliculas/count?title=${query}`));
}

/**
 * Fetches a movie by its ID.
 *
 * @param {string|number} id - The ID of the movie to fetch.
 * @returns {Promise<Object>} A promise that resolves to the response containing the movie details.
 */
export async function fetchPelicula(id) {
  return( apiFetch(`/api/peliculas/${id}`));
}
