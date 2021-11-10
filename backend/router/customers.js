import express from "express";
import customers from "../controllers/customers.js";
const router = express.Router()

//http://localhost:3003/api/customers/registerCustomers
router.post("/registerCustomers", customers.registerCustomers);
router.get("/listCustomers", customers.listCustomers);
router.put("/updateCustomers", customers.updateCustomers);
router.delete("/deleteCustomers/:_id", customers.deleteCustomers);

export default router