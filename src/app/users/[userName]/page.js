import { UserPage } from "../../components/users/UserPage.jsx";

/**
 * UserPage component that renders the user's profile and associated reviews.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.params - The dynamic route parameters.
 * @param {Object} props.searchParams - The search parameters from the URL.
 * @returns {JSX.Element} The rendered userPage component.
 */
export default function userPage({ params, searchParams }) { 
  const { userName } = params; // Extract username from route parameters
  const currentPage = Number(searchParams?.page) || 0;
  return (
    <>
    <div key={userName}>
      <UserPage userName={userName} currentPage={currentPage} />
    </div>
    </>
  );
}
