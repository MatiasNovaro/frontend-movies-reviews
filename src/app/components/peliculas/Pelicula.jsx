import Link from "next/link";
import "./Peliculas.css";

export async function Pelicula(props) {
  const defaultPoster = '/default-poster.webp'; 
  return (
    <li className="movie" key={props._id}>
      <div className="title-div">
      <h3>{props.title}</h3>
      </div>
      <p>{props.year}</p>
      <img src={props.poster || defaultPoster} alt={props.title} width={200} height={230}/>
      <Link href={`/peliculas/${props._id}`} className="movieAnchor">Details</Link>
    </li>
  );
}
