import Tenant from "../models/Tenant.js";
import bcrypt from "bcryptjs";

// Tenant Registration
export const TenantRegistration = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      gender,
      aadhaarNumber,
      password,
      address,
      employeeId
    } = req.body;

    if (!firstName || !lastName || !email || !phone || !gender || !aadhaarNumber || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Check if tenant already exists
    const existing = await Tenant.findOne({ $or: [{ email }, { aadhaarNumber }] });
    if (existing) return res.status(409).json({ message: "Tenant already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const tenant = new Tenant({
      firstName,
      lastName,
      email,
      phone,
      gender,
      aadhaarNumber,
      password: hashedPassword,
      address: address || "",
      employeeId: employeeId || ""
    });

    await tenant.save();

    // ✅ Return all fields you want to show on card
    res.status(201).json({
      message: "Tenant registered successfully",
      tenant: {
        id: tenant._id,
        firstName: tenant.firstName,
        lastName: tenant.lastName,
        email: tenant.email,
        phone: tenant.phone,
        gender: tenant.gender,
        aadhaarNumber: tenant.aadhaarNumber,
        address: tenant.address,
        employeeId: tenant.employeeId
      }
    });

  } catch (error) {
    console.error("Tenant registration error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
