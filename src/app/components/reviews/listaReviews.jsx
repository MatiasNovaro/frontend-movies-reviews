import "./reviews.css";
import { Review } from "./review";

/**
 * Component to display a list of reviews for a specific movie.
 *
 * @param {Object} props - Component properties.
 * @param {Array} props.reviews - Array of review objects to display.
 * @returns {JSX.Element} The rendered list of reviews.
 */
export async function ReviewList(props) {
  const reviews = props.reviews; // Extract reviews from props
  return (
    <div className="portlet light reviews">
      <div className="portlet-title">
        <div className="caption">
          <i className="fa fa-quote-left"></i>
          <span className="caption-subject bold uppercase font-red-sunglo">
            Reviews
          </span>
        </div>
      </div>
      <div className="portlet-body reviews-container"></div>
      {reviews.map((review) => (
        <div key={review._id}>
          <Review
            _id={review._id}
            text={review.text}
            userName={review.name}
            date={review.date}
            movie_id={review.movie_id}
          />
        </div>
      ))}
    </div>
  );
}
