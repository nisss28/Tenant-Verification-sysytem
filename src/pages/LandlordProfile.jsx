import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./LandlordProfile.css";

export default function LandlordProfile() {
  const { id } = useParams(); // id = LID123456
  const navigate = useNavigate();
  
  const [landlord, setLandlord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Tenant form state
  const [showTenantForm, setShowTenantForm] = useState(false);
  const [tenantForm, setTenantForm] = useState({
    tenantId: "",
    propertyAddress: ""
  });
  const [tenantLoading, setTenantLoading] = useState(false);
  const [tenantMsg, setTenantMsg] = useState(null);

  // Property form state
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [propertyForm, setPropertyForm] = useState({
    address: ""
  });
  const [propertyLoading, setPropertyLoading] = useState(false);
  const [propertyMsg, setPropertyMsg] = useState(null);

  useEffect(() => {
    fetchLandlord();
  }, [id]);

  const fetchLandlord = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("📌 Fetching landlord with LID:", id);

      const response = await fetch(`http://localhost:5000/api/landlord/by-lid/${id}`);
      
      console.log("📌 Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to load landlord");
      }

      const data = await response.json();
      console.log("✅ Landlord data received:", data);

      setLandlord(data);
      
    } catch (err) {
      console.error("❌ Fetch error:", err);
      setError(err.message || "Failed to load landlord profile");
    } finally {
      setLoading(false);
    }
  };

  // Add Tenant Handler
  const handleAddTenant = async (e) => {
    e.preventDefault();
    setTenantLoading(true);
    setTenantMsg(null);

    if (!tenantForm.tenantId.trim()) {
      setTenantMsg({ type: "error", text: "Please enter Tenant ID" });
      setTenantLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/landlord/by-lid/${id}/add-tenant`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(tenantForm),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add tenant");
      }

      setTenantMsg({ type: "success", text: "✅ Tenant added successfully!" });
      setTenantForm({ tenantId: "", propertyAddress: "" });
      setShowTenantForm(false);
      
      await fetchLandlord();
      
    } catch (err) {
      setTenantMsg({ type: "error", text: `❌ ${err.message}` });
    } finally {
      setTenantLoading(false);
    }
  };

  // Add Property Handler
  const handleAddProperty = async (e) => {
    e.preventDefault();
    setPropertyLoading(true);
    setPropertyMsg(null);

    if (!propertyForm.address.trim()) {
      setPropertyMsg({ type: "error", text: "Please enter property address" });
      setPropertyLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/landlord/by-lid/${id}/add-property`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(propertyForm),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add property");
      }

      setPropertyMsg({ type: "success", text: "✅ Property added successfully!" });
      setPropertyForm({ address: "" });
      setShowPropertyForm(false);
      
      await fetchLandlord();
      
    } catch (err) {
      setPropertyMsg({ type: "error", text: `❌ ${err.message}` });
    } finally {
      setPropertyLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="landlord-profile-container">
        <div className="loading">🔄 Loading landlord profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="landlord-profile-container">
        <div className="error">
          <h2>⚠️ Error</h2>
          <p>{error}</p>
          <button 
            className="add-btn" 
            onClick={() => navigate("/landlord-login")}
            style={{ marginTop: "20px" }}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (!landlord) {
    return (
      <div className="landlord-profile-container">
        <div className="error">No landlord data found.</div>
      </div>
    );
  }

  return (
    <div className="landlord-profile-container">
      <div className="profile-card">
        <h2 className="profile-heading">🏠 Landlord Profile</h2>
        
        {/* Basic Information */}
        <div className="info-section">
          <div className="info-row">
            <strong>Landlord ID:</strong>
            <span>{landlord.landlordId}</span>
          </div>
          <div className="info-row">
            <strong>Name:</strong>
            <span>{landlord.name}</span>
          </div>
          <div className="info-row">
            <strong>Email:</strong>
            <span>{landlord.email}</span>
          </div>
          <div className="info-row">
            <strong>Phone:</strong>
            <span>{landlord.phone}</span>
          </div>
          {landlord.address && (
            <div className="info-row">
              <strong>Address:</strong>
              <span>{landlord.address}</span>
            </div>
          )}
          {landlord.gender && (
            <div className="info-row">
              <strong>Gender:</strong>
              <span>{landlord.gender}</span>
            </div>
          )}
        </div>

        {/* Properties Section */}
        <div className="section">
          <div className="section-header">
            <h3 className="section-title">🏢 Properties</h3>
            <button 
              onClick={() => setShowPropertyForm(!showPropertyForm)}
              className="add-btn"
            >
              {showPropertyForm ? "Cancel" : "+ Add Property"}
            </button>
          </div>

          {showPropertyForm && (
            <div className="form-container">
              <input
                type="text"
                placeholder="Enter property address"
                value={propertyForm.address}
                onChange={(e) => setPropertyForm({ address: e.target.value })}
                className="form-input"
              />
              <button 
                onClick={handleAddProperty}
                disabled={propertyLoading}
                className="submit-btn"
              >
                {propertyLoading ? "Adding..." : "Add Property"}
              </button>
              {propertyMsg && (
                <p className={`message ${propertyMsg.type}`}>
                  {propertyMsg.text}
                </p>
              )}
            </div>
          )}

          {landlord.properties && landlord.properties.length > 0 ? (
            <ul className="item-list">
              {landlord.properties.map((p, i) => (
                <li key={i} className="list-item">
                  <span className="badge">#{i + 1}</span>
                  {p.address}
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-text">No properties added yet.</p>
          )}
        </div>

        {/* Tenants Section */}
        <div className="section">
          <div className="section-header">
            <h3 className="section-title">👥 Tenants</h3>
            <button 
              onClick={() => setShowTenantForm(!showTenantForm)}
              className="add-btn"
            >
              {showTenantForm ? "Cancel" : "+ Add Tenant"}
            </button>
          </div>

          {showTenantForm && (
            <div className="form-container">
              <input
                type="text"
                placeholder="Tenant ID (e.g., TID123456)"
                value={tenantForm.tenantId}
                onChange={(e) => setTenantForm({ ...tenantForm, tenantId: e.target.value })}
                className="form-input"
              />
              <input
                type="text"
                placeholder="Property Address (optional)"
                value={tenantForm.propertyAddress}
                onChange={(e) => setTenantForm({ ...tenantForm, propertyAddress: e.target.value })}
                className="form-input"
              />
              <button 
                onClick={handleAddTenant}
                disabled={tenantLoading}
                className="submit-btn"
              >
                {tenantLoading ? "Adding..." : "Add Tenant"}
              </button>
              {tenantMsg && (
                <p className={`message ${tenantMsg.type}`}>
                  {tenantMsg.text}
                </p>
              )}
            </div>
          )}

          {landlord.tenants && landlord.tenants.length > 0 ? (
            <ul className="item-list">
              {landlord.tenants.map((t, i) => (
                <li key={i} className="list-item">
                  <div>
                    <div className="tenant-name">
                      <span className="badge">#{i + 1}</span>
                      {t.tenantId?.firstName || "Unknown"} {t.tenantId?.lastName || "Tenant"}
                    </div>
                    {t.propertyAddress && (
                      <div className="property-info">
                        📍 {t.propertyAddress}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-text">No tenants added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}