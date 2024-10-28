import Link from "next/link";
import "./Peliculas.css";

/**
 * Component that displays a single movie item with title, year, poster, and a link to details.
 *
 * @param {Object} props - Component properties.
 * @param {string} props._id - The unique identifier for the movie.
 * @param {string} props.title - The title of the movie.
 * @param {string} props.year - The release year of the movie.
 * @param {string} [props.poster] - The URL of the movie poster image.
 * @returns {JSX.Element} The rendered movie item.
 */
export async function Pelicula(props) {

  // Default poster image if no poster URL is provided
  const defaultPoster = '/default-poster.webp'; 
  return (
    <li className="movie" key={props._id}>
      {/* Movie title */}
      <div className="title-div">
      <h3>{props.title}</h3>
      </div>
      {/* Movie release year */}
      <p>{props.year}</p>
      {/* Movie poster image with fallback to default */}
      <img src={props.poster || defaultPoster} alt={props.title} width={200} height={230}/>
       {/* Link to the movie's detail page */}
      <Link href={`/peliculas/${props._id}`} className="movieAnchor">Details</Link>
    </li>
  );
}
