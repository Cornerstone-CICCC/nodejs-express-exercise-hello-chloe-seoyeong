import express, { NextFunction, Response } from "express";
import dotenv from "dotenv";
import productRouter from "./routes/product.routes";
import { greeting } from "./middlewares/greeting.middleware";
dotenv.config();

const app = express();

app.use(express.json());
app.use(greeting);

app.use("/products", productRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
