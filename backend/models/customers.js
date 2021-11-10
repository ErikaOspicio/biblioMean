import mongoose from "mongoose";

const customersSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  regiterDate: { type: Date, default: Date.now },
  dbstatus: Boolean,
});

const customers = mongoose.model("customers", customersSchema);

export default customers;
