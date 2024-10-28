'use client';
import { API_BASE_URL } from "../data/apiConfig";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";


/**
 * Register component allows users to create a new account.
 * It collects user name, email, and password, sends it to the backend,
 * and manages the registration state (success or error).
 *
 * @returns {JSX.Element} The rendered register form component.
 */
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();


  /**
   * Handles user registration by sending data to the API.
   * On success, stores the JWT token and redirects to the peliculas page.
   * On error, displays an error message.
   *
   * @param {Event} e - Form submission event.
   */
  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null); 

    const newUser = { name, email, password };

    try {
      const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "el registro fallo");
      }

      const data = await response.json();

      const token = data.token;

       // Store token for authenticated actions
      localStorage.setItem("token", token);

      setSuccess("Registration successful!");
      console.log("Registration successful:", data);

      // Redirect to the peliculas page after successful registration
      router.push("/");

    } catch (error) {
      setError(error.message || "An error occurred during registration");
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
      {/* Heading for the registration form */}
      <h2
        style={{
          fontSize: "2rem",
          fontWeight: "600",
          marginBottom: "20px",
          textAlign: "center",
          color: "black",
        }}
      >
        Register
      </h2>
      <form
        onSubmit={handleRegister}
        style={{ display: "flex", flexDirection: "column" }}
      >
        {/* Name input field */}
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              fontWeight: "600",
              display: "block",
              marginBottom: "5px",
            }}
          >
            Name
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
        {/* Email input field */}
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              fontWeight: "600",
              display: "block",
              marginBottom: "5px",
            }}
          >
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        {/* Password input field */}
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
          Register
        </button>
      </form>

      {/* Error message */}
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
       {/* Success message */}
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
      {/* Redirect to login page */}  
      <p style={{ marginTop: "20px", textAlign: "center" }}>
        Already have an account?{" "}
        <Link href="/login" style={{ color: "#007BFF", textDecoration: "none" }}>
          Login
        </Link>
      </p>
    </div>
  );
  
  
}
