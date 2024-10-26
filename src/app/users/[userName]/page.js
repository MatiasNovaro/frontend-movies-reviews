import { UserPage } from "@/app/components/users/userPage";
import Header from "../../components/header/Header.jsx";
export default function userPage({ params, searchParams }) {
  const { userName } = params;
  const currentPage = Number(searchParams?.page) || 0;
  return (
    <>
    <Header />
    <div key={userName}>
      <UserPage userName={userName} currentPage={currentPage} />
    </div>
    </>
  );
}
