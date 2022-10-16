import express from 'express'
import { Contenedor } from '../contenedorProductos.js'
const productsRouter = express.Router();

const contenedorProductos = new Contenedor("productos.txt");

productsRouter.get("/",async(req,res)=>{
    try {
        
        res.render('home')
        
        //res.send(products)
    } catch (error) {
        res.status(500).send("hubo un error en el servidor")
    }
})

productsRouter.get("/productos",async(req,res)=>{
    try {
        const contenedorAll = await contenedorProductos.getAll()
        res.render('listado', {contenedorProductos : contenedorAll  })
        
        //res.send(products)
    } catch (error) {
        res.status(500).send("hubo un error en el servidor")
    } 
})
// /api/productos/5
// /api/productos/:productId
/*productsRouter.get("/:id", async(req,res)=>{
    const {id} = req.params;
    const product = await contenedorProductos.getById(parseInt(id));
    if(product){
        res.json({
            message:"producto encontrado",
            product: product
        })
    }else{
        res.json({
            message:"producto no encontrado"
        })
    }
})*/

productsRouter.post("/productos",async(req,res)=>{
    console.log("body",req.body);
    const newProduct = req.body;
    const productos = await contenedorProductos.save(newProduct);
     
    //console.log(contenedorProductos.getAll())
    /*res.json({
        message:"producto creado",
        response: productos
    })*/
    res.redirect('/')
})

/*productsRouter.put("/:id", async(req,res)=>{
    const {id} = req.params;
    const newInfo = req.body;
    const productosActualizados = await contenedorProductos.updateById(parseInt(id),newInfo);
    res.json({
        message:`El producto con el id ${id} fue actualizado`,
        response: productosActualizados
    })
})*/



export{ productsRouter};