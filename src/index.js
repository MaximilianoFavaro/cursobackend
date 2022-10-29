import express from 'express'
import * as dotenv from 'dotenv'

dotenv.config()

const app = express()

app.listen(process.env.PORT,console.log('Escuchando en 8080'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/',productsRouter)
