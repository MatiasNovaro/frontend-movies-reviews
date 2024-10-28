"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { generatePagination } from "../util/generarPag";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * Pagination component for navigating through pages of content.
 *
 * @param {Object} props - Component properties.
 * @param {number} props.totalPages - The total number of pages available.
 * @returns {JSX.Element} The rendered Pagination component.
 */
export default function Pagination({ totalPages }) {
  const pathName = usePathname(); // Get the current pathname
  const searchParams = useSearchParams(); // Get the current search parameters
  const currentPage = Number(searchParams.get("page") || 1); // Get the current page number from the search params
  const allPages = generatePagination(currentPage, totalPages); // Generate pagination array for display
  
  // Function to create a URL for a specific page
  const createPageURL = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    return `${pathName}?${params.toString()}`; // Return constructed URL
  };

  return (
    <>
      {
        <div className="inline-flex">
          {/* Left arrow for pagination */}
          <PaginationArrow
            direction="left"
            href={createPageURL(currentPage - 1)}
            isDisabled={currentPage <= 1}
          />

          <div className="flex -space-x-px">
             {/* Map through all pages to create pagination numbers */}
            {allPages.map((page, index) => {
              let position;

               // Determine the position of the page number for styling
              if (index === 0) position = "first";
              if (index === allPages.length - 1) position = "last";
              if (allPages.length === 1) position = "single";
              if (page === "...") position = "middle";

              return (
                <PaginationNumber
                  key={page}
                  href={createPageURL(page)} // Create URL for the page
                  page={page}
                  position={position}
                  isActive={currentPage === page} // Check if the page is active
                />
              );
            })}
          </div>

          {/* Right arrow for pagination */}
          <PaginationArrow
            direction="right"
            href={createPageURL(currentPage + 1)}
            isDisabled={currentPage >= totalPages} // Disable if on the last page
          />
        </div>
      }
    </>
  );
}

/**
 * PaginationNumber component represents a single page number in the pagination.
 *
 * @param {Object} props - Component properties.
 * @param {number} props.page - The page number.
 * @param {string} props.href - The link to the page.
 * @param {boolean} props.isActive - Indicates if this page is the active one.
 * @param {string} props.position - The position of the page number (first, last, single, middle).
 * @returns {JSX.Element} The rendered PaginationNumber component.
 */
function PaginationNumber({ page, href, isActive, position }) {
  // Class name logic for styling the pagination number
  const className = clsx(
    "flex h-10 w-10 items-center justify-center text-sm border",
    {
      "rounded-l-md": position === "first" || position === "single",
      "rounded-r-md": position === "last" || position === "single",
      "z-10 bg-blue-600 border-blue-600 text-white": isActive, // Active page styling
      "hover:bg-gray-100": !isActive && position !== "middle",
      "text-gray-300": position === "middle", // Styling for ellipsis
    }
  );

  // Render active page number or link to the page
  return isActive || position === "middle" ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}
/**
 * PaginationArrow component represents an arrow button for pagination.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.href - The link for the arrow.
 * @param {string} props.direction - Direction of the arrow ("left" or "right").
 * @param {boolean} props.isDisabled - Indicates if the arrow is disabled.
 * @returns {JSX.Element} The rendered PaginationArrow component.
 */
function PaginationArrow({ href, direction, isDisabled }) {
  // Class name logic for styling the arrow button
  const className = clsx(
    "flex h-10 w-10 items-center justify-center rounded-md border",
    {
      "pointer-events-none text-gray-300": isDisabled, // Disable pointer events if disabled
      "hover:bg-gray-100": !isDisabled,
      "mr-2 md:mr-4": direction === "left",  // Margin for left arrow
      "ml-2 md:ml-4": direction === "right", // Margin for right arrow
    }
  );

  const icon =
    direction === "left" ? (
      <ArrowLeftIcon className="w-4" />
    ) : (
      <ArrowRightIcon className="w-4" />
    );
  // Render arrow as a link or div based on disabled state
  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}
