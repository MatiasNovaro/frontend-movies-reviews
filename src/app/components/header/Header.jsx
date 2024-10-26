// Header.jsx (Client Component)
"use client";  // Mark this as a Client Component to enable interactivity

import Link from "next/link";  // Importing Link for navigation

export default function Header() {
  // Example logout handler
  const handleLogout = () => {
    // 1. Clear tokens or user data (if stored in localStorage, cookies, or sessionStorage)
    localStorage.removeItem("token"); // If you're storing tokens in localStorage

    // 3. Redirect user to login or home page after logging out
    window.location.href = "/login"; // Redirect to login page after logout
  };

  return (
    <header style={{ padding: "20px", display: "flex", gap: "20px" }}>
      {/* Home Button */}
      <Link href="/peliculas">
        <button className="buttonStyle">Home</button>
      </Link>
      {/* Logout Button */}
      <button onClick={handleLogout} className="buttonStyle">
        Logout
      </button>
    </header>
  );
}
