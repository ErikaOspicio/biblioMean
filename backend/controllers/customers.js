import customers from "../models/customers.js";
import role from "../models/role.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";

const registerCustomers = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password)
    return res.status(400).send("Incomplete Data");

  const existingCustomers = await customers.findOne({ email: req.body.email });
  if (existingCustomers)
    return res.status(400)
      .send({ message: "Error: The customers alrady exist" });

  const passHash = await bcrypt.hash(req.body.password, 10);

  const roleId = await role.findOne({ name: "customer" });
  if (!role)
    return res.status(400).send({ message: "no customer was assigned" });

  const customersRegister = new customers({
    name: req.body.name,
    email: req.body.email,
    password: passHash,
    roleId: roleId,
    dbstatus: true,
  });

  const result = await customersRegister.save();
  
  try {
      return res.status(200).json({
        token: jwt.sign({
          _id: result._id,
          name: result.name,
          roleId: result.roleId,
          iat: moment().unix(),
        },
        process.env.SK_JWT),
      });
    } catch (e) {
      return res.status(400).send({ message: "login error" })
    }
  };

const registerAdminCustomers = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.password ||
    !req.body.roleId
  )
    return res.status(400).send({ message: "Incomplete data" });

  const existingUser = await user.findOne({ email: req.body.email });
  if (existingUser)
    return res.status(400).send({ message: "The user is already registered" });

  const passHash = await bcrypt.hash(req.body.password, 10);

  const userRegister = new user({
    name: req.body.name,
    email: req.body.email,
    password: passHash,
    roleId: req.body.roleId,
    dbStatus: true,
  });

  const result = await userRegister.save();
  return !result
    ? res.status(400).send({ message: "Failed to register user" })
    : res.status(200).send({ result });
};

const listCustomers = async (req, res) => {
  const customersList = await customers.find();
  return customersList.length === 0
    ? res.status(400).sen({ Error: "Empty customers list" })
    : res.status(200).send({ customersList });
};

const updateCustomers = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.roleId)
    return res.status(400).send({ message: "Incomplete Data" });

    const changeEmail = await user.findById({ _id: req.body._id });
    if (req.body.email !== changeEmail.email)
      return res
        .status(400)
        .send({ message: "The email should never be changed" });


  let pass = "";

  if (req.body.password) {
    pass = await bcrypt.hash(req.body.password, 10);
  } else {
    const customersFind = await customers.findOne({ email: req.body.email });
    pass = customersFind.password;
  }
  //va buscar el mismo name y mismo description
  const existingCustomers = await customers.findOne({
    name: req.body.name,
    email: req.body.email,
    password: pass,
    roleId: req.body.roleId,
  });
  if (existingCustomers)
    return res.status(400).send({ message: "The Customers alrady exist" });

  const customersUpdate = await customers.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    email: req.body.email,
    password: pass,
    roleId: req.body.roleId,
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

const findCustomers = async (req, res) => {
  const customersFind = await customer.findById({ _id: req.params["_id"] });
  return !customersFind
    ? res.status(400).send("No search results")
    : res.status(200).send({ customersFind });
};

const login = async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).send({ message: "Incomplete data" });

  const customersLogin = await customers.findOne({ email: req.body.email });
  if (!customersLogin)
    return res.status(400).send({ message: "wrong email password" });
  
  const hash = await bcrypt.compare(req.body.password, customersLogin.password);
  if (!hash) 
  return res.status(400).send({ message: "wrong email password" });

  try {
    return res.status(200).json({
      token: jwt.sign(
        {
          _id: customersLogin._id,
          name: customersLogin.name,
          roleId: customersLogin.roleId,
          iat: moment().unix(),
        },
        process.env.SK_JWT
      ),
    });
  } catch (e) {
    return res.status(400).send({ message: "login error" });
  }
};

export default {
  registerCustomers,
  registerAdminCustomers,
  listCustomers,
  findCustomers,
  updateCustomers,
  deleteCustomers,
  login,
};
