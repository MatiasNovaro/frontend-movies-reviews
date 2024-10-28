import { API_BASE_URL } from './apiConfig';


/**
 * Makes a fetch request to the specified API endpoint.
 *
 * @param {string} endpoint - The API endpoint to fetch data from.
 * @param {RequestInit} [options={}] - Optional fetch options (method, headers, body, etc.).
 * @returns {Promise<Object>} A promise that resolves to the JSON response.
 * @throws {Error} Throws an error if the fetch fails or if the response is not ok.
 */
export async function apiFetch(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, options);
    if (!res.ok) throw new Error("Connection issue");
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch data", error.message);
    throw new Error('Failed to fetch data');
  }
}