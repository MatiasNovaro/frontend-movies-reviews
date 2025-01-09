import { ReviewList } from "../reviews/listaReviews";
import { fetchReviewsByUser, fetchTotalReviewsByUser } from "@/app/data/data_reviews";
import Pagination from "@/app/components/Paginacion";
import { Suspense } from "react";

/**
 * UserPage component displays user information and their reviews.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.userName - The name of the user whose reviews are being displayed.
 * @param {number} props.currentPage - The current page number for pagination.
 * @returns {JSX.Element} The rendered UserPage component.
 */
export async function UserPage(props) {
  const PAGE_SIZE = 3;  // Number of reviews to display per page
  // Fetch total number of reviews for the user
  const totalReviews = await fetchTotalReviewsByUser(props.userName);

  // Fetch reviews for the current user and page
  const reviews = await fetchReviewsByUser(
    props.userName,
    props.currentPage,
    PAGE_SIZE
  );
  return (
    <div>
      <div className="user-info">
        {/* Display user name */}
        <h1>{props.userName}</h1>
      </div>
      <Suspense
        key={props.userName + props.currentPage}
        fallback={<p>Buscando reviews</p>} // Loading fallback UI while fetching reviews
      >
        {/* Render the list of reviews */}
        <ReviewList reviews={reviews}></ReviewList>
      </Suspense>
       {/* Render pagination based on total reviews */}
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={Math.ceil(totalReviews / PAGE_SIZE)} />
      </div>
    </div>
  );
}
