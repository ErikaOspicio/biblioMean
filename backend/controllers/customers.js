import customers from "../models/customers.js";

const registerCustomers = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password)
    return res.status(400).send("Incomplete Data");

  const existingCustomers = await customers.findOne({ name: req.body.name });
  if (existingCustomers)
    return res.status(400).send("Error: The customers alrady exist");

  const customersSchema = new customers({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    dbstatus: true,
  });

  const result = await customersSchema.save();
  if (!result) return res.status(400).send("Failed to register customer");

  return res.status(200).send({ result });
};
const listCustomers = async (req, res) => {
  const customersSchema = await customers.find();
  if (!customersSchema || customersSchema.length == 0)
    return res.status(400).sen({ Error: "Empty books list" });
  return res.status(200).send({ customersSchema });
};

const updateCustomers = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password)
    return res.status(400).send("Incomplete Data");
  //va buscar el mismo name y mismo description
  const existingCustomers = await customers.findOne({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  if (existingCustomers)
    return res.status(400).send("The Customers alrady exist");

  const customersUpdate = await customers.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  return !customersUpdate
    ? res.status(400).send("error editing Customers")
    : res.status(200).send({ customersUpdate });
};
const deleteCustomers = async (req, res) => {
  const customersDelete = await customers.findByIdAndDelete({
    _id: req.params["_id"],
  });

  return !customersDelete
    ? res.status(400).send("customers no found")
    : res.status(200).send("customers deleted");
};

export default {
  registerCustomers,
  listCustomers,
  updateCustomers,
  deleteCustomers,
};
