const express = require('express');
const router = express.Router();

const logic = require('../logic/auth');


router.post('/register',  async(req,res)=>{
    console.log(req.body);
    if(Object.keys(req.body).length === 0){
        res.status(400).json({error:"something not good"});
        return
    }
    try{
        let data = await logic.registerUser(req.body);
        res.status(200).json({data:"hi, registed successfuly!!"})
    }catch(err){ 
        console.log(err);
        res.status(400).json({error:err})}
    
});

router.post('/login', async(req,res)=>{
    if(Object.keys(req.body).length === 0){
        res.status(400).json({error:"somethong  not good"})
        return
    }
    try{
        let data = await logic.login(req.body)
        res.status(200).json({data:data})
    }
    catch(err){res.status(400).json({error:err})}
    
})

module.exports = router;