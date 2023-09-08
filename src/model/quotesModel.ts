import mongoose from "mongoose";

const quotes = new mongoose.Schema(
  {
    quote:{
      type: String,
      required: [true, "Quote is required"],
    },
    author:{
        type: String,
        required: [true, "Author is required"],
      },
      category:{
        type: String,
        required: [true, "Category is required"],
      },
    },
   
  {
    timestamps: true,
  }
);

export default mongoose.model("Quotes", quotes);
