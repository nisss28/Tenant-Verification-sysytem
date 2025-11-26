import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function LandlordLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (!email || !password) {
      setMessage("❌ Please enter both email and password");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/landlord/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      console.log("📌 Login Response:", data);

      if (response.ok) {
        setMessage("✅ Login successful! Redirecting...");
        
        const { landlordId, _id, name, email } = data.landlord;
        
        // Store in localStorage
        localStorage.setItem("landlordId", landlordId);
        localStorage.setItem("userId", _id);
        localStorage.setItem("userName", name);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userRole", "landlord");
        
        console.log("✅ Stored landlordId:", landlordId);
        
        // ⭐ CRITICAL FIX: Navigate with landlordId in URL
        setTimeout(() => {
          navigate(`/landlord/${landlordId}`);
        }, 1000);
      } else {
        setMessage(`❌ ${data.message || "Login failed"}`);
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("❌ Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="landlord-container">
      <form className="landlord-form" onSubmit={handleLogin}>
        <h2 className="landlord-title">🏠 Landlord Login</h2>
        <p className="landlord-subtitle">Access your landlord account</p>

        <div>
          <label className="landlord-label">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="landlord-label">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button 
          type="submit" 
          className="landlord-btn"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {message && (
          <p 
            className="landlord-msg" 
            style={{ 
              color: message.includes("✅") ? "#10b981" : "#ef4444",
              fontWeight: "600"
            }}
          >
            {message}
          </p>
        )}

        <p className="landlord-msg" style={{ marginTop: "15px" }}>
          Don't have an account?{" "}
          <span 
            onClick={() => navigate("/landlord-registration")} 
            style={{ 
              color: "#512da8", 
              cursor: "pointer", 
              textDecoration: "underline",
              fontWeight: "600"
            }}
          >
            Register here
          </span>
        </p>
      </form>
    </div>
  );
}

export default LandlordLogin;