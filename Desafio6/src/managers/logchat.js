const fs = require("fs");
const path = require("path");

class LogChat{
    constructor(nameFile){
        this.nameFile = path.join(__dirname,"..",`files/${nameFile}`);
    }

    save = async(msgchat)=>{
        try {
            //leer el archivo existe
            if(fs.existsSync(this.nameFile)){
                const chatmessages = await this.getAll();
                const lastIdAdded = chatmessages.reduce((acc,item)=>item.id > acc ? acc = item.id : acc, 0);
                const newMsg={
                    id: lastIdAdded+1,
                    ...msgchat
                }
                chatmessages.push(newMsg);
                await fs.promises.writeFile(this.nameFile, JSON.stringify(chatmessages, null, 2))
                return chatmessages;
            } else{
                // si el archivo no existe
                const newMsg={
                    id:1,
                    ...msgchat
                }
                //creamos el archivo
                await fs.promises.writeFile(this.nameFile, JSON.stringify([newMsg], null, 2));
            }
        } catch (error) {
            console.log(error);
        }
    }    

    getAll = async()=>{
        if(fs.existsSync(this.nameFile)){
            try {
                const contenido = await fs.promises.readFile(this.nameFile,"utf8");
                const totMsgs = JSON.parse(contenido);
                return totMsgs
            } catch (error) {
                console.log(error)
            }
        }
        return {status:'error',message:"No hay Mensajes"}
    }
}
module.exports = LogChat