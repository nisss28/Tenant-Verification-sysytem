import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

export default function TenantProfile() {
  const { id } = useParams();
  const [tenant, setTenant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTenant = async () => {
      try {
        const res = await api.get(`/tenant/${id}`);
        setTenant(res.data);
      } catch (err) {
        console.error("Profile Fetch Error:", err);
        if (err.response) {
          setError(err.response.data.message || "Server responded with an error.");
        } else {
          setError("Network error or server not reachable.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchTenant();
  }, [id]);

  if (loading)
    return (
      <div style={{
        display: "flex", justifyContent: "center", alignItems: "center",
        minHeight: "100vh", background: "#f8f9fa", fontSize: "1.5rem",
      }}>
        Loading Profile Data...
      </div>
    );

  if (error)
    return (
      <p style={{ color: "red", textAlign: "center", padding: "40px" }}>
        Error: {error}
      </p>
    );

  if (!tenant || !tenant._id)
    return (
      <p style={{ color: "gray", textAlign: "center", padding: "40px" }}>
        No profile data found. Please try registering again.
      </p>
    );

  // ✅ Apply colors based on criminal record
  const hasRecord = tenant.criminalRecord?.hasRecord;
  const mainColor = hasRecord ? "#e53935" : "#27ae60"; // red / green
  const accentColor = "#FFD700"; // golden
  const shadow = "0 10px 20px rgba(0,0,0,0.12), 0 6px 6px rgba(0,0,0,0.08)";

  return (
    <div style={{
      display: "flex", justifyContent: "center", alignItems: "center",
      minHeight: "100vh", background: "#f8f9fa",
    }}>
      <div style={{
        background: "#fff",
        borderRadius: "15px",
        padding: "30px 40px",
        maxWidth: "480px",
        width: "100%",
        boxShadow: shadow,
        borderTop: `5px solid ${accentColor}`,
        borderLeft: `5px solid ${mainColor}`,
        fontFamily: "Arial, sans-serif",
      }}>
        <h2 style={{
          color: mainColor, textAlign: "center", marginBottom: "15px",
          fontSize: "2rem", fontWeight: "800", borderBottom: `2px solid ${accentColor}`,
          paddingBottom: "10px",
        }}>
          {tenant.firstName} {tenant.lastName}
        </h2>

        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <span style={{
            background: mainColor,
            color: "#fff",
            padding: "6px 15px",
            borderRadius: "20px",
            fontWeight: "600",
            fontSize: "0.9rem",
          }}>
            Record Status: {hasRecord ? "🔴 Has Record" : "🟢 Clear"}
          </span>
        </div>

        <p><strong>🆔 Tenant ID:</strong> {tenant.tenantId || "N/A"}</p>
        <p><strong>📧 Email:</strong> {tenant.email}</p>
        <p><strong>📞 Phone:</strong> {tenant.phone}</p>
        <p><strong>💳 Aadhaar:</strong> {tenant.aadhaarNumber}</p>
        <p><strong>📍 Address:</strong> {tenant.address}</p>
        <p><strong>💼 Employee ID:</strong> {tenant.employeeId || "N/A"}</p>


        <p>
          <strong>Aadhaar Verified:</strong>
<span
  style={{
    color: "#4CAF50",
    fontWeight: "bold",
    marginLeft: "5px",
  }}
>
  ✅ Verified
</span>

        </p>

        <h4 style={{ borderBottom: "1px solid #e0e0e0", paddingBottom: "4px", marginTop: "20px" }}>
          Criminal Check Details
        </h4>
        <p style={{ color: hasRecord ? mainColor : "#4CAF50", fontWeight: "bold" }}>
          {hasRecord
            ? `🚨 Record Found: ${tenant.criminalRecord.details}`
            : "✨ Clear Record"}
        </p>

        <h4 style={{ borderBottom: "1px solid #e0e0e0", paddingBottom: "4px", marginTop: "20px" }}>
          Past Records
        </h4>
        {tenant.pastRecords?.length ? (
          <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
            {tenant.pastRecords.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        ) : (
          <p style={{ fontStyle: "italic", color: "#777" }}>No past records available.</p>
        )}
      </div>
    </div>
  );
}
