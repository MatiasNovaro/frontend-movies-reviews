import { apiFetch } from "./fetch_function";

export async function fetchReviewsByMovieId(id, currentPage, pageSize) {
  if (!currentPage) currentPage = 1;
  return(apiFetch(`/api/reviews/${id}?pageSize=${pageSize}&page=${
        currentPage - 1
      }`));
}
export async function fetchReviewsByUser(userName, currentPage, pageSize) {
  if (!currentPage) currentPage = 1;
  return( await apiFetch(`/api/reviews/user/${userName}?pageSize=${pageSize}&page=${
        currentPage - 1
      }`));
}

export async function fetchTotalReviewsByUser(userName) {
  return( apiFetch(`/api/reviews/user/count/${userName}`));
}
export async function fetchTotalReviewsByMovieId(id) {
  return(apiFetch(`/api/reviews/count/${id}`));
}
