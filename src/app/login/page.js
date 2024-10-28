'use client';
import { API_BASE_URL } from "../data/apiConfig";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";


/**
 * Login component for user authentication.
 * Sends credentials to the backend, handles authentication, and stores JWT token.
 * @component
 */
export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter(); // Para redirigir después del login exitoso


  /**
   * Handles form submission for login.
   * Validates input, sends login request to backend, and handles success or error.
   * @async
   * @function handleLogin
   * @param {Object} e - The form submission event
   */
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

      const token = data.token;

      // Store token in local storage for future requests
      localStorage.setItem("token", token);

      setSuccess("Login successful!");
      console.log("Login successful:", data);

      // Redirect to protected page on successful login
      router.push("/");

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
        fontFamily: "sans-serif",
        fontSize: "16px",
        lineHeight: "1.5",
        color: "black",
      }}
    >
      {/* Title */}
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
      {/* Form for user login */}
      <form
        onSubmit={handleLogin}
        style={{ display: "flex", flexDirection: "column" }}
      >
        {/* Username input */}
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
        {/* Password input */}
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
        {/* Submit button */}
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
      {/* Display error or success message if present */}
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
      {/* Link to register page */}
      <p style={{ marginTop: "20px", textAlign: "center" }}>
        Don&apos;t have an account?{" "}
        <Link href="/register" style={{ color: "#007BFF", textDecoration: "none" }}>
          Register
        </Link>
      </p>
    </div>
  );
  
}
