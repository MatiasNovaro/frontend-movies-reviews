import PeliculaDetalle from "../../components/peliculas/PeliculaDetalle";
export default function peliculaDetalle({ params, searchParams }) {
  const { id } = params;
  const currentPage = Number(searchParams?.page) || 0;
  return (
    <>
    <div key={id}>
      <PeliculaDetalle id={id} currentPage={currentPage} />
    </div>
    </>
    // <div key={id}>
    //   <PeliculaDetalleWrapper id={id} currentPage={currentPage} />
    // </div>
  );
}
