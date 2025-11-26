import React, { useState } from 'react';
import axios from '../services/api';

const ApproveLandlordModal = ({ tenantId }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleApprove = async () => {
    try {
      await axios.post(`/tenant/${tenantId}/approve`, { email });
      setStatus('✅ Landlord approved!');
    } catch (err) {
      setStatus('❌ Error approving landlord.');
    }
  };

  return (
    <div className="card">
      <h3>Approve Landlord</h3>
      <input
        type="email"
        placeholder="Landlord Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleApprove}>Approve</button>
      <p>{status}</p>
    </div>
  );
};

export default ApproveLandlordModal;
