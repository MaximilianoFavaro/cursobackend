
import { productos } from '../../managers/fileObjects.js';
const admin = true;

const getAllProductos= (async (req,res) => {
        try{
            const allObjects = await productos.getAll()
            res.send(allObjects)
        }catch(error){
            console.log(error)
            res.send({
                error: -1,
                message: "Error al obtener todos los productos en GET /api/productos"
            })
        }
    })
    
const getProductosById= (async(req,res)=>{
        try{
            const {id} = req.params
            const objectById = await productos.getById(id)
            res.send(objectById)
        }catch(error){
            console.log(error);
            res.send({
                error: -1,
                message: `Error al buscar el producto ${id}`
            })
        }
    })
    
 const addProductos=(async (req,res) =>{        
        if(admin){
            try{
                console.log(req.body)
                let newProduct = req.body;
                console.log(newProduct)
                const productosNew = await productos.save(newProduct);
                res.send(productosNew)
    
            }catch(error){
                console.log(error)
            }
        }else{
            res.status(404).message({
                error: -1,
                message: 'Error en la ruta /api/productos conel metodo POST no autorizado'
            })
        }
    })

const putProductos = (async(req,res) =>{
        if(admin){
            try{
                const {id}= req.params
                const newProd = req.body
                const produtosUpdated = await productos.updateById(id,newProd)
                res.send ( {
                    message: 'Producto actualizado',
                    producto: newProd
                })
    
            }catch(error){
                console.log(error);
                res.status(404).message({
                    error: -1,
                    message: 'Error en la ruta /api/productos/:id conel metodo PUT no autorizado'
                })
            }
        }
    })

 const deleteProductById = (async(req,res)=>{
        if(admin){
            try{
                const {id}= req.params;
                const product = await this.fileObject.deleteById(id)
                res.send('Producto eliminado')
    
            }catch(error){
                console.log('Error al borrar by id')
    
            }
        }
    })

  
    






export { getAllProductos,getProductosById,putProductos,deleteProductById,addProductos }