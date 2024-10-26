import Search from "../components/Search.jsx";
import { Suspense } from "react";
import PeliculasWrapper from "../components/peliculas/PeliculasWrapper.jsx";
export default function PeliculasPage({ searchParams }) {
  const currentPage = Number(searchParams?.page) || 0;
  const query = searchParams?.query || "";
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-center">
        <h1 className="text-2xl">Movies</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search movies..."></Search>
      </div>
      <div>
      <Suspense key={query + currentPage} fallback={<p>Buscando peliculas</p>}>
        {/* <ListaPeliculas
          query={query}
          currentPage={currentPage}
          ></ListaPeliculas> */}
        <PeliculasWrapper
          query={query}
          currentPage={currentPage}
          ></PeliculasWrapper>
      </Suspense>
      </div>
      {/* <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={10}></Pagination>
        </div> */}
    </div>
  );
}
