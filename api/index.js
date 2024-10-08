const express=require('express')
const app=express()
const cors=require('cors')
const User=require('./models/User.js')
const jwt=require('jsonwebtoken')
const cookieParser=require('cookie-parser')
const downloadImage=require('image-downloader')
const multer=require('multer')
const fs=   require('fs')
const Place=require('./models/Place.js')
//hash your password 
const bcrypt = require('bcryptjs')
require('dotenv').config()
const { default: mongoose } = require('mongoose')
const bycryptSalt=bcrypt.genSaltSync(8);
const jwtSecret="fsdafasdfasklfalkdafckjfsdiafsadfsaerqwes"


app.use(express.json())
app.use('/uploads',express.static(__dirname+'/uploads'))
app.use(cors({
    credentials:true,  
    origin:'http://localhost:5173'
}))
app.use(cookieParser())
//mongoose connection 
const connectToDatabase = ()=>{
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log('connected to server')
    }).catch((err)=>{
        console.error("cannot connect to mongo dp")
        setTimeout(connectToDatabase,5000) 
    })
}

connectToDatabase();

app.get('/test',(req,res)=>{
    res.json('text ok');
})
app.post('/register',async (req,res)=>{
    console.log("in register")
    const {name,email,password}=req.body;
    try{
        const userDoc=await User.create({
            name, 
            email,
            password:bcrypt.hashSync(password,bycryptSalt),
        })
        res.json(userDoc)
    }catch(e){
        console.error(e)
        res.status(422).json(e);
    }
    
}) 
app.get('/profile',(req,res)=>{
    const {token}=req.cookies;
    if(token){
        jwt.verify(token,jwtSecret,{},async (err,result)=>{
            if(err) throw err;
           User.findById(result.id).then(({name,email,id})=>{
                res.json({name,email,id});
            }).catch(err=>{
                res.status(422).json('Cannot get profile')
            });
            
        })
    }else{ 
        res.json(null)
    }
    
})
app.post('/logout',(req,res)=>{
    res.cookie('token','').json('logout successfull')
})

app.post('/uploadByToken',(req,res)=>{
    console.log("")
    const {link}=req.body
    const newName="photo"+Date.now()+'.jpg'
    const options={
        url:link,
        dest:__dirname+'/uploads/'+newName
    }
    downloadImage.image(options).then(({filename})=>{
        res.json(newName)
        console.log(filename)
    }).catch(err=>{
        res.status(422).json('cannot download image')
    })

})
app.post( '/login',async (req,res)=>{
    console.log('in login')
    const {email,password}=req.body;
    
    try{
        const userDoc=await User.findOne({email}).catch((err)=>{
            res.status(422).json("dataBase down connect Later")
        })
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
    }
    catch(err){
        res.status(422).json("dataBase down connect Later")
    }
   
    
})

//creating a middhleware for data to be converted to file
photosmidleware=multer({dest:'uploads/'})

app.post('/upload',photosmidleware.array('photos',100),(req,res)=>{

        const files=[];
        for (let i=0;i<req.files.length;i++){
            const {path,originalname }=req.files[i];
            parts=originalname.split('.');
            const newPath= path+'.'+ parts[parts.length-1];
            fs.renameSync(path,newPath)
            files.push(newPath.replace('uploads/',''));

        }
        res.json(files);

})
app.get('/places/user',(req,res)=>{
    const {token}=req.cookies;
    jwt.verify(token,jwtSecret,{},async (err,user)=>{
        if(err) throw err;
        const places=await Place.find({owner:user.id})
        
        res.json(places)
    })    
})
app.post('/places',(req,res)=>{
    const {title,description,addedPhoto,extraInfo,perks,address,checkIn,checkOut,maxGuests}=req.body;
    
    const {token}=req.cookies;
    jwt.verify(token,jwtSecret,{},async (err,user)=>{
        if(err) throw err;
        const placeDoc=await Place.create({
            owner:user.id,
            title,address,photos:addedPhoto,description,perks,extraInfo,checkIn,checkOut,maxGuests
        })  
        res.json(placeDoc)      
    })
    
})
app.get('/places/:id',(req,res)=>{
    const {id}=req.params;
    Place.findById(id).then(data=>{
        res.json(data)
    }).catch(err=>{
        res.status(422).json('cannot find place')
    })
})
app.put("/places/:id",(req,res)=>{

    const {title,description,addedPhoto,extraInfo,perks,address,checkIn,checkOut,maxGuests}=req.body;
    const {id}=req.params;
    jwt.verify(req.cookies.token,jwtSecret,{},async (err,user)=>{
        if(err) throw err;
        
        Place.findByIdAndUpdate(id,{owner:user.id,title,description,photos:addedPhoto,perks,extraInfo,checkIn,checkOut,maxGuests}).then(data=>{
            console.log("updated")
            res.json(data)
        }).catch(err=>{
            res.json(err)
        })
    })
    
})
app.delete("/places/:id",(req,res)=>{
    const {id}=req.params;
    jwt.verify(req.cookies.token,jwtSecret,{},async (err,user)=>{
        if(err) throw err;
        Place.findByIdAndDelete(id).then(data=>{
            console.log("deleted")
            res.json(data)
        }).catch(err=>{
            res.json(err)
        })
    })
})

app.listen(4000);    