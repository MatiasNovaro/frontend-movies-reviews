"use client";

import { useEffect, useState } from "react";
import { ListaPeliculas } from "./ListaPeliculas";

export default function PeliculasWrapper({ query, currentPage }) {
  const [pageSize, setPageSize] = useState(15);
  useEffect(() => {
    const calculateItemsToFetch = () => {
      const cardWidth = 200 + 32;
      const cardHeight = 360 + 32;
      const containerWidth = window.innerWidth;
      const containerHeight = window.innerHeight;

      const itemsPerRow = Math.floor(containerWidth / cardWidth);
      const rows = Math.ceil(containerHeight / cardHeight);

      return itemsPerRow * rows;
    };

    // Calculate the number of items to fetch on mount and resize
    const updatePageSize = () => {
      const newPageSize = calculateItemsToFetch();
      setPageSize(newPageSize);
    };

    updatePageSize();
    window.addEventListener("resize", updatePageSize);

    return () => window.removeEventListener("resize", updatePageSize);
  }, []);
  return (
    <>
      <ListaPeliculas
        query={query}
        currentPage={currentPage}
        pageSize={pageSize}
      />
    </>
  );
}
