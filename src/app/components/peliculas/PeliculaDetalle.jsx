"use client";
import { fetchPelicula } from "../../data/data_peliculas.jsx";
import {
  fetchReviewsByMovieId,
  fetchTotalReviewsByMovieId,
} from "@/app/data/data_reviews.jsx";
import { ReviewList } from "../reviews/listaReviews.jsx";
import ReviewForm from "../reviews/reviewForm.jsx";
import "./peliculaDetalle.css";
import Pagination from "@/app/components/Paginacion.jsx";
import { useState, useEffect, Suspense } from "react";

/**
 * Component that displays detailed information about a movie, along with reviews and pagination.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.id - The unique identifier of the movie.
 * @param {number} props.currentPage - The current page of reviews.
 * @returns {JSX.Element} The detailed movie component with reviews and pagination.
 */
const PeliculaDetalle = (props) => {
  const PAGE_SIZE = 3; // Number of reviews per page
  const defaultPoster = "/default-poster.webp";

  // States to manage movie data, reviews, loading state, and total reviews
  const [pelicula, setPelicula] = useState(null);  // Estado para la película
  const [reviews, setReviews] = useState([]);       // Estado para las reviews
  const [totalReviews, setTotalReviews] = useState(0); // Estado para el total de reviews
  const [loading, setLoading] = useState(true);     // Estado de carga

  // useEffect hook to fetch movie and review data when the component loads or props change
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch movie data
        const fetchedPelicula = await fetchPelicula(props.id);
        setPelicula(fetchedPelicula);

        // Fetch reviews for the current movie
        const fetchedReviews = await fetchReviewsByMovieId(
          props.id,
          props.currentPage,
          PAGE_SIZE
        );
        setReviews(fetchedReviews);
        
        // Fetch the total number of reviews for pagination
        const fetchedTotalReviews = await fetchTotalReviewsByMovieId(props.id);
        setTotalReviews(fetchedTotalReviews);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();  // Call fetchData function to load data on mount or updat
  }, [props.id, props.currentPage]);   // Dependencies for re-running the effect

  if (loading) {
    return <p>Loading...</p>; // Loading indicator
  }

  if (!pelicula) {
    return <p>Movie not found</p>;  // Fallback if movie data is not found
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
            Rotten Tomatoes: {pelicula?.tomatoes?.viewer?.rating || 0}
          </p>
        </div>
      </div>
      {/* Review Form component for submitting new reviews */}
      <div>
        <ReviewForm movie_id={props.id} />
      </div>
       {/* Suspense to handle reviews loading state */}
      <Suspense
        key={props.id + props.currentPage}
        fallback={<p>Buscando reviews...</p>}
      >
        <ReviewList reviews={reviews}></ReviewList>
      </Suspense>
       {/* Pagination for navigating through reviews */}
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={Math.ceil(totalReviews / PAGE_SIZE)} />
      </div>
    </div>
  );
};

export default PeliculaDetalle;
