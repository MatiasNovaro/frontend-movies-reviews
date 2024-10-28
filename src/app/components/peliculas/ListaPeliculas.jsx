import { Pelicula } from "./Pelicula";
import { fetchFilteredPeliculas, fetchTotalFilteredPeliculas } from "@/app/data/data_peliculas.jsx";
import Pagination from "../Paginacion";
import "./Peliculas.css"; 

/**
 * Component that displays a list of filtered movies and pagination.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.query - The query object containing filtering criteria for movies.
 * @param {number} props.currentPage - The current page number for pagination.
 * @param {number} props.pageSize - The number of movies displayed per page.
 * @returns {JSX.Element} The rendered movie list and pagination.
 */
export async function ListaPeliculas(props) {
  // Fetch the list of filtered movies based on the query, current page, and page size
  const peliculas = await fetchFilteredPeliculas(
    props.query,
    props.currentPage,
    props.pageSize
  );
  // Fetch the total number of movies for pagination calculations
  const totalPeliculas = await fetchTotalFilteredPeliculas(props.query);
  return (
    <>
    <div className="movies">
       {/* Render each movie using the Pelicula component */}
      {peliculas.map((pelicula) => (
        <div key={pelicula._id}>
          <Pelicula
            _id={pelicula._id}
            poster={pelicula.poster}
            title={pelicula.title}
          />
        </div>
      ))}
    </div>
    {/* Render the Pagination component based on the total number of pages */}
    <div className="mt-5 flex w-full justify-center">
      <Pagination totalPages={Math.ceil(totalPeliculas / props.pageSize)} /> 
    </div>
    </>
  );
}
