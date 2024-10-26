import Link from "next/link";
import "./reviews.css";
export async function Review(props) {
  const defaultAvatar = '/default-avatar.webp';
  return (
    //START REVIEW ITEM
    <div className="review">
      {/*START REVIEW LEFT CONTENT*/}
      <div className="review-side">
        <div className="avatar-container-general ">
          <img src={defaultAvatar} alt={props.userName} className="img-circle"></img>
        </div>
      </div>
      {/*END REVIEW LEFT CONTENT*/
      /*START REVIEW RIGHT CONTENT*/}
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
        {/* START REVIEW FOOTER*/}
        <div className="review-footer">
          <div className="btn-group btn-group-solid pull-right">
          </div>
        </div>
        {/* END REVIEW FOOTER*/}
        {/* END REVIEW RIGHT CONTENT*/}
      </div>
    </div>
  );
}
