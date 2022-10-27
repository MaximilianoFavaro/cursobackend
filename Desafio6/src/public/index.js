console.log("javascript funcionando");

//creamos el socket del cliente.
const socketClient = io();

//captura el valor del usuario
let user;
Swal.fire({
    title:"Hola usuario",
    text:"bienvenido, al sistema"
    
});


//guardar un producto desde el cliente
const productForm = document.getElementById("productForm");
productForm.addEventListener("submit",(evt)=>{
    //prevenir comportamientos por defecto no deseados del formulario
    evt.preventDefault();
    const product ={
        title: document.getElementById("title").value,
        price: document.getElementById("price").value,
        thumbnail: document.getElementById("thumbnail").value
    }
    //enviamos el nuevo producto al servidor.
    socketClient.emit("newProduct",product);
})



//productos en tiempo real
//crear un tabla en html basado en los datos, y en el template de handlebars
const createTable = async(data)=>{
    const response = await fetch("./templates/table.handlebars");
    const result = await response.text();
    const template = Handlebars.compile(result);
    const html = template({products:data});
    return html;
}

const productsContainer = document.getElementById("productsContainer");
socketClient.on("products",async(data)=>{
    // console.log(data)
    //generar el html basado en la plantilla de hbs con todos los productos
    const htmlProducts = await createTable(data);
    productsContainer.innerHTML = htmlProducts;
})



//logica del chat
//enviar el mensaje desde el cliente
const campo = document.getElementById("messageField")
const email = document.getElementById("emailField")
const submit= document.getElementById("submitBtn")
var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
campo.disabled=true;
email.addEventListener("keydown",(evt)=>{
    if(evt.key=== "Enter"){
        if (email.value.match(validRegex)) {
           user = email.value;
           email.disabled=true;
           campo.disabled=false;

        }
        else{
            Swal.fire({
                title:"Hola usuario",
                text:"El email es invalido"
                
            }).then(respuesta=>{
                console.log(respuesta);
                
            });
            email.disabled=false;
            email.focus();
            campo.disabled=true;

        }
    }
})



campo.addEventListener("keydown",(evt)=>{
    // console.log(evt.key)
    const date = new Date();
const lit = date.toLocaleString();
    if(evt.key === "Enter"){
        socketClient.emit("message",{
            username:user,
            date:lit ,
            message:campo.value
        })
        campo.value ="";
    }
})

submit.addEventListener("click",(evt)=>{
    const date = new Date();
    const lit = date.toLocaleString();

    if(evt.key === "Enter"){
        socketClient.emit("message",{
            username:user,
            date:lit,
            message:campo.value
        })
        campo.value ="";
    }
})

//mostrar los mensajes cuando el usuario carga la página
const messageContainer = document.getElementById("messageContainer");
socketClient.on("historico",(data)=>{
    let elementos="";
    data.forEach(item=>{
        elementos = elementos + `<div style= "display:flex;flex-direction: row"><p style="color: blue; margin: 10px"><strong>${item.username}</strong> </p> <p style= "color: brown; margin: 10px"> ${item.date}</p> <p style= "color: green; font-style: italic; margin: 10px"> ${item.message}</p></div>`;
    });
    messageContainer.innerHTML = elementos;
})

// socketClient.on("newUser",()=>{
//     Swal.fire({
//         text:"nuevo usuario conectado",
//         toast:true
//     })
// })