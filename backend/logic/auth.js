const db = require('../data/user');
const ex = module.exports;
const middle = require('./middlewares')

ex.login = async(user)=>{
    try{
        let users = await db.getUserByEmail(user.email);
        let comparePassword = await middle.compareHash(user.password, users[0].password);
        if(comparePassword){
            return {token: await middle.createToken({name:users[0].name, type: users[0].type, id:users[0].id})}
        }
        
    }catch(err){
        throw err;
    }
}


ex.registerUser = async(user)=>{

    try{
        user.password = await middle.hashString(user.password)
        let data = await db.insertUser(user);
        return "User Registered!!"
    }catch(err){throw err;}
}