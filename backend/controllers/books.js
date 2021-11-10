import books from "../models/books.js";

const registerBooks = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.author ||
    !req.body.yearPublication ||
    !req.body.pages ||
    !req.body.price ||
    !req.body.gender
  )
    return res.status(400).send("Incomplete Data");

  const existingBooks = await books.findOne({ name: req.body.name });
  if (existingBooks)
    return res.status(400).send("Error: The books alrady exist");

  const booksSchema = new books({
    name: req.body.name,
    author: req.body.author,
    yearPublication: req.body.yearPublication,
    pages: req.body.pages,
    gender: req.body.gender,
    price: req.body.price,
  });

  const result = await booksSchema.save();
  if (!result) return res.status(400).send("Failed to register books");

  return res.status(200).send({ result });
};
const listBooks = async (req, res) => {
  const booksSchema = await books.find();
  if (!booksSchema || booksSchema.length == 0)
    return res.status(400).sen({ Error: "Empty books list" });
  return res.status(200).send({ booksSchema });
};

const updateBooks = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.author ||
    !req.body.yearPublication ||
    !req.body.pages ||
    !req.body.price ||
    !req.body.gender
  )
    return res.status(400).send("Incomplete Data");

  const existingBooks = await books.findOne({
    name: req.body.name,
    author: req.body.author,
    yearPublication: req.body.author,
    pages: req.body.pages,
    price: req.body.price,
    gender: req.body.gender,
  });
  if (existingBooks) return res.status(400).send("The books alrady exist");

  const booksUpdate = await books.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    author: req.body.author,
    yearPublication: req.body.author,
    pages: req.body.pages,
    price: req.body.price,
    gender: req.body.gender,
  });
  return !booksUpdate
  ? res.status(400).send("error editing books")
  : res.status(200).send({ booksUpdate });
  
};
const deleteBooks  = async(req, res) => {
  const booksDelete = await books.findByIdAndDelete({_id: req.params["_id"]})

  return !booksDelete ? res.status(400).send("Books no found"): res.status(200).send("Books deleted")

}


export default { registerBooks, listBooks, updateBooks, deleteBooks };
