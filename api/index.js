const express=require('express')
const app=express()
const cors=require('cors')
const User=require('./models/User.js')
const jwt=require('jsonwebtoken')
const cookieParser=require('cookie-parser')
//hash your password 
const bcrypt = require('bcryptjs')
require('dotenv').config()
const { default: mongoose } = require('mongoose')
const bycryptSalt=bcrypt.genSaltSync(8);
const jwtSecret="fsdafasdfasklfalkdafckjfsdiafsadfsaerqwes"


app.use(express.json())
app.use(cors({
    credentials:true, 
    origin:'http://localhost:5173'
}))
app.use(cookieParser())
//mongoose connection 
mongoose.connect(process.env.MONGO_URL)


app.get('/test',(req,res)=>{
    res.json('text ok');
})
app.post('/register',async (req,res)=>{
    const {name,email,password}=req.body;
    try{
        const userDoc=await User.create({
            name,
            email,
            password:bcrypt.hashSync(password,bycryptSalt),
        })
        res.json(userDoc)
    }catch(e){
        res.status(422).json(e);
    }
    
}) 
app.get('/profile',(req,res)=>{
    const {token}=req.cookies;
    if(token){
        jwt.verify(token,jwtSecret,{},async (err,result)=>{
            if(err) throw err;
            const {name,email,id}=await User.findById(result.id);
            res.json({name,email,id});
        })
    }else{ 
        res.json(null)
    }
    
})
app.post( '/login',async (req,res)=>{
    console.log('in login')
    const {email,password}=req.body;
    const userDoc=await User.findOne({email})
    if(userDoc){
        const passOk=bcrypt.compareSync(password,userDoc.password)
        if (passOk){
            jwt.sign({email:userDoc.email,id:userDoc._id},jwtSecret,{},(err,token)=>{
                if (err) throw err;
                res.cookie('token',token).json(userDoc)
            })
            
            
        }else{
            res.status(422).json('password not okay')
        }
    }else{ 
        res.status(422).json('not found');
    }
}) 
  
app.listen(4000);    