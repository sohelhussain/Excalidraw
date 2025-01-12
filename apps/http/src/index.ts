import express from "express";
import { CreateRoomSchema } from "@repo/common/types"


const app = express();

app.get('/', (req, res) => {
    res.send('server is helthy')
})

app.post('/signup', (req, res) => {

    const data = CreateRoomSchema.safeParse(req.body)

    if(!data.success) {
        res.json({
            message: "Incorrect Inputs"
        })
        return;
    }

    const {email, password} = req.body;


    

    //find the user by email

    //create the user 

    // const user = prisma.User.create({
    //     email,
    //     password
    // })


})

app.post('/signin', (req, res) => {

})

app.post('/room', (req, res) => {

})

app.listen(8000);