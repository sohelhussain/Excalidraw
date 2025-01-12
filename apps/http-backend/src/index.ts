import express from "express";


const app = express();

app.get('/', (req, res) => {
    res.send('server is helthy')
})

app.post('/signup', (req, res) => {
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