// userRoutes.js - Defines API routes for user actions (GET /profile, POST /register)
import express from "express";
//import {userEx} from '../Middleware/userEx.js'
import { userSignup ,userLogin} from "../controllers/userControl.js";
import { verifyToken } from "../middleware/token.js";


const userRouter=express.Router()

userRouter.post('/signup',userEx,userSignup)
userRouter.post('/login',userLogin)

userRouter.get('/song',verifyToken,(req,res)=>{
    res.send('Listen Song.............!!!!.......')
})



export default userRouter