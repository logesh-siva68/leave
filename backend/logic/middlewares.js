const jwt = require('jsonwebtoken');
const config = require('../config/config.json');
const bcrypt = require('bcryptjs');
const userDb = require('../data/user');
const ex = module.exports;


ex.createToken = async(user)=>{
    try{
        let token = await jwt.sign(user, config.jwtKey, {expiresIn:'1h'})
        console.log(token);
        return token;
    }catch(err){throw err;}
}

ex.decodeToken = async(token)=>{
    try{
        return await jwt.verify(token, config.jwtKey);
    }catch(err){throw err;}
}

ex.hashString = async(str)=>{
    try{
        let salt  = await bcrypt.genSalt(10);
        let hashed = await bcrypt.hash(str,salt)
        return hashed;
    }catch(err){throw err;}
}

ex.compareHash = async(str,hash)=>{
    try{
        return await bcrypt.compare(str, hash)
    }catch(err){console.log(err)};
}

ex.authenticateUser = async(req)=>{
    if(req.headers.authorization){
        let token = req.headers.authorization.split(" ")[1];
        if(token){
            let decode = await ex.decodeToken(token);
            let isValidUser = await ex.isValidUser(decode.id, decode.name, decode.type);
            if(isValidUser)
            req.user = decode;
            else throw 'Invalid User'
            return
        }else throw 'Invalid Token'
    }
    throw 'Not good headres'
}

ex.isValidUser = async(id, name, type)=>{
    try{
        let valid = await userDb.isValidUser(id,name,type)
        if(valid)
        return true
    } catch(err){throw err}
    return false
}