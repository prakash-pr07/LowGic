import NGO from "../models/Ngo.js"

// Fetch NGOs by city (used in frontend search)
export const getNgosByCity = async (req, res) => {
  try {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({ error: "City is required in query" });
    }

    const ngos = await NGO.find({
      city: { $regex: new RegExp(`^${city}$`, "i") } // case-insensitive
    });

    if (ngos.length === 0) {
      return res.status(200).json({ message: "Aap ke city me koi NGO active nahi hai", ngos: [] });
    }

    res.status(200).json({ ngos });
  } catch (err) {
    res.status(500).json({ error: "NGO search failed" });
  }
};
