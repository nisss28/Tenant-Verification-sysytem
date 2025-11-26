// src/pages/Login.jsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom"; // ✅ import navigation hook

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // ✅ initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      setMsg({ type: "success", text: data.message });
      console.log("✅ Logged in user:", data.user);

      // ✅ redirect based on role
      if (data.role === "tenant") {
        navigate(`/tenant/${data.user._id}`);
      } else if (data.role === "landlord") {
        navigate(`/landlord/${data.user._id}`);
      }
    } catch (err) {
      setMsg({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        background: "linear-gradient(135deg, #8EC5FC 0%, #E0C3FC 100%)",
      }}
    >
      <div className="shadow-lg p-5 rounded-4 bg-white" style={{ width: "380px" }}>
        <h3 className="text-center fw-bold mb-3">Login</h3>
        <form onSubmit={handleSubmit}>
          <label className="form-label fw-semibold">Email</label>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="form-label fw-semibold">Password</label>
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            className="btn btn-primary w-100 fw-semibold py-2"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {msg && (
          <div
            className={`alert mt-3 ${
              msg.type === "error" ? "alert-danger" : "alert-success"
            }`}
          >
            {msg.text}
          </div>
        )}
      </div>
    </div>
  );
}
