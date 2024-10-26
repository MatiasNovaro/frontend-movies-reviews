import { apiFetch } from "./fetch_function";

export async function verifyCookie() {
    return apiFetch(`/api/check/verify`, {
      method: "GET",
      credentials: "include",
    });
  }