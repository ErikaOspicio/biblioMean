import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
  name: String,
  adress: String,
  regiterDate: { type: Date, default: Date.now },
});

const supplier = mongoose.model("supplier", supplierSchema);

export default supplier;
