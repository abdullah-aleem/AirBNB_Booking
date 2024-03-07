const mongoose=require('mongoose')

const place = new mongoose.Schema({
    owner:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    title: String,
    address: String,
    photos:[String],
    description:String,
    perks:[String],
    extraInfo:String,
    checkIn:Number,
    checkOut:Number,
    maxGuests:Number,
});

const PlaceModel= mongoose.model('Place',place)

module.exports=PlaceModel