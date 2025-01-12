import express from "express";
import { CreateRoomSchema, CreateUserSchema } from "@repo/common/types"
import {prismaClient} from "@repo/db/prisma"


const app = express();

app.get('/', (req, res) => {
    res.send('server is helthy')
})

app.post('/signup', async (req, res) => {

    const parseData = CreateUserSchema.safeParse(req.body)

    if(!parseData.success) {
        res.json({
            message: "Incorrect Inputs"
        })
        return;
    }

    // find the user by email

    const user = await prismaClient.user.findUnique({
        where: {
            email: parseData.data.email
        }
    })
    if(user) {
        res.json({
            message: 'your already signup please go to signin'
        });
        return;
    }


    // hash the password

    // create the user 
    const newUser = await prismaClient.user.create({
        data: {
            email: parseData.data.email,
            password: parseData.data.password,
            name: parseData.data.name,
            photo: parseData.data.photo
        }
    })


})

app.post('/signin', (req, res) => {

})

app.post('/room', (req, res) => {

})

app.listen(8000);