import Landlord from "../models/Landlord.js";

// ✅ Get Landlord by MongoDB _id
export const getLandlordById = async (req, res) => {
  try {
    const landlord = await Landlord.findById(req.params.id)
      .populate("tenants.tenantId")
      .exec();

    if (!landlord) {
      return res.status(404).json({ message: "Landlord not found" });
    }

    res.status(200).json(landlord);
  } catch (err) {
    console.error("❌ Get landlord by ID error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Get Landlord by LID (landlordId like LID123456)
export const getLandlordByLID = async (req, res) => {
  try {
    const { lid } = req.params;
    
    console.log("🔍 Searching for landlord with LID:", lid);

    const landlord = await Landlord.findOne({ landlordId: lid })
      .populate("tenants.tenantId")
      .exec();

    if (!landlord) {
      console.log("❌ Landlord not found with LID:", lid);
      return res.status(404).json({ message: "Landlord not found" });
    }

    console.log("✅ Landlord found:", landlord.landlordId);

    res.status(200).json(landlord);
  } catch (err) {
    console.error("❌ Get landlord by LID error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};