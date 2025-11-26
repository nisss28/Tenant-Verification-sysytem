import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LandlordRegistration.css";

export default function LandlordRegistration() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
    aadhaarNumber: "",
    gender: "",
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim() || form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email || !emailRegex.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!form.phone || !phoneRegex.test(form.phone)) {
      newErrors.phone = "Phone must be 10 digits starting with 6-9";
    }

    const aadhaarRegex = /^\d{12}$/;
    if (!form.aadhaarNumber || !aadhaarRegex.test(form.aadhaarNumber)) {
      newErrors.aadhaarNumber = "Aadhaar must be exactly 12 digits";
    }

    if (!form.gender) {
      newErrors.gender = "Please select gender";
    }

    if (!form.password || form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    console.log("📌 Starting registration...");

    if (!validateForm()) {
      setMsg({ type: "error", text: "Please fix all errors" });
      setLoading(false);
      console.log("❌ Validation failed");
      return;
    }

    try {
      console.log("📌 Sending registration request...");
      
      const res = await fetch("http://localhost:5000/api/landlord", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          gender: form.gender,
          aadhaarNumber: form.aadhaarNumber.trim(),
          address: form.address.trim(),
          password: form.password
        }),
      });

      console.log("📌 Response status:", res.status);
      
      const data = await res.json();
      console.log("📌 Response data:", data);
      
      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      if (!data.landlord) {
        console.error("❌ No landlord object in response:", data);
        throw new Error("Invalid response from server");
      }

      if (!data.landlord.landlordId) {
        console.error("❌ No landlordId in response:", data.landlord);
        throw new Error("Landlord ID not generated");
      }

      const landlordId = data.landlord.landlordId;
      console.log("✅ Registration successful! LID:", landlordId);
      
      setMsg({ type: "success", text: `✅ Registration successful! LID: ${landlordId}` });

      // Navigate after 1.5 seconds
      console.log("📌 Navigating to:", `/landlord/${landlordId}`);
      
      setTimeout(() => {
        navigate(`/landlord/${landlordId}`);
      }, 1500);
      
    } catch (err) {
      console.error("❌ Registration error:", err);
      setMsg({ type: "error", text: `❌ ${err.message}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="landlord-container">
      <form onSubmit={handleSubmit} className="landlord-form">
        <h2 className="landlord-title">🏠 Landlord Registration</h2>
        <p className="landlord-subtitle">Create your landlord account</p>

        <div>
          <label className="landlord-label">Full Name *</label>
          <input 
            name="name" 
            value={form.name} 
            onChange={handleChange} 
            placeholder="Enter your full name" 
            className={errors.name ? "error-input" : ""}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <div>
          <label className="landlord-label">Email *</label>
          <input 
            name="email" 
            type="email" 
            value={form.email} 
            onChange={handleChange} 
            placeholder="your.email@example.com" 
            className={errors.email ? "error-input" : ""}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div>
          <label className="landlord-label">Phone Number *</label>
          <input 
            name="phone" 
            value={form.phone} 
            onChange={handleChange} 
            placeholder="10-digit mobile number" 
            maxLength="10"
            className={errors.phone ? "error-input" : ""}
          />
          {errors.phone && <span className="error-text">{errors.phone}</span>}
        </div>

        <div>
          <label className="landlord-label">Aadhaar Number *</label>
          <input 
            name="aadhaarNumber" 
            value={form.aadhaarNumber} 
            onChange={handleChange} 
            placeholder="12-digit Aadhaar number" 
            maxLength="12"
            className={errors.aadhaarNumber ? "error-input" : ""}
          />
          {errors.aadhaarNumber && <span className="error-text">{errors.aadhaarNumber}</span>}
        </div>

        <div>
          <label className="landlord-label">Gender *</label>
          <select 
            name="gender" 
            value={form.gender} 
            onChange={handleChange}
            className={errors.gender ? "error-input" : ""}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <span className="error-text">{errors.gender}</span>}
        </div>

        <div>
          <label className="landlord-label">Address</label>
          <textarea
            name="address" 
            value={form.address} 
            onChange={handleChange} 
            placeholder="Enter your address (optional)"
            rows="2"
          />
        </div>

        <div>
          <label className="landlord-label">Password *</label>
          <input 
            name="password" 
            type="password" 
            value={form.password} 
            onChange={handleChange} 
            placeholder="Min 6 characters" 
            className={errors.password ? "error-input" : ""}
          />
          {errors.password && <span className="error-text">{errors.password}</span>}
        </div>

        <div>
          <label className="landlord-label">Confirm Password *</label>
          <input 
            name="confirmPassword" 
            type="password" 
            value={form.confirmPassword} 
            onChange={handleChange} 
            placeholder="Re-enter password" 
            className={errors.confirmPassword ? "error-input" : ""}
          />
          {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
        </div>

        <button type="submit" className="landlord-btn" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        {msg && (
          <p style={{ 
            marginTop: "10px", 
            color: msg.type === "error" ? "#ef4444" : "#10b981", 
            fontWeight: "600",
            textAlign: "center"
          }}>
            {msg.text}
          </p>
        )}

        <p className="landlord-msg" style={{ marginTop: "15px" }}>
          Already have an account?{" "}
          <span 
            onClick={() => navigate("/landlord-login")} 
            style={{ 
              color: "#512da8", 
              cursor: "pointer", 
              textDecoration: "underline",
              fontWeight: "600"
            }}
          >
            Login here
          </span>
        </p>
      </form>
    </div>
  );
}