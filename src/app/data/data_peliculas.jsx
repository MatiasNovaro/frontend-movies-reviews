//Trae todas las peliculas
export async function fetchPeliculas() {
  try {
    const res = await fetch(
      "http://localhost:1234/api/peliculas/?pageSize=30&page=1"
    );
    if (!res.ok) throw new Error("Problema de conexion");
    const data = await res.json();
    if (!data) throw new Error("Not data found");
    return data;
  } catch (error) {
    console.error("failed to fetch data", error.message);
    throw new Error('Failed to fetch data');
  }
}
//Trae las peliculas filtradas por titulo(regex) u/o genero
export async function fetchFilteredPeliculas(query, currentPage, pageSize) {
  if(!currentPage) currentPage=1;
  if(!pageSize) pageSize=0;
  try {
    const res = await fetch(
      `http://localhost:1234/api/peliculas/filter?title=${query}&pageSize=${pageSize}&page=${
        currentPage - 1
      }`
    );
    if (!res.ok) throw new Error("Problema de conexion");
    const data = await res.json();
    if (!data || !Array.isArray(data)) {
      throw new Error("No data found or invalid data");
    }
    return data;
  } catch (error) {
    console.error("failed to fetch data", error.message);
    return []; 
  }
}
//Trae el numero total de peliculas que filtro para el paginado
export async function fetchTotalFilteredPeliculas(query) {
  try {
    const res = await fetch(
      `http://localhost:1234/api/peliculas/count?title=${query}`
    );
    if (!res.ok) throw new Error("Problema de conexion");
    
    const data = await res.json();
    
    if (typeof data !== 'number') {
      throw new Error("Unexpected data format, expected a number");
    }
    
    return data;
  
  } catch (error) {
    console.error("failed to fetch data", error.message);
    return 0; 
  }
}
//Trae una pelicula por id
export async function fetchPelicula(id) {
  try {
    const res = await fetch(`http://localhost:1234/api/peliculas/${id}`, {
      headers: {
        "Cache-Control": "no-cache",
      },
    });
    if (!res.ok) throw new Error("Problema de conexion");
    const data = await res.json();
    if (!data) throw new Error("Not data found");
    return data;
  } catch (error) {
    console.error("failed to fetch data", error.message);
  }
}
