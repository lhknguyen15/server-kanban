import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./src/routers/user";
dotenv.config();

const PORT = process.env.PORT || 3001;
const dbURL = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.jccpq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const app = express();

app.use("/auth", userRouter);

const connectDB = async () => {
  try {
    await mongoose.connect(dbURL);
    console.log(`Connect DB successfully`);
  } catch (error) {
    console.log(`Can not connect DB ${error}`);
  }
};

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is starting at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
