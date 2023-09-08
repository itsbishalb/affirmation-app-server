import express, { Request, Response } from "express";
import mongoose, { Types } from "mongoose";
import quotesModel from "../model/quotesModel";



const router = express.Router();


const getQuotes = async (req: Request, res: Response) => {

  const quotes = await quotesModel.find();
  console.log("called")

  res.status(200).json(quotes);
};

const postQuotes = async (req: Request, res: Response) => {
    console.log(req.body.quote)
    const quotes = await quotesModel.create({
        quote: req.body.quote,
        author: req.body.author ? req.body.author : "Unknown",
        category: req.body.category
      });

        res.status(201).json(quotes);
};
const updateQuotes = async (req: Request, res: Response) => {
const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)){
    console.log("[404] ID not valid - ", id)
    return res.status(404).send(`No quotes with id: ${id}`);
  }

      // Retrieve the existing document from the database
    const oldQuote = await quotesModel.findById(req.params.id);
    if (!oldQuote) {
        console.log("[404]  quote not found - ", id)
        return res.status(404).send(`No quotes with id: ${id}`);
    }
    // Update the document with the request data

    try{
    const { quote, author, category } = req.body;

    oldQuote.quote =  quote ? quote : oldQuote.quote;
    oldQuote.author = author ? author : oldQuote.author;
    oldQuote.category = category ? category : oldQuote.category;

    oldQuote.save();
    console.log("[200] Updated quote - ", id)
    return res.status(200).json(oldQuote);
    } catch (error) {
        console.log("[400] Error updating quote - ", id)
        return res.status(400).send(`Error updating quote with id: ${id}`);
    }



 
};

const deleteQuotes = async (req: Request, res: Response) => {
const { id } = req.params;
if (!mongoose.Types.ObjectId.isValid(id)){
    console.log("[404] ID not valid - ", id)
    return res.status(404).send(`No quotes with id: ${id}`);
}

try {
    await quotesModel.findByIdAndRemove(id);
    console.log("[200] Deleted quote - ", id)
    res.status(200).json({ message: "Quote deleted successfully with ID, " + id });

} catch (error) {
    console.log("[500] Error deleting quote - ", id)
    res.status(500).json({ message: "Error deleting quote with ID, " + id });
}
};


router.get("/", getQuotes);
router.post("/", postQuotes);
router.put("/:id", updateQuotes);
router.patch("/:id", updateQuotes);
router.delete("/:id", deleteQuotes);


export { router };
