import Link from "next/link";
import "./reviews.css";

/**
 * Component to display a single review.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.userName - Name of the user who wrote the review.
 * @param {string} props.date - Date when the review was written.
 * @param {string} props.text - Content of the review.
 * @returns {JSX.Element} The rendered review.
 */
export async function Review(props) {
  const defaultAvatar = '/default-avatar.webp'; // Default avatar image URL
  return (
    // Start Review Item
    <div className="review">
     {/* Start Review Left Content */}
      <div className="review-side">
        <div className="avatar-container-general ">
          <img src={defaultAvatar} alt={props.userName} className="img-circle"></img>
        </div>
      </div>
       {/* End Review Left Content */}
      {/* Start Review Right Content */}
      <div className="review-right-content">
        <div className="review-header caption margin-bottom-10">
          <div className="review-meta">
            <span className="bold font-red-sunglo">
              <span className="uppercase">by </span>
              <Link className="small" href={`/users/${props.userName}`}>
                {props.userName}
              </Link>
            </span>
            <span className="pull-right date bold uppercase font-red-sunglo small">
              <Link href="">
              <time unixtime="" dateTime={props.date} format="U">
                  {new Date(props.date).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  })}
                </time>
              </Link>
            </span>
          </div>
        </div>
        <div className="review-content" id="review-content-2119366">
          <div className="review-inner">
            <p>{props.text}</p>
          </div>
        </div>
         {/* Start Review Footer */}
        <div className="review-footer">
          <div className="btn-group btn-group-solid pull-right">
            {/* Additional buttons or actions can be added here */}
          </div>
        </div>
         {/* End Review Footer */}
        {/* End Review Right Content */}
      </div>
    </div>
  );
}
