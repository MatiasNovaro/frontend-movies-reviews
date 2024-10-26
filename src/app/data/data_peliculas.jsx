import { apiFetch } from "./fetch_function";
//Trae todas las peliculas
export async function fetchPeliculas() {
  return( apiFetch('/api/peliculas/?pageSize=30&page=1'));

}
//Trae las peliculas filtradas por titulo(regex) u/o genero
export async function fetchFilteredPeliculas(query, currentPage, pageSize) {
  if(!currentPage) currentPage=1;
  if(!pageSize) pageSize=0;
  return( apiFetch(`/api/peliculas/filter?title=${query}&pageSize=${pageSize}&page=${currentPage - 1
      }`));
}
//Trae el numero total de peliculas que filtro para el paginado
export async function fetchTotalFilteredPeliculas(query) {
  return( apiFetch(`/api/peliculas/count?title=${query}`));
}
//Trae una pelicula por id
export async function fetchPelicula(id) {
  return( apiFetch(`/api/peliculas/${id}`));
}
