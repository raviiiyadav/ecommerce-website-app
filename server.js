import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectToMongo from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// configure dotenv
dotenv.config();

// esmodule fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// database config
connectToMongo();

// rest object
const app = express();

// port
const port = process.env.port || 8080;

// middlewres
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./client/build")));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// rest api
// app.get("/", (req, res) => {
//   res.send("<h2>Welcome to Ecommerce website</h2>");
// });
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//run listen
app.listen(port, () => {
  console.log(`Ecommerce backend listening on port ${port}`.bgCyan.white);
});
