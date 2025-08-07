import mongoose from 'mongoose';

const ngoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // Add other fields as needed
});

// Define the model before exporting
const NGO = mongoose.model('NGO', ngoSchema);

export default NGO;
