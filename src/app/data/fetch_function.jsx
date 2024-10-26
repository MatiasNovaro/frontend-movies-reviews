import { API_BASE_URL } from './apiConfig';

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