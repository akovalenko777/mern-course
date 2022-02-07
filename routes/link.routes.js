import {Router} from "express";
import config from "config";
import Link from "../models/Link.js";
import auth from "../middleware/auth.middleware.js";
import {nanoid} from "nanoid";

const router = Router()

router.post('/generate',
    auth,
    async (req, res)=>{
        try{
            const baseUrl = config.get("baseUrl");

            const {from} = req.body;

            const code = nanoid(10);
            
            const isExist = await Link.findOne({code: code});
            if(isExist){
                return res.status(200).json({link:isExist});
            }
            
            const to = baseUrl+'/t/'+code;


            const link = new Link({
                from,
                to,
                code,
                owner: req.user.userId
            });
            await link.save();
            return res.status(201).json({"message":"Link successfully saved", link:link});

        }catch(err){
            res.status(500).json({"message":"Something wrong... Try again"});
        }
    }
)

router.get('/', 
    auth,
    async (req, res)=>{
    try{
        const links = await Link.find({owner:req.user.userId});
        res.json(links);
    }catch(e){
        res.status(500).json({"message":"Something wrong... Try again"});
    }
})

router.get('/:id', async (req, res)=>{
    try{
        const link = await Link.findById(req.params.id);
        res.json(link);
    }catch(e){
        res.status(500).json({"message":"Something wrong... Try again"});
    }
})

export default router