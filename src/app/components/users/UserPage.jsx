"use client";
import { ReviewList } from "../reviews/listaReviews";
import { fetchReviewsByUser, fetchTotalReviewsByUser } from "@/app/data/data_reviews";
import Pagination from "@/app/components/Paginacion";
import { Suspense } from "react";
export async function UserPage(props) {
  const PAGE_SIZE = 3;
  const totalReviews = await fetchTotalReviewsByUser(props.userName);
  console.log(totalReviews);
  const reviews = await fetchReviewsByUser(
    props.userName,
    props.currentPage,
    PAGE_SIZE
  );
  return (
    <div>
      <div className="user-info">
        <h1>{props.userName}</h1>
      </div>
      <Suspense
        key={props.userName + props.currentPage}
        fallback={<p>Buscando reviews</p>}
      >
        <ReviewList reviews={reviews}></ReviewList>
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={Math.ceil(totalReviews / PAGE_SIZE)} />
      </div>
    </div>
  );
}
