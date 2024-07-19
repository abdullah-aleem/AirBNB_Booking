const mongoose=require('mongoose');
const {Schema}=mongoose
//create Schema
const UserSchema=new Schema({
    name:String,
    email:{type:String,unique:true},
    password:String,

})
//Create Model
const UserModel=mongoose.model('User',UserSchema)
module.exports=UserModel
