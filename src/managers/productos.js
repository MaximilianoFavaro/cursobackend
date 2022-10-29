import fs from 'fs'


class Producto {
    constructor(fileName){
        this.fileName=fileName
    }

    save = async(newProduct) => {
        try{
            if(fs.existsSync(this.nameFile))
            {   
                let productos = []
                let lastIdAdded
                try{
                    productos =  await this.getAll()
                lastIdAdded = productos.reduce((acc,item)=> item.id > acc ? acc = item.id : acc,0);
                
                }catch(error){
                    lastIdAdded=0;
                }

                const newProduct = {
                    id: lastIdAdded+1,
                    ...newProduct
                }
                productos.push(newProduct)
                await fs.promises.writeFile(this.nameFile,JSON.stringify(productos,null,2))
                return productos;
            }else {
                const newProduct={
                    id:1,
                    ...newProduct                  
                }
                await fs.promises.writeFile(this.fileName,JSON.stringify([newProduct],null,2))


            }
        }catch(error){
            console.error(error);
        }

    }

    getById = async(id) => {
        try{
            const productos = await this.getAll();
            const producto = productos.find(item=>item.id===id);
            return producto
        }catch(error){
            console.error(error)
        }
    }

    /*getAll = async() =>{



    }*/




}