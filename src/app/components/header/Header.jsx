"use client"; 

import Link from "next/link"; 

export default function Header() {
  const handleLogout = () => {
    localStorage.removeItem("token");

    window.location.href = "/login"; // Redirect to login page after logout
  };

  return (
    <header style={{ padding: "20px", display: "flex", gap: "20px" }}>
      {/* Home Button */}
      <Link href="/">
        <button className="buttonStyle">Home</button>
      </Link>
      {/* Logout Button */}
      <button onClick={handleLogout} className="buttonStyle">
        Logout
      </button>
    </header>
  );
}
