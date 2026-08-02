import mongoose from "mongoose"


const propertySchema = new mongoose.Schema(
  {
    propertyName: {
      type: String,
      required: true,
      trim: true,
    },

    budget: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    furnished: {
      type: String,
      default: "N/A",
    },

    availableFor: {
      type: String,
      default: "N/A",
    },

    floor: {
      type: String,
      default: "N/A",
    },

    independent: {
      type: String,
      default: "N/A",
    },

    maintenance: {
      type: String,
      default: "N/A",
    },


    parking: {
      type: String,
      default: "N/A",
    },

    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);



export const Inventory =mongoose.model("Inventory",propertySchema)