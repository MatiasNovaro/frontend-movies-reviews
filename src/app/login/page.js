'use client';
import { API_BASE_URL } from "../data/apiConfig";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter(); // Para redirigir después del login exitoso

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);  // Reiniciar mensaje de error
    setSuccess(null);  // Reiniciar mensaje de éxito

    const user = { name, password };

    try {
      const response = await fetch(`${API_BASE_URL}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Failed to login");
      }

      const data = await response.json();

      // Aquí esperamos que el backend devuelva el JWT token en la respuesta
      const token = data.token;

      // Guardar el token en localStorage o cookies seguras
      localStorage.setItem("token", token);

      setSuccess("Login successful!");
      console.log("Login successful:", data);

      // Redirigir al usuario a una página protegida
      router.push("/peliculas");

    } catch (error) {
      setError(error.message || "An error occurred during login");
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "'Poppins', sans-serif",
        fontSize: "16px",
        lineHeight: "1.5",
        color: "black",
      }}
    >
      <h2
        style={{
          fontSize: "2rem",
          fontWeight: "600",
          marginBottom: "20px",
          textAlign: "center",
          color: "black",
        }}
      >
        Login
      </h2>
      <form
        onSubmit={handleLogin}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              fontWeight: "600",
              display: "block",
              marginBottom: "5px",
            }}
          >
            Username
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "1rem",
              color: "black",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              fontWeight: "600",
              display: "block",
              marginBottom: "5px",
            }}
          >
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "1rem",
              color: "black",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "12px",
            width: "100%",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            fontSize: "1rem",
            cursor: "pointer",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#007BFF")}
        >
          Login
        </button>
      </form>
  
      {error && (
        <p
          style={{
            color: "red",
            marginTop: "10px",
            textAlign: "center",
          }}
        >
          {error}
        </p>
      )}
      {success && (
        <p
          style={{
            color: "green",
            marginTop: "10px",
            textAlign: "center",
          }}
        >
          {success}
        </p>
      )}
  
      <p style={{ marginTop: "20px", textAlign: "center" }}>
        Don't have an account?{" "}
        <Link href="/register" style={{ color: "#007BFF", textDecoration: "none" }}>
          Register
        </Link>
      </p>
    </div>
  );
  
}
