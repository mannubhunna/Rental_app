
import { properties, updateproperty, deleteproperty, addProperty, propertyById } from "../controllers/propertiesController.js";
import express from "express";
import multer from "multer";
import { aiinput } from "../controllers/Aidatasaver.js";
import {  addCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,} from "../controllers/customerController.js";
import { aicustomersaver } from "../controllers/Aicustomersaver.js";

export const Router=express.Router()


Router.get("/properties",properties);
Router.post("/addProperty", addProperty)
Router.get("/property/:id", propertyById)
Router.delete("/deleteproperty/:id", deleteproperty)
Router.put("/updateproperty/:id", updateproperty)


Router.post("/addcustomer", addCustomer);
Router.get("/customers", getCustomers);
Router.get("/customer/:id", getCustomerById);
Router.put("/customer/:id", updateCustomer);
Router.delete("/customer/:id", deleteCustomer);


Router.post("/aiinput",aiinput)
Router.post("/customer/addcustomer/byai",aicustomersaver);

