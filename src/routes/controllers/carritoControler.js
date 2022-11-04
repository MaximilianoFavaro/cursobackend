import {carrito} from '../../managers/fileObjects.js'
const admin = true;

const  getAllCarrito= async (req,res) => {
    try{
        const allObjects = await carrito.getAll()
        res.send(allObjects)
    }catch(error){
        console.log(error)
        res.send({
            error: -1,
            message: "Error al obtener todos los productos en GET /api/productos"
        })
    }
}

const  getCarritoById= async(req,res)=>{
    try{
        const {id} = req.params
        const objectById = await carrito.getById(id)
        res.send(objectById)
    }catch(error){
        console.log(error);
        res.send({
            error: -1,
            message: `Error al buscar el producto ${id}`
        })
    }
}

const addCarrito=async (req,res) =>{
    if(admin){
        try{
            console.log(req.body)
            const newProduct = req.body;
            const productosNew = await carrito.save(newProduct);
            res.json({
                message: "Producto creado",
                response:productosNew
            })

        }catch(error){
            console.log(error)
        }
    }else{
        res.status(404).message({
            error: -1,
            message: 'Error en la ruta /api/productos conel metodo POST no autorizado'
        })
    }
}

const putCarrito = async(req,res) =>{
    if(this.admin){
        try{
            const {id}= req.params
            const newProd = req.body
            const produtosUpdated = await carrito.updateById(id,newProd)
            res.send ( {
                message: 'Carrito actualizado',
                carrito: newProd
            })

        }catch(error){
            console.log(error);
            res.status(404).message({
                error: -1,
                message: 'Error en la ruta /api/productos/:id conel metodo PUT no autorizado'
            })
        }
    }
}

const  deleteCarritoById = async(req,res)=>{
    if(admin){
        try{
            const {id}= req.params;
            const product = await carrito.deleteById(id)
            res.send('Producto eliminado')

        }catch(error){
            console.log('Error al borrar by id')

        }
    }
}

const getNestedCarrito = async(req,res)=>{
    try{
        const {id} = req.params
        const allObjects = await carrito.getById(id)
        const [{productos}] = allObjects

        res.send(productos)
    }
    catch(error){
        console.log('Error al buscar objetos anidados')
    }

}

const addNestedCarrito = async(req,res) => {
    try{
        const {id} = req.params
        const allObjects= await carrito.getById(id)
        const [{productos}] = allObjects
        const prodLen = productos.length
        productos[prodLen+1]=req.body
        allObjects.productos = productos
        await carrito.updateById(id,allObjects)
        const updatedObject = await carrito.getById(id)
        res.send(updatedObject)

    }catch{
        console.log('Error al ejecutar addNestedObject')
    }
}

const deleteNestedCarrito= async(req,res)=>{
    try{
        const{id} = req.params
        const{id_prod}=req.params

        const allObjects=await carrito.getById(id)
        const [{productos}]=allObjects
        const newNestedObject = productos.filter(item => item.id !==id_prod)
        allObjects.productos = newNestedObject
        const resp=await carrito.updateById(id,allObjects)

        res.send(resp)

    }catch(error){
        console.log('Error al eliminar un producto del carrito')
    }
}

export {getAllCarrito,getCarritoById,getNestedCarrito, addCarrito, putCarrito,addNestedCarrito,deleteNestedCarrito,deleteCarritoById}