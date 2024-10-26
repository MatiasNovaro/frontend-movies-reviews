import "./reviews.css";
import { Review } from "./review";
export async function ReviewList(props) {
  const reviews = props.reviews;
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
