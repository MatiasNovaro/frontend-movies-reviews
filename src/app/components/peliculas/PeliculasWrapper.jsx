"use client";

import { useEffect, useState } from "react";
import { ListaPeliculas } from "./ListaPeliculas";

/**
 * Wrapper component to calculate the number of movies to display
 * based on screen size and provide responsive pagination.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.query - The search query for filtering movies.
 * @param {number} props.currentPage - The current page number for pagination.
 * @returns {JSX.Element} The responsive movies list component.
 */
export default function PeliculasWrapper({ query, currentPage }) {
  
  const [pageSize, setPageSize] = useState(15);
  useEffect(() => {
    /**
     * Calculates the number of items to fetch based on screen dimensions.
     * Each movie card has a defined width and height including margin.
     *
     * @returns {number} - Total items that can fit on the screen.
     */
    const calculateItemsToFetch = () => {
      const cardWidth = 200 + 32; // Movie card width including margin
      const cardHeight = 360 + 32; // Movie card height including margin
      const containerWidth = window.innerWidth; // Viewport width
      const containerHeight = window.innerHeight; // Viewport height

      const itemsPerRow = Math.floor(containerWidth / cardWidth); // Number of items per row
      const rows = Math.ceil(containerHeight / cardHeight); // Number of rows
 
      return itemsPerRow * rows; // Total items fitting the screen
    };

    /**
     * Updates `pageSize` based on the current screen dimensions.
     * Sets up an event listener to update on window resize.
     */
    const updatePageSize = () => {
      const newPageSize = calculateItemsToFetch();
      setPageSize(newPageSize);
    };

    updatePageSize();  // Initial calculation on mount
    window.addEventListener("resize", updatePageSize); // Recalculate on resize

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", updatePageSize);
  }, []);
  return (
    <>
    {/* Render movie list component with calculated pageSize */}
      <ListaPeliculas
        query={query}
        currentPage={currentPage}
        pageSize={pageSize}
      />
    </>
  );
}
