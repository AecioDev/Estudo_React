import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()
app.use(express.json())


//Métodos HTTP para Rotas
/*
    GET     -> Listar
    POST    -> Criar
    Put     -> Editar Vários
    Patch   -> Editar um
    Delete  -> Deletar

    As rotas precisam de:
    1 - Tipo de Rota / Método HTTP
    2 - Endereço

*/

app.post('/usuarios', async (req, res) => {
    
    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        },        
    })

    res.status(201).json(req.body)

})
 
app.get('/usuarios', async (req, res) => {

    let users = []

    if(req.query) {
        users = await prisma.user.findMany({
            where: {
                name: req.query.name
            }
        })
    } else {
        users = await prisma.user.findMany()
    }

    res.status(200).json(users)

})

app.put('/usuarios/:id', async (req, res) => {
    
    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        },        
    })

    res.status(201).json(req.body)

})

app.delete('/usuarios/:id', async (req, res) => {
    
    await prisma.user.delete({
        where: {
            id: req.params.id
        },    
    })

    res.status(200).json({message: "Usuário deletado com Sucesso!"})

})



app.listen(3500)

/*
    Criar nossa API de Usuarios

    - Criar um Usuário
    - Listar todos os usuários
    - Editar um usuário
    - Deletar um usuário

    Login Mongo DB
    espirandams / 6AqfswFJwwb1U7sF

    mongodb+srv://espirandams:6AqfswFJwwb1U7sF@users.kw36wng.mongodb.net/?retryWrites=true&w=majority&appName=Users

*/

