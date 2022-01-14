const express=require('express')
const { json } = require('express/lib/response')
const jwt=require('jsonwebtoken')
const app=express()

app.get('/api',(req,res)=>{
    res.json({
        message:'WELCOME USER'
    })
})

//creating path to be Protected 

app.post('/users/auth',tokenVerification,(req,res)=>{

    jwt.verify(req.token,'hidev7#',(err,authdata)=>{
        if(err)
        {
            res.sendStatus(403)
        }
        else
        {
            res.json({
                message:"SUCCESFULLY AUTHENTICATED!! USER DETIALS ARE: ",
                authdata
            })
        }
    })
})

//path to Generate the Token

app.get('/users/gettoken',(req,res)=>{
const user={
    Username:'Dev',
    Rollno:"19T014",
    Dpt:'Information Technology'
}
    jwt.sign({user},'hidev7#',(err,token)=>{
        if(err)
        {
            res.sendStatus(403);
        }
        else
        {
            res.json({
                token
            })
        }
    })
})

//middleware function from protected path

function tokenVerification(req,res,next)
{
    const  bearerHeader=req.headers['authorization'];
    const bearer=bearerHeader.split(' ');
    const  bearerToken=bearer[1];
    req.token=bearerToken;
    next();
}


//server connection 

app.listen(5000,()=>{
    console.log(`Server is Running at http://localhost:${5000}`);
})