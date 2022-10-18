import express from "express";
import {productsRouter}  from "./routes/products.js";

const app = express();

app.listen(8080,()=>console.log("server listening on port 8080"));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set("views", "./views")
app.set("view engine", "pug")

app.use("/", productsRouter);


// http://localhost:8080/api/productos/