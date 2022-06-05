const { use } = require('../routes/auth');
const db = require('./pg');
const moment = require('moment')

const ex = module.exports;


ex.getUser = async(uid)=>{
    try{
        return await db.any(`SELECT u_id, u_name, u_type FORM user WHERE u_id = $1`, [uid])
    }
    catch(err){throw new Error(`can't find any data`);}
   
}

ex.insertUser = async(user)=>{
    let sql = `INSERT INTO public.users(
        u_name, u_email, u_mobile, u_country_code, u_address, u_password, u_type,
         status, add_by_id, add_date, modified_by_id, modified_date, user_code)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,'SYS', now(),'SYS', now(), $9);`
    try{
        return await db.any(sql,[user.name, user.email, user.mobile, user.countryCode, user.address, user.password, 2, 'E', user.name + moment().format('YYYYMMDDhhmmss')])
    }catch(err){throw err;}
}

ex.getUserByEmail = async(email)=>{
    let sql = `SELECT u_id as id, u_name as name, u_type as type, u_password as password FROM users WHERE u_email = $1`;
    try{
        let user = await db.any(sql,[email])
        return user
    }catch(err){throw err;}
}

ex.isValidUser = async(id,name,type)=>{
    let sql = `SELECT count(*) FROM users WHERE u_id = $1 and u_name = $2 and u_type = $3`;
    try{
        let count = await db.one(sql,[id,name,type])
        console.log(count)
        if(count.count == 1)
        return true
        else return false
    }catch(err){
        throw err;
    }
}