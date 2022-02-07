import config from "config";
import express from "express";
import mongoose from "mongoose";

import auth from "./routes/auth.routes.js"
import link from "./routes/link.routes.js"

const app = express();

app.use(express.json({extended:true}));

app.use('/api/auth', auth);

app.use('/api/link', link);

async function start(){
    try{
        await mongoose.connect(config.get("mongoUri"), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }catch(err){
        console.log("Server error", err.Message);
        process.exit(1);
    }
}

start();

const PORT = config.get("port") || 5051;
app.listen(PORT, ()=>console.log(`App started on port ${PORT}`));