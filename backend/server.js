import express from "express";
import dotenv from "dotenv";

//MongoDb connection
import connectToMongoDB from "./src/db/connectMongoDB.js";

// import Routes
import authRoutes from './src/routes/authRoutes.js'

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use("/api/auth",authRoutes);

app.get("/",(req,res)=>{
    res.send("Route Working!");
});

app.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`Server is running on ${PORT}`);

});