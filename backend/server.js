import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import path from "path";

//MongoDb connection
import connectToMongoDB from "./src/db/connectMongoDB.js";

import { app, server } from "./socket/socket.js";

// import Routes
import authRoutes from './src/routes/authRoutes.js';
import messageRoutes from './src/routes/messageRoutes.js';
import userRoutes from './src/routes/userRoutes.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();


app.use(express.json()); // to parse incoming request with JSON payloads (from req.body)
app.use(cookieParser()); // to parse the incoming cookies from req.cookies

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);

app.use(express.static(path.join(__dirname,'/frontend/dist')));

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,'frontend', 'dist', 'index.html'))
})

server.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`Server is running on ${PORT}`);
});