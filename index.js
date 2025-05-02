import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import ProductsRouter from "./routes/products.routes.js"

const app = express();

app.use(bodyParser.json())
app.use(morgan('dev'));
app.use("/products", ProductsRouter)

app.listen(8000, ()=>{
    console.log("Listening on port 8000")
})
