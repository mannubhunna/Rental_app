import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      trim: true,
    },
    budget: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    propertytype: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      default: "",
    },
    members: {
      type: Number,
      default: 0,
    },
    profession: {
      type: String,
      default: "",
    },
    organisation: {
      type: String,
      default: "",
    },
    furnished: {
      type: String,
      default: "",
    },
    floor: {
      type: String,
      default: "",
    },
    independent: {
      type: String,
      default: "",
    },
    parking: {
      type: String,
      default: "",
    },
    mobile: {
      type: String,
      default: "",
    }
  },
  {
    timestamps: true,
  }
);

export const Customer = mongoose.model("Customer", customerSchema);