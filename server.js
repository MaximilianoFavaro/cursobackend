
const express = require("express");

const app = express();

const fs = require("fs");

class Contenedor{
    constructor(nameFile){
        this.nameFile = nameFile;
    }
    
    getById = (id)=>{
        try {
            if(fs.existsSync(this.nameFile)){
                const contenido =  fs.readFileSync(this.nameFile,"utf8");
                if(contenido){
                    const productos = JSON.parse(contenido);
                    const producto = productos.find(item=>item.id===id);
                    return producto
                } else{
                    return "El archivo esta vacio"
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    getAll = ()=>{
        try {
            const contenido =  fs.readFileSync(this.nameFile,"utf8");
            const productos = JSON.parse(contenido);
            return productos
        } catch (error) {
            console.log(error)
        }
    }

  

    
}

// Inicializando archivo de productos
const listaProductos = new Contenedor("./productos.txt")
/*const producto1 = {
    title:"Ropero",
    price:3000,
    thumbnail:"/foto1"
}    
const producto2 = {
    title:"Mesa",
    price:7900,
    thumbnail:"/foto2"
}
const producto3 = {
    title:"Silla",
    price:2000,
    thumbnail:"/foto3"
}*/
/*const loadProduct = async()=>{


    let prodidnumber
    prodidnumber=await listaProductos.save(producto1);     
    prodidnumber=await listaProductos.save(producto2);        
    prodidnumber=await listaProductos.save(producto3); 
}
loadProduct()*/
let productos = []
const getAll= () =>{   
   productos =  listaProductos.getAll();
   //console.log(productos)
   
}


const getById = (productId)=>{
   const productoById =  listaProductos.getById(productId)
   return productoById
}


app.get("/productos",(req,res)=>{
    
    getAll()
    console.log("no llega vacio")
    console.log(productos)
    //res.send("<h1> Listado productos </h1>")
    res.send(productos)
   /* res.send(productos.map(producto =>{
        `<h2>${producto.title}</h2>
         <h2>${producto.price}</h2>`
    }).join(' '))*/
})

app.get("/productoRandom",(req,res) =>{
    getAll();
    let numAleatorio = parseInt(Math.random()*productos.length);
    let prodById
    if (numAleatorio > 0){
     prodById = getById(numAleatorio)
    }else{
        numAleatorio++;
        prodById = getById(numAleatorio)
    }
    
    res.send(prodById)

})

app.listen(8080,()=>{
    console.log("server listening on 8080")
})

