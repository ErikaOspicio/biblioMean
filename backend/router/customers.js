import express from "express";
import customers from "../controllers/customers.js";
import auth from "../middlewares/auth.js";
import admin from "../middlewares/admin.js";
const router = express.Router()

//http://localhost:3003/api/customers/registerCustomers
router.post("/registerCustomers", customers.registerCustomers);
router.post("/registerAdminCustomers", auth, admin, customers.registerAdminCustomers);
router.post("/login", customers.login);
router.get("/listCustomers", auth, admin, customers.listCustomers);
router.get("/findCustomers/:_id", auth, admin, customers.findCustomers);
router.put("/updateCustomers", auth, admin, customers.updateCustomers);
router.delete("/deleteCustomers/:_id", auth, admin, customers.deleteCustomers);

export default router