"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";


/**
 * Search component that allows users to input a search term and updates the URL with the query.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.placeholder - Placeholder text for the search input.
 * @returns {JSX.Element} The rendered Search component.
 */
export default function Search({ placeholder }) {
  const pathName = usePathname(); // Get the current pathname
  const { replace } = useRouter(); // Get the router for URL navigation
  const searchParams = useSearchParams(); // Get current search parameters
  // Debounced function to handle search input changes
  const handleSearch = useDebouncedCallback((term) => { 
    const params = new URLSearchParams(searchParams); // Create a new URLSearchParams object
    if (term) {
      params.set("query", term);  // Set the query parameter if the term is provided
    } else {
      params.delete("query"); // Remove the query parameter if the term is empty
    }
    params.set("page", 1); // Reset page to 1 on new search

    // Update the URL with the new search parameter
    replace(`${pathName}?${params.toString()}`);
  }, 300); // Debounce the function to avoid too many calls
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        onChange={(event) => handleSearch(event.target.value)} // Handle input changes
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        defaultValue={searchParams.get("query")?.toString()} // Default value from search params
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
