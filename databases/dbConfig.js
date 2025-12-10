//Set up a MongoDB database using Mongoose.

import mongoose from "mongoose";

const connectDb=async ()=>{
    try {
      await mongoose.connect(process.env.MONGODB_URL);    
      console.log("database connnected");
    }
     catch (error)
     {
        console.log(error);
    }

}

export default connectDb;