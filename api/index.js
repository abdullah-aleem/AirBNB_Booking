const express=require('express')
const app=express()
const cors=require('cors')
const { default: mongoose } = require('mongoose')

app.use(express.json())
app.use(cors({
    credentials:true,
    origin:'http://localhost:5173'
}))

mongoose.connect('')


app.get('/test',(req,res)=>{
    res.json('text ok');
})
app.post('/register',(req,res)=>{
    const {name,email,password}=req.body;
    res.json({name,email,password})
})

app.listen(4000);