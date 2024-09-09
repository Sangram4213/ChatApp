import express from "express";
import dotenv from "dotenv";

//MongoDb connection
import connectToMongoDB from "./src/db/connectMongoDB.js";

// import Routes
import authRoutes from './src/routes/authRoutes.js';
import messageRoutes from './src/routes/messageRoutes.js'
import conversationRoutes from './src/routes/conversationRoutes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json()); // to parse incoming request with JSON payloads (from req.body)

app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);
app.use("/api/conversation",conversationRoutes);

// app.get("/",(req,res)=>{
//     res.send("Route Working!");
// });

app.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`Server is running on ${PORT}`);

});