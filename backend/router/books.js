import express from "express";
import books from "../controllers/books.js";
import auth from "../middlewares/auth.js";
const router = express.Router()

//http://localhost:3003/api/books/registerBooks
router.post("/registerBooks", auth, books.registerBooks);
router.get("/listBooks", auth, books.listBooks);
router.put("/updateBooks", auth, books.updateBooks);
router.delete("/deleteBooks/:_id", auth, books.deleteBooks);

export default router