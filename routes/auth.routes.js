import {Router} from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import config from "config";

const router = Router()

// /api/auth/
router.post('/register',
    [
        check('email', 'Invalid email').isEmail(),
        check('password', 'Min password length 4 symbols').isLength(4)
    ],
    async (request, response)=>{
        try{
            const errors = validationResult(request);
            if(!errors.isEmpty()){
                return response.status(400).json({
                    errors: errors.array(),
                    message:"Invalid registration data"
                })
            }

            const {email, password} = request.body;
            const candidate = await User.findOne({email});
            if(candidate){
                return response.status(400).json({"message":"This email is already used"})
            }
            
            const hash = await bcrypt.hash(password, 10);
            console.log(hash)
            const user = new User({email:email, password: hash});
            await user.save();
            response.status(200).json({"message":"Registration success"});

        }catch(err){
            response.status(500).json({"message":"Something wrong... Try again"});
        }
    }
)

router.post('/login', 
    [
        check('email', 'Invalig email').normalizeEmail().isEmail(),
        check('password', 'Enter password').exists()
    ],
    async (request, response)=>{
    try{
        const errors = validationResult(request);
        if(!errors.isEmpty()){
            return response.status(400).json({
                errors: errors.array(),
                message:"Invalid username or password"
            })
        }

        const {email, password} = request.body;
        const user = await User.findOne({email});
        if(user){
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                return response.status(400).json({"message":"Invalid password"})
            }

            const token = jwt.sign(
                {userId:user.id},
                config.get('jwtSecret'),
                {expiresIn:"1H"}
            );
            return response.json({token, user})
        }else{
            return response.status(400).json({"message":"Invalid credentials"})
        }
    }catch(err){
        response.status(500).json({"message":"Somthing wrong... Try again"});
    }
})

export default router