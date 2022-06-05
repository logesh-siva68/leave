'use strict'
const express = require('express');
const app = express();
const cors = require('cors');
const config = require('./config/config.json');
const port = process.env.port || config.port || 3000;
const middle = require('./logic/middlewares');

app.use(cors());

app.use(express.json({limit:"50mb"}));

app.use(express.urlencoded({extended:false}));

app.use('/api/auth', require('./routes/auth'))

app.use('/api', async(req,res,next)=>{
    console.log("in auth")
    try{
        await middle.authenticateUser(req);
    if(req.user)
    next();
    }catch(err) {
        res.status(400).json({error:err});
    }
})

app.use('/api/leave', require('./routes/leave'))

app.use((request,response)=>{
    response.send(400, `<h1>Resource Not Found for  ${request.url}</h1>`);
})

app.listen(port,()=>{console.log(`Server running in Port ${port} `)});