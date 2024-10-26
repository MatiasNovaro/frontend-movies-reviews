// RootLayout.jsx (Server Component)
import "../globals.css";
import Header from "../components/header/Header.jsx";

export const metadata = {
  title: "Peliculas",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
       <Header />
        {children}
      </body>
    </html>
  );
}