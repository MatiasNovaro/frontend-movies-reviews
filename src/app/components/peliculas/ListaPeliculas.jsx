import { Pelicula } from "./Pelicula";
import { fetchFilteredPeliculas, fetchTotalFilteredPeliculas } from "@/app/data/data_peliculas.jsx";
import Pagination from "../Paginacion";
import "./Peliculas.css"; 
export async function ListaPeliculas(props) {
  const peliculas = await fetchFilteredPeliculas(
    props.query,
    props.currentPage,
    props.pageSize
  );
  const totalPeliculas = await fetchTotalFilteredPeliculas(props.query);
  return (
    <>
    <div className="movies">
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
    <div className="mt-5 flex w-full justify-center">
      <Pagination totalPages={Math.ceil(totalPeliculas / props.pageSize)} /> 
    </div>
    </>
  );
}
