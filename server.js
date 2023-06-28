const express =require('express');
const bodyParser= require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const mysql= require('mysql');
const Clarifai= require('clarifai')

const register =require('./controllers/register.js');
const entries=require('./controllers/entries.js');
const signin=require('./controllers/signin.js');

const app= express();
app.use(bodyParser.json());
app.use(cors());

//establish connection to database
    const connection = mysql.createPool({
    connectionLimit : 100,
    host     : 'localhost',
    user     : 'DATABASE USERNAME',
    password : 'DATABASE PASSWORD',
    database : 'DATABASE NAME'
  });
 

                                                    //dependancy injection
app.post('/signin', (req,res)=>{ signin.handleSignin(req,res,connection,bcrypt)});  
app.post('/register',(req,res)=>{register.handleRegister(req,res,connection,bcrypt)});
app.post('/imageurl',(req,res)=>{entries.handleApiCall(req, res,Clarifai)});
app.put('/entries',(req,res)=>{entries.handleEntries(req, res, connection)});


//id identify the user that signed in by their id
app.post('/profile/:id', (req,res)=>{
    const{id}=req.params;
    let found=false;
    database.user.forEach(user =>{
        if(user.id===id){
            found= true;
            return res.json(user);
        }
    })
    if(!found){
        res.status(400).json('not found')
    }

})
const PORT = process.env.PORT
app.listen(3000, ()=>{
    console.log(`Up And Running ${PORT}`);
})
