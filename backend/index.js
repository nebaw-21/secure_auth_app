import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import multer from 'multer';
import UserRouter from "./routes/UserRouter.js";
import GalleryRouter from "./routes/GalleryRouter.js";
import BlogRouter from "./routes/BlogRouter.js";
import EventRouter from "./routes/EventRouter.js";
import SubscribedUserRouter from "./routes/SubscribedUserRouter.js";
import RegisterUserForEventRouter from "./routes/RegisterForEventRoutes.js";
import EmailRouter from "./routes/EmailRouter.js";
import ContactUsRouter from "./routes/ContactUsRouter.js";
import VerifyEmailRouter from "./routes/verifyEmailRouter.js"
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors());

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended:false}));

//routes
app.use("/api/user", UserRouter);
app.use("/api/verify",VerifyEmailRouter)
app.use("/api/gallery", GalleryRouter);
app.use("/api/blog", BlogRouter);
app.use("/api/event", EventRouter);
app.use("/api/subscribed", SubscribedUserRouter);
app.use("/api/registerForEvent", RegisterUserForEventRouter);
app.use("/api/email", EmailRouter);
app.use("/api/message", ContactUsRouter);

// Serve static files from the 'uploads' directory
app.use(express.static('uploads')); // Just specify the directory name

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{
  console.log("Connected to MongoDB");
  app.listen(process.env.PORT, ()=>{
    console.log("Server is running on port 3000");
  });
}).catch((error) => {
  console.error("MongoDB connection error:", error);
});
