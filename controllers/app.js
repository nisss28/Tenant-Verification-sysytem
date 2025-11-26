// server.js
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import TenantRoute from '../routes/TenantRoutes.js';
import Tenant from '../models/Tenant.js'; // Tenant model
import Landlord from '../models/Landlord.js'; // Optional: if you have landlord

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use routes
app.use('/api', TenantRoute);

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/tenantdb';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected ->', MONGO_URI))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Fetch tenant by ID
app.get('/api/tenant/:id', async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.id);
    if (!tenant) return res.status(404).json({ message: 'Tenant not found' });
    res.json(tenant);
  } catch (err) {
    console.error('Fetch tenant error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Fetch landlord by ID (if needed)
app.get('/api/landlord/:id', async (req, res) => {
  try {
    const landlord = await Landlord.findById(req.params.id);
    if (!landlord) return res.status(404).json({ message: 'Landlord not found' });

    // Fetch tenants related to this landlord
    const Tenant = mongoose.model('Tenant');
    const tenants = await Tenant.find({ landlordId: landlord._id });
    const tenantList = tenants.map((t) => ({
      _id: t._id,
      firstName: t.firstName,
      lastName: t.lastName,
      propertyName: t.propertyName || 'N/A',
      criminalRecord: t.criminalRecord || { hasRecord: false, details: '' },
    }));

    res.json({
      _id: landlord._id,
      firstName: landlord.firstName,
      lastName: landlord.lastName,
      email: landlord.email,
      phone: landlord.phone,
      aadhaarNumber: landlord.aadhaarNumber,
      role: landlord.role,
      address: landlord.address,
      isVerified: landlord.isVerified,
      criminalRecord: landlord.criminalRecord || { hasRecord: false, details: '' },
      properties: landlord.properties || [],
      tenants: tenantList,
    });
  } catch (err) {
    console.error('Fetch landlord error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Serve React build - must be after API routes
app.use(express.static(path.join(path.resolve(), 'client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve('client', 'build', 'index.html'));
});

// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));
