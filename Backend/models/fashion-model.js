import mongoose from "mongoose";

const fashionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ["men", "women", "kid", "sport"],
    default: "other"
  },
  subcategory: {
    type: String,
    required: true,
    enum: ["top", "bottom", "tshirt", "outwear", "innerwear", "short"],
    default: "other"
  },
  fabric: {
    type: String,
    required: true
  },
  pattern: {
    type: String,
    required: true
  },
  netQuantity: {
    type: Number,
    required: true
  },
  features: {
    comfort: {
      type: String,
      required: true
    },
    material: {
      type: String,
      required: true
    },
    waistband: {
      type: String,
      required: true
    },
    additional: [String]
  },
  sizes: {
    type: [Number],
    required: true
  }
});

const Fashion = mongoose.model("fashions", fashionSchema);
export default Fashion;