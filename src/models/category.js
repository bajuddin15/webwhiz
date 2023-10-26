import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: String,
  },
  { timestamps: true }
);

const Category =
  mongoose.models?.Category || mongoose.model("Category", categorySchema);
export default Category;
