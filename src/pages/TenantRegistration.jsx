import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TenantRegistration() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    aadhaarNumber: "",
    employeeId: "",
    password: "",
    confirmPassword: "",
    address: "",
    role: "tenant",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // First Name validation
    if (!form.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (form.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    } else if (!/^[a-zA-Z\s]+$/.test(form.firstName)) {
      newErrors.firstName = "First name can only contain letters";
    }

    // Last Name validation
    if (!form.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (form.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    } else if (!/^[a-zA-Z\s]+$/.test(form.lastName)) {
      newErrors.lastName = "Last name can only contain letters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    // Phone validation (10 digits, starts with 6-9)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!form.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(form.phone)) {
      newErrors.phone = "Phone must be 10 digits starting with 6-9";
    }

    // Gender validation
    if (!form.gender) {
      newErrors.gender = "Please select gender";
    }

    // Aadhaar validation (12 digits)
    const aadhaarRegex = /^\d{12}$/;
    if (!form.aadhaarNumber) {
      newErrors.aadhaarNumber = "Aadhaar number is required";
    } else if (!aadhaarRegex.test(form.aadhaarNumber)) {
      newErrors.aadhaarNumber = "Aadhaar must be exactly 12 digits";
    }

    // Employee ID validation (optional but if provided should be valid)
    if (form.employeeId && form.employeeId.trim().length < 3) {
      newErrors.employeeId = "Employee ID must be at least 3 characters";
    }

    // Password validation
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(form.password)) {
      newErrors.password = "Password must contain uppercase, lowercase and number";
    }

    // Confirm Password validation
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Address validation (optional but if provided should be meaningful)
    if (form.address && form.address.trim().length < 10) {
      newErrors.address = "Address must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    // Validate form
    if (!validateForm()) {
      setMsg({ type: "error", text: "Please fix all errors before submitting" });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/tenant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          gender: form.gender,
          aadhaarNumber: form.aadhaarNumber.trim(),
          employeeId: form.employeeId.trim(),
          password: form.password,
          address: form.address.trim(),
          role: "tenant",
          pastRecords: [],
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Server error");

      setMsg({ type: "success", text: "✅ Registration successful! Redirecting..." });

      // Small delay before redirect
      await new Promise(r => setTimeout(r, 1000));

      // Redirect to tenant profile page
      navigate(`/tenant/${data.tenant._id}`);
    } catch (err) {
      setMsg({ type: "error", text: `❌ ${err.message}` });
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Inline Styles ----------------
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #e3f0ff 0%, #c5dff8 100%)",
    padding: "40px 20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const formStyle = {
    background: "#ffffff",
    borderRadius: "20px",
    padding: "35px 30px",
    maxWidth: "450px",
    width: "100%",
    boxShadow: "0 12px 40px rgba(25, 118, 210, 0.15)",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  };

  const titleStyle = {
    textAlign: "center",
    color: "#1976d2",
    fontSize: "1.8rem",
    fontWeight: "700",
    marginBottom: "5px",
  };

  const subtitleStyle = {
    textAlign: "center",
    color: "#64b5f6",
    fontSize: "1rem",
    marginBottom: "15px",
  };

  const labelStyle = {
    fontSize: "0.95rem",
    color: "#1565c0",
    fontWeight: "600",
    marginBottom: "4px",
    display: "block",
  };

  const inputStyle = {
    padding: "11px 14px",
    borderRadius: "10px",
    border: "1.5px solid #90caf9",
    fontSize: "1rem",
    outline: "none",
    background: "#f5faff",
    width: "100%",
    boxSizing: "border-box",
    transition: "all 0.3s ease",
  };

  const inputFocusStyle = {
    borderColor: "#1976d2",
    background: "#e3f2fd",
  };

  const errorInputStyle = {
    ...inputStyle,
    borderColor: "#f44336",
    background: "#ffebee",
  };

  const errorTextStyle = {
    color: "#d32f2f",
    fontSize: "0.85rem",
    marginTop: "-8px",
    marginBottom: "4px",
    fontWeight: "500",
  };

  const buttonStyle = {
    padding: "14px 0",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)",
    color: "#fff",
    fontWeight: "700",
    cursor: loading ? "not-allowed" : "pointer",
    fontSize: "1.1rem",
    marginTop: "10px",
    transition: "all 0.3s ease",
    opacity: loading ? 0.7 : 1,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  };

  const messageStyle = {
    padding: "12px",
    borderRadius: "8px",
    textAlign: "center",
    fontWeight: "600",
    fontSize: "0.95rem",
  };

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h2 style={titleStyle}>👤 Tenant Registration</h2>
        <p style={subtitleStyle}>Create your tenant account</p>

        {/* First Name */}
        <div>
          <label style={labelStyle}>First Name *</label>
          <input
            name="firstName"
            placeholder="Enter your first name"
            value={form.firstName}
            onChange={handleChange}
            style={errors.firstName ? errorInputStyle : inputStyle}
          />
          {errors.firstName && <p style={errorTextStyle}>{errors.firstName}</p>}
        </div>

        {/* Last Name */}
        <div>
          <label style={labelStyle}>Last Name *</label>
          <input
            name="lastName"
            placeholder="Enter your last name"
            value={form.lastName}
            onChange={handleChange}
            style={errors.lastName ? errorInputStyle : inputStyle}
          />
          {errors.lastName && <p style={errorTextStyle}>{errors.lastName}</p>}
        </div>

        {/* Email */}
        <div>
          <label style={labelStyle}>Email *</label>
          <input
            name="email"
            placeholder="your.email@example.com"
            type="email"
            value={form.email}
            onChange={handleChange}
            style={errors.email ? errorInputStyle : inputStyle}
          />
          {errors.email && <p style={errorTextStyle}>{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label style={labelStyle}>Phone Number *</label>
          <input
            name="phone"
            placeholder="10-digit mobile number"
            value={form.phone}
            onChange={handleChange}
            maxLength="10"
            style={errors.phone ? errorInputStyle : inputStyle}
          />
          {errors.phone && <p style={errorTextStyle}>{errors.phone}</p>}
        </div>

        {/* Gender */}
        <div>
          <label style={labelStyle}>Gender *</label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            style={errors.gender ? errorInputStyle : inputStyle}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <p style={errorTextStyle}>{errors.gender}</p>}
        </div>

        {/* Aadhaar Number */}
        <div>
          <label style={labelStyle}>Aadhaar Number *</label>
          <input
            name="aadhaarNumber"
            placeholder="12-digit Aadhaar number"
            value={form.aadhaarNumber}
            onChange={handleChange}
            maxLength="12"
            style={errors.aadhaarNumber ? errorInputStyle : inputStyle}
          />
          {errors.aadhaarNumber && <p style={errorTextStyle}>{errors.aadhaarNumber}</p>}
        </div>

        {/* Employee ID */}
        <div>
          <label style={labelStyle}>Employee ID (Optional)</label>
          <input
            type="text"
            name="employeeId"
            placeholder="Enter your employee ID"
            value={form.employeeId}
            onChange={handleChange}
            style={errors.employeeId ? errorInputStyle : inputStyle}
          />
          {errors.employeeId && <p style={errorTextStyle}>{errors.employeeId}</p>}
        </div>

        {/* Password */}
        <div>
          <label style={labelStyle}>Password *</label>
          <input
            name="password"
            placeholder="Min 6 chars (A-Z, a-z, 0-9)"
            type="password"
            value={form.password}
            onChange={handleChange}
            style={errors.password ? errorInputStyle : inputStyle}
          />
          {errors.password && <p style={errorTextStyle}>{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div>
          <label style={labelStyle}>Confirm Password *</label>
          <input
            name="confirmPassword"
            placeholder="Re-enter your password"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            style={errors.confirmPassword ? errorInputStyle : inputStyle}
          />
          {errors.confirmPassword && <p style={errorTextStyle}>{errors.confirmPassword}</p>}
        </div>

        {/* Address */}
        <div>
          <label style={labelStyle}>Address (Optional)</label>
          <textarea
            name="address"
            placeholder="Enter your complete address"
            value={form.address}
            onChange={handleChange}
            rows="3"
            style={errors.address ? errorInputStyle : inputStyle}
          />
          {errors.address && <p style={errorTextStyle}>{errors.address}</p>}
        </div>

        <button type="submit" style={buttonStyle} disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        {msg && (
          <p style={{
            ...messageStyle,
            background: msg.type === "error" ? "#ffebee" : "#e8f5e9",
            color: msg.type === "error" ? "#d32f2f" : "#2e7d32",
            border: `2px solid ${msg.type === "error" ? "#ef5350" : "#66bb6a"}`,
          }}>
            {msg.text}
          </p>
        )}

        <p style={{ 
          textAlign: "center", 
          marginTop: "15px",
          fontSize: "0.95rem",
          color: "#64b5f6"
        }}>
          Already have an account?{" "}
          <span 
            onClick={() => navigate("/login")} 
            style={{ 
              color: "#1976d2", 
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