import express from "express";
import books from "../controllers/books.js";
const router = express.Router()

//http://localhost:3003/api/books/registerBooks
router.post("/registerBooks", books.registerBooks);
router.get("/listBooks", books.listBooks);
router.put("/updateBooks", books.updateBooks);
router.delete("/deleteBooks/:_id", books.deleteBooks);

export default router