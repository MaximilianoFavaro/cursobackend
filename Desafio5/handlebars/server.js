import  express  from "express";
import { productsRouter } from "./routes/products.js";
import { engine } from "express-handlebars"


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.engine('hbs', engine({extname: 'hbs'}))
app.set('view engine', 'hbs')
app.set('views','./views')
app.use(express.static('public'))

app.use('/',productsRouter)

app.listen(8080,()=> console.log('Server iniciado en 8080'));
  
/*
const express = require("express");
const productRouter = require("./routes/products");
const engine = require( 'express-handlebars')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.set('hbs',engine({extname : 'hbs'}))
app.set('view engine', 'hbs')
app.set('views', './views')
app.use(express.static('public'))

app.listen(8080,()=>console.log("server listening on port 8080"));
*/


//app.use("/api/productos", productRouter);




// http://localhost:8080/api/productos/