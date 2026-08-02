import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { Router } from "./routes/userRoute.js";
import { pathToFileURL } from "url";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { config } from "process";
import { connectdb } from "./config/db.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app=express()

app.use(express.json());
app.use(express.text());

connectdb();

app.use(cors());

app.use("/",Router)
app.use("/uploads", express.static("uploads"));


export const pathfile=path.join(__dirname,"data","properties.json")

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
  console.log("server is Runnig boss")
})