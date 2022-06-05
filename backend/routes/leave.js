const express = require('express');
const router = express.Router();

router.post('/apply',(req,res)=>{
    res.status(200).json({...req.user, leaveAction : "A"})
})

router.post('/modify',(req,res)=>{
    res.status(200).json({...req.user, leaveAction : "B"})
})

module.exports = router;