import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import ProductsRouter from "./routes/products.routes.js"
import { apiRateLimit } from "./middleware/apiRateLimit.js";
import dotenv from "dotenv";
import { configDb } from "./config/db.js";

dotenv.configDotenv();


const app = express();

app.use(bodyParser.json())
app.use(morgan('dev'));
app.use(apiRateLimit);
app.use("/products", ProductsRouter)

configDb();

app.listen(8000, ()=>{
    console.log("Listening on port 8000")
})
