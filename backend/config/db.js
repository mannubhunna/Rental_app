import mongoose from "mongoose";

export function connectdb(){
  mongoose.connect(process.env.MONGODB_URL)
  .then(()=>console.log("Mongodb is Connected"))
  .catch((error)=>console.log("Mongodb Failed to Connect"))
} 