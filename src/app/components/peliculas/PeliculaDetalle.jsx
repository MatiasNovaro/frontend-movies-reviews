"use client";
import { fetchPelicula } from "../../data/data_peliculas.jsx";
import {
  fetchReviewsByMovieId,
  fetchTotalReviewsByMovieId,
} from "@/app/data/data_reviews.jsx";
import { ReviewList } from "../reviews/listaReviews.jsx";
import ReviewForm from "../reviews/reviewForm.jsx";
import "./peliculaDetalle.css";
import Pagination from "@/app/components/Paginacion";
import { useState, useEffect, Suspense } from "react";

const PeliculaDetalle = (props) => {
  const PAGE_SIZE = 3;
  const defaultPoster = "/default-poster.webp";

  const [pelicula, setPelicula] = useState(null);  // Estado para la película
  const [reviews, setReviews] = useState([]);       // Estado para las reviews
  const [totalReviews, setTotalReviews] = useState(0); // Estado para el total de reviews
  const [loading, setLoading] = useState(true);     // Estado de carga

  // useEffect para cargar los datos de la película y las reseñas
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Obtener la película
        const fetchedPelicula = await fetchPelicula(props.id);
        setPelicula(fetchedPelicula);

        // Obtener las reseñas
        const fetchedReviews = await fetchReviewsByMovieId(
          props.id,
          props.currentPage,
          PAGE_SIZE
        );
        setReviews(fetchedReviews);

        // Obtener el total de reseñas
        const fetchedTotalReviews = await fetchTotalReviewsByMovieId(props.id);
        setTotalReviews(fetchedTotalReviews);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();  // Llamar a la función de carga de datos
  }, [props.id, props.currentPage]);  // Se ejecuta cuando cambia el id o la página actual

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!pelicula) {
    return <p>Movie not found</p>;
  }

  return (
    <div className="pelicula-detalle" key={pelicula._id}>
      <div>
        <h1>{pelicula.title}</h1>
        <img src={pelicula.poster || defaultPoster} alt={pelicula.title} />
        <h2>Genres:</h2>
        <div className="genres">
          {pelicula.genres.map((genre) => (
            <p key={genre}>{genre}</p>
          ))}
        </div>

        <h2>Plot:</h2>
        <p>{pelicula.fullplot}</p>

        <p>Release date: {pelicula.year}</p>

        <h2>Cast:</h2>
        <div className="cast">
          {pelicula.cast.map((cast) => (
            <p key={cast}>{cast}</p>
          ))}
        </div>

        <h2>Directors:</h2>
        <div className="directors">
          {pelicula.directors.map((director) => (
            <p key={director}>{director}</p>
          ))}
        </div>

        <div className="awards">
          <p>Wins: {pelicula.awards.wins}</p>
          <p>Nominations: {pelicula.awards.nominations}</p>
        </div>

        <div className="ratings">
          <h2>Rating</h2>
          <p className="imdb-rating">IMDB: {pelicula.imdb.rating}</p>
          <p className="rotten-rating">
            Rotten Tomatoes: {pelicula.tomatoes.viewer.rating}
          </p>
        </div>
      </div>
      <div>
        <ReviewForm movie_id={props.id} />
      </div>
      <Suspense
        key={props.id + props.currentPage}
        fallback={<p>Buscando reviews...</p>}
      >
        <ReviewList reviews={reviews}></ReviewList>
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={Math.ceil(totalReviews / PAGE_SIZE)} />
      </div>
    </div>
  );
};

export default PeliculaDetalle;
