import express from "express";
import { CreateRoomSchema, CreateUserSchema, SigninUserSchema } from "@repo/common/types"
import {prismaClient} from "@repo/db/prisma"
import bcrypt from "bcrypt"; 
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/server-common/config";
import { middleware } from "./middleware";


const app = express();

app.get('/', (req, res) => {
    res.send('server is helthy')
})

app.post('/signup', async (req, res) => {

  try {
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

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(parseData.data.password, salt);

    // create the user 
    const newUser = await prismaClient.user.create({
        data: {
            email: parseData.data.email,
            password: hash,
            name: parseData.data.name
        }
    });

    res.json({
        userId: newUser.id
    })

  } catch (error) {
   res.status(411).json({
    message: "User already exists with this username"
   }) 
  } 

})

app.post('/signin', async (req, res) => {
    try {
        const parseData = SigninUserSchema.safeParse(req.body);

    if(!parseData.data){
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }

    const oldUser = await prismaClient.user.findUnique({
        where: {
            email: parseData.data.email
        }
    })

    if(!oldUser){
        res.json({
            message: "User are not exists"
        })
        return;
    }

    const isMatch = bcrypt.compare(parseData.data.password, oldUser.password);

    if(!isMatch){
        res.json({
            message: "Incorrect Email or Password"
        })
        return;
    }


    const token = jwt.sign({
        userId: oldUser.id
    }, JWT_SECRET);

    res.json({
        token
    });
    } catch (error) {
        res.json({
            message: "Incorrect Inputs"
        })
    }
})

app.post('/room', middleware, async (req, res) => {
    const parseData = CreateRoomSchema.safeParse(req.body);

    if(!parseData.data){
        res.json({
            message: "Incorrect Inputs"
        })
        return;
    }

    //@ts-ignore
    const userId = req.userId;

    const room = await prismaClient.room.create({
        data: {
            slug: parseData.data.slug,
            adminId: userId
        }
    })

    res.json({
        roomId: room.id,
    })

})

app.get('/shapes/:roomid', async (req, res) => {
try {
        const roomId = req.params.roomid;

    const shape = await prismaClient.shape.findMany({
        where: {
            roomId: roomId
        }
    })

    res.json({
        shape
    })
} catch (error) {
   res.json({
    shape: []
   }) 
}

})

app.get('/chats/:roomid', async (req, res) => {
try {
        const roomId = req.params.roomid;

    const message = await prismaClient.chat.findMany({
        where: {
            roomId: roomId
        },
        orderBy: {
            id: "desc"
        },
        take: 50
    })

    res.json({
        message
    })
} catch (error) {
   res.json({
    message: []
   }) 
}

})

//find the room
app.get('/room/:sulg', async (req, res) => {

try {
    const slug = req.params.sulg;

    const room = await prismaClient.room.findFirst({
        where: {
             slug: slug
        }
    });

    res.json({
        room
    })
} catch (error) {
   res.json({
    message: "room not find"
   }) 
}

})

app.listen(8000);